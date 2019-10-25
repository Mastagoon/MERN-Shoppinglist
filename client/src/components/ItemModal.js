import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";

class ItemModal extends Component {
	state = {
		modal: false,
		name: ''
	}

	toggle = () => {
		this.setState({modal: !this.state.modal});
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmitForm = e => {
		e.preventDefault();
		const newItem = {
			name: this.state.name
		}
		this.props.addItem(newItem);
		this.toggle();
	}

	render() {
		return (
			<div>
				<Button
					color="dark"
					style = {{marginBottom: "2rem"}}
					onClick={this.toggle}
				>Add Item</Button>

				<Modal
					isOpen={this.state.modal}
					toggle={this.state.toggle}
				>
					<ModalHeader toggle={this.toggle}>Add to the list</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmitForm}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input type = "text" name = "name" id = "item" placeholder ="add item" onChange = {this.onChange} />
								<Button color = "dark" style = {{marginTop: "2rem"}} type = "submit" name = "submit">Add Item</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.item
});
 

export default connect(mapStateToProps, { addItem })(ItemModal);