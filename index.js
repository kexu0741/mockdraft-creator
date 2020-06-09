const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorization = require("./middleware/authorization");
let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production"){
	// server static content
	app.use(express.static(path.join(__dirname, "client/build")));

	app.get("/", async(req, res) => {
		res.sendFile(path.join(__dirname+'/client/build/index.html'));
	});
}

// register route
app.post("/register", async(req, res) => {
	try {  
		let hashed_pass = await bcrypt.hash(req.body.password, 10);
		let email = req.body.email.toLowerCase();

		const new_entry = await pool.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", 
		[email, hashed_pass]);

		const token = jwtGenerator(new_entry.rows[0].uid);

		res.json({token});
	} catch (err){ 
		// if a duplicate email is entered, we come here
		res.status(500).send({ error: "boo:(" });
		console.error(err.message);
	}
});

// login route
app.post("/login", async(req, res) => {
	try {
		let email = req.body.email.toLowerCase();
		const user = await pool.query("SELECT * FROM users WHERE email = $1", 
			[email]);

		if (user.rows.length === 0){
			// user is not found
			return res.status(401).json("Incorrect credentials"); // unauthenticated
		}

		const valid_pass = await bcrypt.compare(req.body.password, user.rows[0].password);
		if (!valid_pass){
			return res.status(401).json("Incorrect credentials")
		}

		// generate and give jwt token
		const token = jwtGenerator(user.rows[0].uid);
		res.json({token});
	} catch (err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get("/is-verify", authorization, async(req, res) => {
	try {
		res.json(true); // if it passes the authorization middleware, user is verified
	} catch (err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get("/dashboard", authorization, async(req, res) => {
	try {
		// we can get payload from req.user from middleware
		// as long as client sends token in req head
		const user = await pool.query("SELECT uid FROM users WHERE uid = $1", 
			[req.user]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.post("/create-entry", authorization, async(req, res) => {
	try {
		const uid = req.user; // retrieve uid from middleware
		const new_entry = await pool.query("INSERT INTO entries(uid, entry_name) VALUES ($1, $2) RETURNING eid", 
			[uid, req.body.entryName]);
		res.json(new_entry.rows[0].eid);
	} catch (err){
		console.error(err.message);
	}
});

app.post("/init-picks", async(req, res) => {
	try {
		const eid = req.body.eid;
		const init_picks = await pool.query("CALL PickInit($1)", 
			[eid]); // call pg procedure, initializes picks w respctive teams
		res.json("picks initialized");
	} catch (err){
		console.error(err.message);
	}
});

app.get("/get-entries", authorization, async(req, res) => {
	try {
		const uid = req.user; //retrieve uid from middleware
		const user_entries = await pool.query("SELECT entry_name FROM entries INNER JOIN users ON entries.uid = users.uid WHERE entries.uid = $1", 
			[uid])
		res.json(user_entries.rows);
	} catch (err) {	
		console.error(err.message);
	}
});

app.get("/get-players/:eid", async(req, res) => {
	try {	
		const {eid} = req.params; 
		const players = await pool.query("SELECT * FROM players WHERE pid NOT IN (SELECT pid FROM picks WHERE eid = $1 AND pid IS NOT NULL)",
			[eid]);
		res.json(players.rows);
	} catch (err) {	
		console.error(err.message);
	}
});

app.get("/get-picks/:eid", async(req, res) => {
	try {
		const {eid} = req.params;
		const picks = await pool.query("SELECT picks.pick_number, teams.team_name, players.pid, players.name, players.position FROM picks LEFT JOIN players ON picks.pid = players.pid INNER JOIN teams ON teams.tid = picks.tid WHERE picks.eid = $1 ORDER BY picks.pick_number",
			[eid]);
		res.json(picks.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// todo: PUT request to add pid to picks

app.get('*', (req, res) => {
	 res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
	console.log("server started on port " + port);
});