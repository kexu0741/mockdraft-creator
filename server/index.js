const express = require("express");
const app = express();


var port = process.env.port || 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});