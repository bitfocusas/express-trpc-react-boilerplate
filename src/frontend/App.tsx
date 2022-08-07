import React from "react";
import { Route, Switch } from "react-router-dom";
import TRPC from "./TRPC";
import Home from "./Home";

import "./App.css";

const App = () => (
	<Switch>
		<TRPC>
			<Route exact={true} path="/" component={Home} />
		</TRPC>
	</Switch>
);

export default App;
