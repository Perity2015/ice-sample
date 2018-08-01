import PageLoading from "@components/load";
import { NotFound } from "@components/NotFound";
import { createBrowserHistory } from "history";
import { parse } from "qs";
import React from "react";
import Loadable from "react-loadable";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { Paths, RoutePaths } from './const';

const history = createBrowserHistory();

const addLocationQuery = (nextHistory) => {
	nextHistory.location = {
		...nextHistory.location,
		query: parse(nextHistory.location.search.substr(1)),
	};
};

addLocationQuery(history);

history.listen(() => addLocationQuery(history));

const App = Loadable({
	loader: () => (import("@views/App")),
	loading: PageLoading,
});


const App2 = Loadable({
	loader: () => (import("@views/App2")),
	loading: PageLoading,
});

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route exact={true} path={RoutePaths[Paths.APP]} component={App}/>
				<Redirect exact={true} from={"/"} to={RoutePaths[Paths.APP]}/>
				<Route exact={true} path={RoutePaths[Paths.APP2]} component={App2}/>
				<Route path={"*"} component={NotFound}/>
			</Switch>
		</div>
	</Router>
);

export default AppRouter;