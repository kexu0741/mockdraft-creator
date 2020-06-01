import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const Dashboard = ({setAuth}) => {
	const [uid, setUID] = useState(-1);

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
		</Fragment>
	);
};

export default Dashboard;
