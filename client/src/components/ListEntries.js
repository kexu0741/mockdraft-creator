import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListEntries = ({setVisible, setCurrEID}) => {
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

	const editEntry = (eid) => {
		setCurrEID(eid);
		setVisible(false);
	}

	const deleteEntry = async(eid) => {
		const delete_picks_response = await fetch("/delete-picks/" + eid, {
			method: "DELETE"
		});
		const delete_entry_response = await fetch("/delete-entry/" + eid, {
			method: "DELETE"
		});
		window.location = "/";
	}
	// todo: delete entry functionality
		// MAKE SURE TO CALL DELETE PICKS FIRST
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
								<td>
									<button className="btn btn-primary" onClick={
										() => editEntry(entry.eid)
									}>
										Edit
									</button>
								</td>
								<td>
									<button type="button" class="btn btn-danger" data-toggle="modal" data-target={`#id${entry.eid}`}>
										Delete
									</button>

									<div class="modal fade" id={`id${entry.eid}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									  <div class="modal-dialog" role="document">
									    <div class="modal-content">
									      <div class="modal-header">
									        <h5 class="modal-title" id="exampleModalLabel">
									        	Delete Entry
									        </h5>
									        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
									          <span aria-hidden="true">&times;</span>
									        </button>
									      </div>
									      <div class="modal-body">
									      	Are you sure you want to delete entry {entry.entry_name} ? 
									      </div>
									      <div class="modal-footer">
									        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
									        <button type="button" class="btn btn-primary" onClick={
									        	() => deleteEntry(entry.eid)
									        }>
									        	Yes
									        </button>
									      </div>
									    </div>
									  </div>
									</div>
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

