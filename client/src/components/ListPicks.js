import React, {Fragment, useState, useEffect} from 'react';
import './../App.css';

const ListPicks = ({eid, setCurrPickNum}) => {
	const [picks, setPicks] = useState([]);
	const [selected, setSelected] = useState(10); // state for getting selected team's logo

	const getPicks = async() => {
		try {
			const response = await fetch("/get-picks/" + eid);
			const jsonData = await response.json();

			setPicks(jsonData);
		} catch (err){
			console.log(err.message);
		}
	}

	useEffect(() => {
		getPicks();
	});

	// todo: insert logos with template string(?)
    // todo: mark selected card (border-secondary => border-success ?)
	return (
		<Fragment>
			{
				picks.map(pick => (
					<div>
						<div class="row">
							{pick.pick_number}
							<div class="col">
								<button onClick={
									() => {
										setSelected(pick.tid);
										setCurrPickNum(pick.pick_number);
									}
								}>
									<div class="card flex-row flex-wrap">
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
							    </button>
							</div>
						</div>
						<br></br>
					</div>
					))
			}
		</Fragment>
		)
};

export default ListPicks;