import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListEntries = () => {
	const [entries, setEntries] = useState([]); // state for listing user mocks
	const [hasMocks, setHasMocks] = useState(false); // state for whether the user has existing mocks

	const getEntries = async() => { 
		try {	
			const response = await fetch("/get-entries", {
				method: "GET",
				headers: {token: localStorage.token}
			});

			const parseRes = await response.json();
			if (parseRes.length > 0){
				setHasMocks(true); // mocks found for user
				setEntries(parseRes);
			}
			else{
				setHasMocks(false); // no mocks found for user
			}
		} catch(err) {
			console.error(err.message);
		}
	}

	useEffect(() => {
		getEntries();
	}, []);

	return (
		<Fragment>
			{
				hasMocks ? <div>
				<h5>Your Mocks:</h5> 
				<table class="table">
					<tbody>
					{
						entries.map(entry => (
							<tr key={entry.eid}>
								<td>
									{entry.entry_name}
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
				</div>
				: null
			}
		</Fragment>
		);
};

export default ListEntries;

