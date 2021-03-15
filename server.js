const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const keys = require("./config/keys");
const port = process.env.PORT || 3001;
const app = express();
mongoose.connect(keys.mongoURI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});
