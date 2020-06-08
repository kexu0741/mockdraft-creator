import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListPlayers = ({eid}) => {
	const [players, setPlayers] = useState([]);

	const getPlayers = async() => {
		try {
			const response = await fetch("/get-players/" + eid);
			const jsonData = await response.json();
			
			setPlayers(jsonData);
		} catch(err){
			console.error(err.message)
		}
	}

	useEffect(() => {
		getPlayers();
	});

	return (
		<Fragment>
			{
				players.map(player => (
					<div>
						<div class="card w-75">
							<div class="card-body">
								<div class="row">
									<div class="col">
										<h5 class="card-title">
											{player.name} <br></br> | {player.position}
										</h5>
									</div>
									<div class="col">
										<button type="button" class="btn btn-primary btn-small" data-toggle="modal" data-target={`#id${player.pid}`}>
									  			Stats
											</button>
											<div class="modal" id={`id${player.pid}`}> 
											  <div class="modal-dialog">
											    <div class="modal-content">

											      <div class="modal-header">
											        <h4 class="modal-title">{player.name}</h4>
											        <button type="button" class="close" data-dismiss="modal">&times;</button>
											      </div>


											      <div class="modal-body">
											        <dl class="row">
													  <dt class="col-sm-3">Position</dt>
													  <dd class="col-sm-9">{player.position}</dd>

													  <dt class="col-sm-3">School</dt>
													  <dd class="col-sm-9">{player.school}</dd>

													  <dt class="col-sm-3">Height</dt>
													  <dd class="col-sm-9">{player.height}</dd>

													  <dt class="col-sm-3">Weight</dt>
													  <dd class="col-sm-9">{player.weight}</dd>

													  <dt class="col-sm-3">Year</dt>
													  <dd class="col-sm-9">{player.year}</dd>

													  <dt class="col-sm-3">Age</dt>
													  <dd class="col-sm-9">{player.age}</dd>

													  <dt class="col-sm-3">PPG</dt>
													  <dd class="col-sm-9">{player.ppg}</dd>

													  <dt class="col-sm-3">RPG</dt>
													  <dd class="col-sm-9">{player.rpg}</dd>

													  <dt class="col-sm-3">APG</dt>
													  <dd class="col-sm-9">{player.apg}</dd>

													  <dt class="col-sm-3">BPG</dt>
													  <dd class="col-sm-9">{player.bpg}</dd>

													  <dt class="col-sm-3">SPG</dt>
													  <dd class="col-sm-9">{player.spg}</dd>
													</dl>
											      </div>

											      <div class="modal-footer">
											        <button type="button" class="btn btn-danger" data-dismiss="modal">
											        	Close
											        </button>
											      </div>

											    </div>
											  </div>
											</div>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<p class="card-text">
											PPG: {player.ppg} | RPG: {player.rpg} | APG: {player.apg}
										</p>
									</div>
									<div class="col">
										<button type="button" class="btn btn-success btn-small">
											Draft
										</button>
									</div>
								</div>
							</div>
						</div>
						<br></br>
					</div>
				))
			}
		</Fragment>
		)
};

export default ListPlayers;