import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ViewEntry = (props) => {
	const [picks, setPicks] = useState([]);

	const getPicks = async(eid) => {
		try{
			const response = await fetch("/get-picks/" + eid);
			const jsonData = await response.json();

			setPicks(jsonData);
		} catch (err) {
			console.error(err.message);
		}

	}

	const goBack = () => {
		window.location = "/";
	}

	useState(() => {
		getPicks(props.match.params.eid);
	}, []);

	return (
		<Fragment>
			<button className="btn btn-primary" onClick={
				() => goBack()
			}>
				Back
			</button>
			{
				picks.map(pick => (
					<div class="picks">
						<div class="row">
							{pick.pick_number}
							<div class="col">
								<div class="card flex-row flex-wrap w-50">
							        <div class="card-header border-0">
							            <img className="team-logo" src={require(`./../img/${pick.tid}.png`)} alt=""/>
							        </div>
							        <div class="card-block px-2">
								        <h4 class="card-title">{pick.team_name}</h4>
								            {
								            	pick.name === null ? (<h6></h6>):
								            	(<h6>{pick.name} | {pick.position}</h6>)
								            }
							        </div>
							        <div class="w-100"></div>
							    </div>
							</div>
						</div>
						<br></br>
					</div>
					))
			}
		</Fragment>
		);
};

export default ViewEntry;