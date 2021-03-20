import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Result from "./Result";
import socket from "../utils/socket";

const useStyles = makeStyles({
	savedHeader: {
		marginBottom: 15,
	},
	container: {
		color: indigo[900],
		borderRadius: 7,
	},
});

const Saved = () => {
	const [books, setBooks] = useState({});

	useEffect(() => {
		fetchSavedBooks();
	}, []);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();

	const fetchSavedBooks = async () => {
		const fetchedBooks = await axios.get("/api/books");

		setBooks(fetchedBooks.data);
	};

	const handleDelete = async (id, title) => {
		await axios.delete(`/api/books/${id}`);
		fetchSavedBooks();
		socket.emit("delete", title);
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

	return (
		<Container>
			<Box my={5} p={matches ? 0 : 5} className={classes.container}>
				<Typography
					variant="h5"
					component="h3"
					className={classes.savedHeader}
					align="center"
				>
					Saved Books
				</Typography>
				<Box>{renderResults()}</Box>
			</Box>
		</Container>
	);
};

export default Saved;
