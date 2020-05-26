const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorization = require("./middleware/authorization");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", async(req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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
		res.json(true);
	} catch (err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get("/dashboard", authorization, async(req, res) => {
	try {
		// we can get payload from req.user from middleware
		const user = await pool.query("SELECT uid FROM users WHERE uid = $1", 
			[req.user]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('*', (req, res) => {
	 res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

let port = process.env.port || 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});