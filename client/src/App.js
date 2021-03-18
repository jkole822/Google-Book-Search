import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Search from "./components/Search";
import Saved from "./components/Saved";

const App = () => {
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
			</CssBaseline>
		</>
	);
};

export default App;
