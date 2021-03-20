require("./models/Books");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const keys = require("./config/keys");
const port = process.env.PORT || 5000;
const app = express();
const httpServer = require("http").createServer(app);

const routes = require("./routes/routes");

mongoose.connect(keys.mongoURI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());

if (process.env.NODE_ENV === "production") {
	origin = "https://jkg-google-books.herokuapp.com";
} else {
	origin = "http://localhost:3000";
}

const io = require("socket.io")(httpServer, {
	cors: {
		origin,
		methods: ["GET", "POST"],
	},
});

io.on("connection", socket => {
	console.log("New client connected");
	socket.on("save", title => {
		io.emit("saveMessage", title);
	});
	socket.on("delete", title => {
		io.emit("deleteMessage", title);
	});
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

httpServer.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});
