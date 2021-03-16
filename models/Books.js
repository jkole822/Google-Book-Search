const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = new Schema({
	authors: [String],
	title: String,
	subtitle: String,
	description: String,
	image: String,
	link: String,
});

mongoose.model("Book", bookSchema);
