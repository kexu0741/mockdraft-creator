import React, {Component, Fragment} from "react";
import './../App.css';

export default class LoginUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleInputChange = (event) => {
		const {value, name} = event.target;
		this.setState({
			[name]: value
		});
	}

	onSubmit = async(event) => {
		event.preventDefault();
		try {
			const response = await fetch("/login", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			})
			if (response.status === 401){
				alert("Invalid Email or Password");
				return;
			}
			else{
				const parseRes = await response.json();

				localStorage.setItem("token", parseRes.token);

				this.props.setAuth(true);
			}
		} catch (err) {
			console.log(err.message);
		}

	}

	render() {
		return (
			<Fragment>
				<div class="toForm">
					<button type="button" class="btn btn-primary reg" data-toggle="modal" data-target="#login">
					  Log in
					</button>

					<div class="modal" id="login" data-backdrop="false">
					  <div class="modal-dialog">
					    <div class="modal-content">

					      <div class="modal-header">
					        <h4 class="modal-title">Log In</h4>
					        <button type="button" class="close" data-dismiss="modal">&times;</button>
					      </div>

					      <div class="modal-body">
					         <form onSubmit={this.onSubmit}>
					         	<div class="form-group row">
						 			<label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
							        <input
										className="form-control"
										type="email"
										name="email"
										placeholder="Enter email"
										value={this.state.email}
										onChange={this.handleInputChange}
										required
							        />
							    </div>
							    <div class="form-group row">
							        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
							        <input
										className="form-control"
										type="password"
										name="password"
										placeholder="Enter password"
										value={this.state.password}
										onChange={this.handleInputChange}
										required
							        />
							    </div>
						       	<button className="btn btn-primary mb-2"> 
						       		Submit 
						       	</button>
						      </form>
					      </div>

					    </div>
					  </div>
					</div>
				</div>
			</Fragment>
		);
	}
};

// export default RegisterUser;