import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Result from "./Result";

const Saved = () => {
	const [books, setBooks] = useState({});

	useEffect(() => {
		fetchSavedBooks();
	}, []);

	const fetchSavedBooks = async () => {
		const fetchedBooks = await axios.get("/api/books");

		setBooks(fetchedBooks.data);
	};

	const handleDelete = async id => {
		await axios.delete(`/api/books/${id}`);
		fetchSavedBooks();
	};

	const renderResults = () => {
		if (books.length) {
			return books.map(result => {
				return (
					<Result
						key={result._id}
						info={result}
						image={result.image}
						link={result.link}
						id={result._id}
						handleDelete={handleDelete}
					/>
				);
			});
		}
		return null;
	};

	return <Container>{renderResults()}</Container>;
};

export default Saved;
