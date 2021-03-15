const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = new Schema({
	title: String,
	authors: [String],
	description: String,
	image: String,
	link: String,
});

mongoose.model(Book, bookSchema);
