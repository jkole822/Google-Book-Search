import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	imageBox: {
		position: "relative",
	},
	image: {
		width: "100%",
	},
	imageTitle: {
		position: "absolute",
		color: "white",
		top: "40%",
		left: "50%",
		transform: "translate(-50%, -40%)",
	},
	imageSubtitle: {
		position: "absolute",
		color: "white",
		top: "60%",
		left: "50%",
		transform: "translate(-50%, -60%)",
	},
});

const Header = () => {
	const classes = useStyles();

	return (
		<Box className={classes.imageBox}>
			<img className={classes.image} src="./books.jpg" alt="library books" />
			<Typography className={classes.imageTitle} variant="h2" component="h1">
				Google Books Search
			</Typography>
			<Typography className={classes.imageSubtitle} variant="h3" component="h2">
				Find the book you're looking for.
			</Typography>
		</Box>
	);
};

export default Header;
