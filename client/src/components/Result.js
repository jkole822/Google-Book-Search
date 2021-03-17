import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
	viewButton: {
		marginRight: 5,
	},
	saveButton: {
		marginLeft: 5,
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
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("xs"));

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
					<Grid item xs={12} sm={3} align={matches ? "center" : "left"}>
						<img src={image} />
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>{description}</Typography>
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
			<Typography>{subtitle}</Typography>
			{authors ? (
				<Typography>Written by {renderAuthors(authors)}</Typography>
			) : null}
			<Grid container spacing={5}>
				{renderGrid(image, description)}
			</Grid>
		</>
	);
};

export default Result;
