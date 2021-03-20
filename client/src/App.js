import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Search from "./components/Search";
import Saved from "./components/Saved";
import socket from "./utils/socket";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
	const [open, setOpen] = useState(false);
	const [messageType, setMessageType] = useState("");
	const [title, setTitle] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		socket.on("saveMessage", title => {
			setMessageType("save");
			setTitle(title);
			setOpen(true);
		});
		socket.on("deleteMessage", title => {
			setMessageType("delete");
			setTitle(title);
			setOpen(true);
		});
	}, []);

	return (
		<>
			<CssBaseline>
				<BrowserRouter>
					<Navigation />
					<Header />
					<Switch>
						<Route path="/" component={Search} exact />
						<Route path="/saved" component={Saved} exact />
					</Switch>
				</BrowserRouter>
				<Snackbar
					open={open && messageType === "save"}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="success">
						{`${title} was added to saved collection.`}
					</Alert>
				</Snackbar>
				<Snackbar
					open={open && messageType === "delete"}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="error">
						{`${title} was deleted from saved collection.`}
					</Alert>
				</Snackbar>
			</CssBaseline>
		</>
	);
};

export default App;
