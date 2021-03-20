import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";

import Result from "./Result";

const useStyles = makeStyles(theme => ({
	searchHeader: {
		color: indigo[700],
		marginBottom: 30,
	},
	searchButton: {
		marginTop: 30,
		float: "right",
	},
	clearBox: {
		clear: "both",
	},
	resultBox: {
		color: indigo[900],
		borderRadius: 7,
		backgroundColor: "",
	},
	resultsHeader: {
		marginBottom: 15,
	},
}));

const Saved = () => {
	const [terms, setTerms] = useState("");
	const [results, setResults] = useState([]);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();

	const performQuery = async () => {
		const res = await axios.get(`/api/search/${terms}`);
		setResults(res.data.items);
		setTerms("");
	};

	const renderResults = () => {
		if (results.length) {
			return results.map(result => {
				return (
					<Result
						key={result.id}
						info={result.volumeInfo}
						image={
							result.volumeInfo.imageLinks
								? result.volumeInfo.imageLinks.thumbnail
								: null
						}
						link={result.volumeInfo.previewLink}
					/>
				);
			});
		}
		return null;
	};

	const handleSubmit = e => {
		e.preventDefault();

		performQuery(terms);
	};

	return (
		<Container>
			<Box my={10} p={8}>
				<Typography
					variant="h4"
					component="h2"
					className={classes.searchHeader}
				>
					Book Search
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label="Books"
						onChange={({ target }) => setTerms(target.value)}
						value={terms}
					/>
				</form>
				<Button
					className={classes.searchButton}
					variant="contained"
					color="primary"
					onClick={() => performQuery(terms)}
				>
					Search
				</Button>
				<Box className={classes.clearBox}></Box>
			</Box>
			{Object.keys(results).length ? (
				<Box my={5} p={matches ? 0 : 5} className={classes.resultBox}>
					<Typography
						variant="h5"
						component="h3"
						className={classes.resultsHeader}
						align="center"
					>
						Results
					</Typography>
					{renderResults()}
				</Box>
			) : null}
		</Container>
	);
};

export default Saved;
