import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
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

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: "",
		password: "",
		confirmPassword: "",
		msg: ""
	}

	static propTypes =  {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if(error !== prevProps.error) {
			if(error.id === "REGISTER_FAIL") {
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
		//clear errors
		this.props.clearErrors();
		this.setState({modal:!this.state.modal});
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmitForm = e => {
		e.preventDefault();
		const { name, email, password, confirmPassword } = this.state;
		if(password !== confirmPassword) {
			this.setState({msg: "your passwords do not match."});
		} else {
			const newUser = {
				name,email,password
			};
			this.props.register(newUser);
		}
	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href = "#">Register</NavLink>
				
				<Modal
					isOpen={this.state.modal}
					toggle={this.state.toggle}
				>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{ this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmitForm}>
							<FormGroup>
								<Label for="name">Full Name</Label>
								<Input className="mb-3" type = "text" name = "name" id = "name" placeholder ="Full Name" onChange = {this.onChange} />
								<Label for="email">Email Adress</Label>
								<Input className="mb-3" type = "email" name = "email" id = "email" placeholder ="Email Adress" onChange = {this.onChange} />
								<Label for="password">Password</Label>
								<Input className="mb-3" type = "password" name = "password" id = "password" placeholder ="Password" onChange = {this.onChange} />
								<Label for="confirm-password">Confirm Password</Label>
								<Input className="mb-3" type = "password" name = "confirmPassword" id = "confirmPassword" placeholder ="Confirm Password" onChange = {this.onChange} />
								<hr/>
								<div className="text-center">
									<Button className="text-center" color = "dark" type = "submit" name = "submit">Register</Button>
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
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});
 

export default connect(mapStateToProps, { register,clearErrors })(RegisterModal);