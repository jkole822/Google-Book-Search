import React, { useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import Result from "./Result";

const Saved = () => {
	const [terms, setTerms] = useState("");
	const [results, setResults] = useState([]);

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
			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
				<OutlinedInput
					id="outlined-adornment-amount"
					labelWidth={60}
					onChange={({ target }) => setTerms(target.value)}
					value={terms}
				/>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				onClick={() => performQuery(terms)}
			>
				Search
			</Button>
			{renderResults()}
		</Container>
	);
};

export default Saved;
