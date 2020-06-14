import React, {Fragment, useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './../App.css';


const ShareButton = ({eid}) => {
	return (
		<Fragment>
			<button className="btn btn-success" data-toggle="modal" data-target="#share">
				Share
			</button>

			<div class="modal fade" id="share" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Share</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        {
			        	<p>
			        		{`https://mockdraftcreator.herokuapp.com/view/${eid}`}
			        	</p>
			        }
			      </div>
			      <div class="modal-footer">
			      	<CopyToClipboard text={`https://mockdraftcreator.herokuapp.com/view/${eid}`}>
				      	<button type="button" class="btn btn-primary" onClick={
				      		() => {
				      			alert("Copied to Clipboard")
				      		}
				      	}>
				      		Copy
				      	</button>
				    </CopyToClipboard>
			        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		</Fragment>
		)
}

export default ShareButton;