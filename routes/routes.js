const express = require("express");
const axios = require("axios");
const { model } = require("mongoose");
const keys = require("../config/keys");
const router = express.Router();
const Books = model("Book");

router.get("/api/search/:terms", async (req, res) => {
	try {
		const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
		const searchTerms = req.params.terms.replace(" ", "+");
		const URL =
			baseURL +
			searchTerms +
			"&maxResults=20&printType=books&key=" +
			keys.googleAPIKey;

		const results = await axios.get(URL);
		res.json(results.data);
	} catch (e) {
		res.status(500).send(e);
	}
});

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
