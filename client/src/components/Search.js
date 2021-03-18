import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Result from "./Result";

const useStyles = makeStyles({
	search: {
		border: "3px solid black",
		borderRadius: 7,
	},
	searchHeader: {
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
		border: "3px solid black",
		borderRadius: 7,
	},
	resultsHeader: {
		marginBottom: 15,
	},
});

const Saved = () => {
	const [terms, setTerms] = useState("");
	const [results, setResults] = useState([]);

	const classes = useStyles();

	const performQuery = async () => {
		const res = await axios.get(`/api/search/${terms}`);
		console.log(res);
		setResults(res.data.items);
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

	return (
		<Container>
			<Box mt={20} p={8} className={classes.search}>
				<Typography
					variant="h4"
					component="h2"
					className={classes.searchHeader}
				>
					Book Search
				</Typography>
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-adornment-amount">Book</InputLabel>
					<OutlinedInput
						labelWidth={35}
						onChange={({ target }) => setTerms(target.value)}
						value={terms}
					/>
				</FormControl>
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
				<Box my={5} p={5} className={classes.resultBox}>
					<Typography
						variant="h5"
						component="h3"
						className={classes.resultsHeader}
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
