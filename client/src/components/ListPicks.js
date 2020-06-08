import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListPicks = ({eid}) => {
	const [picks, setPicks] = useState([]);

	const getPicks = async() => {
		try {
			console.log(eid);
			const response = await fetch("/get-picks/" + eid);
			const parseRes = await response.json();

			console.log(parseRes);
		} catch (err){
			console.log(err.message);
		}
	}

	useEffect(() => {
		getPicks();
	})

	return (
		<Fragment>

		</Fragment>
		)
};

export default ListPicks;