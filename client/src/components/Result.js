import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const Result = ({
	info: { authors, title, subtitle, description, imageLinks, previewLink },
}) => {
	const useStyles = makeStyles({
		viewButton: {
			marginRight: 5,
		},
		saveButton: {
			marginLeft: 5,
		},
	});
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("xs"));

	const renderAuthors = authors => {
		if (authors.length > 1) {
			return authors.join(", ");
		}
		return authors;
	};

	const renderGrid = (imageLinks, description) => {
		if (imageLinks && description) {
			return (
				<>
					<Grid item xs={12} sm={3} align={matches ? "center" : "left"}>
						<img src={imageLinks.thumbnail} />
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>{description}</Typography>
					</Grid>
				</>
			);
		} else if (imageLinks && !description) {
			return (
				<Grid item>
					<img src={imageLinks.thumbnail} />
				</Grid>
			);
		} else if (!imageLinks && description) {
			return (
				<Grid item>
					<Typography>{description}</Typography>
				</Grid>
			);
		}

		return null;
	};

	return (
		<>
			<Grid container justify="space-between">
				<Grid item>
					<Typography>{title}</Typography>
				</Grid>
				<Grid item>
					<Button
						className={classes.viewButton}
						variant="contained"
						color="primary"
						href={previewLink}
					>
						View
					</Button>
					<Button
						className={classes.saveButton}
						variant="contained"
						color="primary"
					>
						Save
					</Button>
				</Grid>
			</Grid>
			<Typography>{subtitle}</Typography>
			{authors ? (
				<Typography>Written by {renderAuthors(authors)}</Typography>
			) : null}
			<Grid container spacing={5}>
				{renderGrid(imageLinks, description)}
			</Grid>
		</>
	);
};

export default Result;
