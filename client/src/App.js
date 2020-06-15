import React, {Fragment, useState, useEffect} from 'react';
import './App.css';

// import components
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./components/Dashboard";
import ViewEntry from "./components/ViewEntry";

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

	const isAuth = async() => {
		try {
			const response = await fetch("/is-verify", {
				method: "GET",
				headers: {token: localStorage.token} // passing token to auth middleware
			});

			const parseRes = await response.json();
			
			if (parseRes === true){
				setIsAuthenticated(true);
			}
			else{
				setIsAuthenticated(false);
			}	
		} catch (err){
			console.error(err.message); // invalid token/not authorized
		}
	}

	useEffect(()=> {
		isAuth();
	}, []); // makes only one request when component is rendered 


	return (
	<Fragment>
		<Router>
		    <div className="container">
		    	<Switch>
		    		<Route exact path="/" render={props => 
		    			!isAuthenticated ? (
		    			<div>
			    			<div className="container">
			    				<h1 id="landing-title">Mock Draft Creator</h1>
			    			</div>
			    			<div className="row">
			    				<div className="col-lg center-col">
				    				<RegisterUser setAuth={setAuth}/>
				    			</div>
				    			<div className="col-lg center-col">
				    				<LoginUser setAuth={setAuth}/>
				    			</div>
			    			</div>
			    		</div>
		    			):(<Redirect to="/dashboard"/>)
		    			}
		    		/>
		    		<Route exact path="/dashboard" render={props => 
		    			isAuthenticated ? (
		    				<div className="container">
		    					<Dashboard setAuth={setAuth}/>
		    				</div>):(<Redirect to="/"/>) 
		    			} 
		    		/>
		    		<Route exact path="/view/:eid" component={ViewEntry}/>
		    	</Switch>
		    </div>
		</Router>
	</Fragment>
	);
}

export default App;
