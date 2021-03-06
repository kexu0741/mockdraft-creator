import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

import CreateEntry from "./CreateEntry";
import ListEntries from "./ListEntries";
import ListPlayers from "./ListPlayers";
import ListPicks from "./ListPicks";
import HelpButton from "./HelpButton";
import ShareButton from "./ShareButton"

// TODO: 
// Figure out why we aren't authorized on refresh of /dashboard
// Touch up login/register page

const Dashboard = ({setAuth}) => {
	const [uid, setUID] = useState(-1);
	const [mocksVisible, setMocksVisible] = useState(true);
	const [eid, setEID] = useState(-1); 
	const [pick_num, setPick] = useState(-1); // state for pick number to be altered

	const getUID = async() => {
		try {
			const response = await fetch("/dashboard", {
				method: "GET",
				headers: {token: localStorage.token}
			});

			const parseRes = await response.json();

			setUID(parseRes.uid);	
			// add setAuth here? 	
		} catch(err) {
			console.error(err.message);
		}
	}

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token"); // remove token from local storage
		setAuth(false);
	}

	const setVisible = (boolean) => { // pass this to listEntries?
		setMocksVisible(boolean);
	}

	const setCurrEID = (num) => {
		setEID(num);
	}

	const setCurrPickNum = (num) => {
		setPick(num);
	}

	useEffect(() => {
		getUID();
	}, []); // [] makes one request when component is rendered

	// todo: info and share button

	return (
		<Fragment>
			<h1>Mock Draft Creator</h1>
			<button className="btn-danger" onClick={
				e => logout(e)}>
				Logout
			</button>
			<br></br>
			<br></br>
			{ 
				mocksVisible ? (<div>
				<ListEntries setVisible={setVisible} setCurrEID={setCurrEID}/>
				<CreateEntry setVisible={setVisible} setCurrEID={setCurrEID}/> 
				</div>)
				: (<div>
					<button className="btn btn-primary" onClick={
							() => {
								window.location="/";
							}
						}>
						Back
					</button>
					<div class="divider"/>
					<HelpButton/>
					<div class="divider"/>
					<ShareButton eid={eid}/>
					<div className="creator-area">
						<div class="row">
							<div class="col">
								<ListPicks eid={eid} setCurrPickNum={setCurrPickNum}/>
							</div>
							<div class="col" id="player-list">
								<ListPlayers eid={eid} pick_num={pick_num}/>
							</div>	
						</div>
					</div>
				</div>)
			}
		</Fragment>
	);
};

export default Dashboard;
