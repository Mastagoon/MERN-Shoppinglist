import React, { Component } from "react";
import { login } from "../../actions/authActions";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import PropTypes from "prop-types";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
	Alert
} from "reactstrap";


class LoginModal extends Component {
	state = {
		modal: false,
		email: "",
		password: "",
		msg: null
	}

	/*componentDidUpdate(prevProps) {
		const error = this.props
		if(error !== prevProps.error) {
			if(error.id === "REGISTER_FAIL") {
				this.setState({msg: error.msg.msg});
			} else {
				this.setState({msg:null});
			}
		}
		if(this.state.modal) {
			this.toggle();
		}
	}*/

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if(error !== prevProps.error) {
			if(error.id === "LOGIN_FAIL") {
				this.setState({msg:error.msg.msg});
			} else {
				this.setState({msg: ""}); 
			}
		}
		if(this.state.modal) {
			if(this.props.isAuthenticated) {	//if register success
				this.toggle();
			}
		}
	}

	toggle = () => {
		this.props.clearErrors();
		this.setState({modal: !this.state.modal});
	}

	onChange = e =>{
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmitForm = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const user = {
			email,
			password
		}
		this.props.login(user);
	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">Login</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>		
					<ModalBody>
						{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmitForm}>
							<FormGroup>
								<Label for="email">Email Adress</Label>
								<Input type="email" id="email" name="email" onChange={this.onChange} />

								<Label for="password">Password</Label>
								<Input type="password" id="password" name="password" onChange={this.onChange} />

								<hr/>
								
								<div className="text-center"> 
									<Button className="my-2" color="dark" type="submit" name="submit">Login</Button>
								</div>
							</FormGroup>
						</Form>
					</ModalBody>	
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	error: state.error,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login,clearErrors })(LoginModal);