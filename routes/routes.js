const express = require("express");
const { model } = require("mongoose");

const router = express.Router();
const Books = model("Book");

router.get("/api/books", async (req, res) => {
	try {
		const books = await Books.find({});

		res.json(books);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.post("/api/books", async (req, res) => {
	try {
		const book = await Books.create(req.body);

		res.status(201).json(book);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete("/api/delete/:id", async (req, res) => {
	try {
		const book = await Books.findByIdAndDelete(req.params.id);

		res.json(book);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
