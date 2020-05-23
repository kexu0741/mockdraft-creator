const express = require("express");
const app = express();

const cors = require("cors");
const pool = require("./db");

app.get("/", async(req, res) => {
	try {
		const test = await pool.query("SELECT * FROM users;");
		res.json(test.rows);

	} catch (err){
		console.log(err.message)
	}
})


var port = process.env.port || 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});