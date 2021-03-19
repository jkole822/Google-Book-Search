import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

import axios from "axios";

const useStyles = makeStyles({
	viewButton: {
		marginRight: 5,
	},
	saveButton: {
		marginLeft: 5,
	},
	resultBox: {
		borderRadius: 7,
		backgroundColor: indigo[100],
	},
	description: {
		lineHeight: 1.6,
	},
	title: {
		marginBottom: 20,
	},
	subtitle: {
		marginBottom: 10,
	},
	authors: {
		marginBottom: 20,
	},
});

const Result = ({
	info: { authors, title, subtitle, description },
	id,
	image,
	link,
	handleDelete,
}) => {
	const classes = useStyles();

	const location = useLocation();

	const handleSave = () => {
		axios.post("/api/books", {
			authors,
			title,
			subtitle,
			description,
			image,
			link,
		});
	};

	const renderAuthors = authors => {
		if (authors.length > 1) {
			return authors.join(", ");
		}
		return authors;
	};

	const renderGrid = (image, description) => {
		if (image && description) {
			return (
				<>
					<Grid item xs={12} sm={3} align="center">
						<img src={image} />
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography align="justify" className={classes.description}>
							{description}
						</Typography>
					</Grid>
				</>
			);
		} else if (image && !description) {
			return (
				<Grid item>
					<img src={image} />
				</Grid>
			);
		} else if (!image && description) {
			return (
				<Grid item>
					<Typography variant="body1" className={classes.description}>
						{description}
					</Typography>
				</Grid>
			);
		}

		return null;
	};

	return (
		<Box className={classes.resultBox} p={5} mb={5}>
			<Grid container justify="space-between" className={classes.title}>
				<Grid item>
					<Typography variant="h6" component="h4">
						{title}
					</Typography>
				</Grid>
				<Grid item>
					<Button
						className={classes.viewButton}
						variant="contained"
						color="primary"
						href={link}
					>
						View
					</Button>
					{location.pathname === "/" ? (
						<Button
							className={classes.saveButton}
							variant="contained"
							color="primary"
							onClick={handleSave}
						>
							Save
						</Button>
					) : (
						<Button
							className={classes.saveButton}
							variant="contained"
							color="primary"
							onClick={() => handleDelete(id)}
						>
							Delete
						</Button>
					)}
				</Grid>
			</Grid>
			<Typography
				variant="subtitle2"
				component="h5"
				className={classes.subtitle}
			>
				{subtitle}
			</Typography>
			{authors ? (
				<Typography variant="body2" className={classes.authors}>
					Written by {renderAuthors(authors)}
				</Typography>
			) : null}
			<Grid container spacing={5} alignItems="center">
				{renderGrid(image, description)}
			</Grid>
		</Box>
	);
};

export default Result;
