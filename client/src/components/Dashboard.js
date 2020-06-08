import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

import CreateEntry from "./CreateEntry";
import ListEntries from "./ListEntries";
import ListPlayers from "./ListPlayers";

const Dashboard = ({setAuth}) => {
	const [uid, setUID] = useState(-1);
	const [mocksVisible, setMocksVisible] = useState(true);
	const [eid, setEID] = useState(-1); 

	const getUID = async() => {
		try {
			const response = await fetch("/dashboard", {
				method: "GET",
				headers: {token: localStorage.token}
			});

			const parseRes = await response.json();

			setUID(parseRes.uid);
			
		} catch(err) {
			console.error(err.message);
		}
	}

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token"); // remove token from local storage
		setAuth(false);
	}

	const setVisible = (boolean) => { 
		setMocksVisible(boolean);
	}

	const setCurrEID = (num) => {
		setEID(num);
	}

	useEffect(() => {
		getUID();
	}, []); // [] makes one request when component is rendered

	return (
		<Fragment>
			<h1>Dashboard</h1>
			<button className="btn-danger" onClick={
				e => logout(e)}>
				Logout
			</button>
			<br></br>
			<br></br>
			{ 
				mocksVisible ? (<div>
				<ListEntries/>
				<CreateEntry setVisible={setVisible} setCurrEID={setCurrEID}/> 
				</div>)
				: (<div class="row">
					<div class="col">
						filler
					</div>
					<div class="col">
						<ListPlayers eid={eid}/>
					</div>	
				</div>)
			}
		</Fragment>
	);
};

export default Dashboard;
