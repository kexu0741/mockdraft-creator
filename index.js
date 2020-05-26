const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", async(req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post("/register", async(req, res) => {
	try {  
		let hashed_pass = await bcrypt.hash(req.body.password, 10);
		let email = req.body.email.toLowerCase();

		const new_entry = await pool.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", 
		[email, hashed_pass]);
		res.json(new_entry.rows[0]);
	} catch (err){ 
		// if a duplicate email is entered, we come here
		res.status(500).send({ error: "boo:(" });
		console.log(err.message);
	}
});

app.get('*', (req, res) => {
	 res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

let port = process.env.port || 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});