require("./models/Books");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const keys = require("./config/keys");
const port = process.env.PORT || 5000;
const app = express();
const routes = require("./routes/routes");

mongoose.connect(keys.mongoURI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});
