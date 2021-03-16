import React from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

const Saved = () => {
	return (
		<Container>
			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
				<OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
			</FormControl>
		</Container>
	);
};

export default Saved;
