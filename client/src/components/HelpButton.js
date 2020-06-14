import React, {Fragment} from 'react';
import './../App.css';

const HelpButton = () => {
	return(
		<Fragment>
			<button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
			  Help
			</button>

			<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Info</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        Click on a team to begin selecting a player for them. To select a player for a team, click on the player's "draft" button.  
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		</Fragment>
		);
}

export default HelpButton