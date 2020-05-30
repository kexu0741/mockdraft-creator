import React, {Fragment, useState} from 'react';
import './App.css';

// import components
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./components/Dashboard";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	}

	return (
	<Fragment>
		<Router>
		    <div className="container">
		    	<Switch>
		    		<Route exact path="/" render={props => 
		    			!isAuthenticated ? (
		    			<div className="row">
		    				<div className="col-sm">
			    				<RegisterUser setAuth={setAuth}/>
			    			</div>
			    			<div className="col-sm">
			    				<LoginUser setAuth={setAuth}/>
			    			</div>
		    			</div>):(<Redirect to="/dashboard"/>)
		    			}
		    		/>
		    		<Route exact path="/dashboard" render={props => 
		    			isAuthenticated ? (
		    				<Dashboard setAuth={setAuth}/>):(<Redirect to="/"/>) 
		    			} 
		    		/>
		    	</Switch>
		    </div>
		</Router>
	</Fragment>
	);
}

export default App;
