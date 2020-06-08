import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListPlayers = ({eid}) => {
	const [players, setPlayers] = useState([]);

	const getPlayers = async() => {
		try {
			const response = await fetch("/get-players/" + eid);
			const parseRes = await response.json();
			console.log(parseRes)
		} catch(err){
			console.error(err.message)
		}
	}

	useEffect(() => {
		getPlayers();
	});

	return (
		<Fragment>
			<h2>test</h2>
		</Fragment>
		)
};

export default ListPlayers;