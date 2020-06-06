import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const CreateEntry = ({setVisible}) => {
	const [entryName, setEntryName] = useState("");

	const submitEntryName = async(e) => {
		e.preventDefault();
		try {
			const body = {entryName};
			const response = await fetch("/create-entry", {
				"method": "POST",
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.token
				},
				body: JSON.stringify(body)
			});
			setVisible(false); // clear button, mock list
		} catch (err){
			console.log(err.message);
		}
	}

	return (
		<Fragment>
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-backdrop="false">
				Create Mock
			</button>

			<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">
			        	Create Mock
			        </h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			      	<h6> Create a Name for Your Mock </h6>
			      	<input type="text" className="form-control" onChange={
		        	e => setEntryName(e.target.value)}/>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={
			        	e => submitEntryName(e)
			        }>
			        	Submit
			        </button>
			      </div>
			    </div>
			  </div>
			</div>
		</Fragment> 
		)
}

export default CreateEntry;