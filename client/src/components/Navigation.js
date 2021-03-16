import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	navLinks: {
		fontFamily: "Roboto, sans-serif",
		color: "rgb(250, 250, 250)",
		textDecoration: "none",
		textTransform: "uppercase",
		letterSpacing: "0.05em",
	},
}));

const Navigation = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Google Book Search
					</Typography>
					<Box mr={5}>
						<NavLink
							to="/saved"
							className={classes.navLinks}
							activeStyle={{
								color: "#267AFE",
								fontWeight: 700,
							}}
						>
							Saved
						</NavLink>
					</Box>
					<NavLink
						to="/"
						className={classes.navLinks}
						activeStyle={{
							color: "#267AFE",
							fontWeight: 700,
						}}
						exact
					>
						Search
					</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navigation;
