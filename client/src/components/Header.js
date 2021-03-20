import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
	imageBox: {
		position: "relative",
	},
	image: {
		width: "100%",
	},
	imageTitleSmall: {
		position: "absolute",
		color: "white",
		top: "40%",
		transform: "translateY(-40%)",
		fontSize: "5vw",
		width: "100%",
	},
	imageTitleMed: {
		position: "absolute",
		color: "white",
		top: "40%",
		transform: "translateY(-40%)",
		width: "100%",
	},
	imageSubtitleSmall: {
		fontSize: "4vw",
		position: "absolute",
		color: "white",
		top: "60%",
		transform: "translateY(-60%)",
		width: "100%",
	},
	imageSubtitleMed: {
		position: "absolute",
		color: "white",
		top: "60%",
		transform: "translateY(-60%)",
		width: "100%",
	},
});

const Header = () => {
	const theme = useTheme();

	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const classes = useStyles();

	return (
		<Box className={classes.imageBox}>
			<img className={classes.image} src="./books.jpg" alt="library books" />
			<Typography
				align="center"
				className={matches ? classes.imageTitleSmall : classes.imageTitleMed}
				variant="h2"
				component="h1"
			>
				Google Books Search
			</Typography>
			<Typography
				align="center"
				className={
					matches ? classes.imageSubtitleSmall : classes.imageSubtitleMed
				}
				variant="h3"
				component="h2"
			>
				Find the book you're looking for.
			</Typography>
		</Box>
	);
};

export default Header;
