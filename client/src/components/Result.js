import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Result = ({
	info: { authors, title, subtitle, description, imageLinks, links },
}) => {
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
					<Grid item xs={12} sm={3}>
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
			<Typography>{title}</Typography>
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
