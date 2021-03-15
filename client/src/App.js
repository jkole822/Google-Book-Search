import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Search from "./components/Search";
import Saved from "./components/Saved";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Search} exact />
					<Route path="/saved" component={Saved} exact />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
