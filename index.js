const express = require("express");
const app = express();

const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

app.get("/", async(req, res) => {
	try {
		const test = await pool.query("SELECT * FROM users;");
		res.json(test.rows);
	} catch (err){
		console.log(err.message);
	}
});

app.post("/register", async(req, res) => {
	try {  
		let hashed_pass = await bcrypt.hash(req.body.password, 10);

		const new_entry = await pool.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", 
		[req.body.email, hashed_pass]);
		console.log(new_entry.rows[0]);
	} catch (err){ 
		// if a duplicate email is entered, we come here 
		console.log(err.message);
	}
});


var port = process.env.port || 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});