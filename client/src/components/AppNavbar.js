import React, { Component, Fragment } from 'react';
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import { logout } from "../actions/authActions";
import { connect } from "react-redux";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavbarBrand,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';

class AppNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logout();
	}

	toggle = () => {
		this.setState ({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
			<Navbar color="dark" dark expand="sm" className="mb-5">
				<Container>
					<NavbarBrand href = "/">Shopping List</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{
								!this.props.isAuthenticated ? 
								<Fragment>
									<NavItem><RegisterModal /></NavItem>
									<NavItem><LoginModal /></NavItem>
								</Fragment>
								 :
								<NavItem><NavLink href = "#" onClick={this.onLogoutClick}>Logout</NavLink></NavItem>
							}
							
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(AppNavbar);