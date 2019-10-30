import axios from "axios";
import { returnErrors } from "./errorActions";
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from "./types";

//register user
export const register = ({name, email, password}) => async dispatch => {
	//header
	const config = {
		headers: {
			"Content-Type":"application/json"
		}
	}
	//body
	const body = JSON.stringify({name, email, password});
	try {
		const response = await axios.post("/api/users", body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data
		});
	} catch(err) {
		dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
		dispatch({
			type:REGISTER_FAIL 
		});
	}
};

export const login = ({email, password}) => async dispatch => {
	const config = {
		headers: {
			"Content-Type":"application/json"
		}
	}
	const body = JSON.stringify({email, password});
	try {
		const response = await axios.post("/api/auth", body, config);
		dispatch({
			type:LOGIN_SUCCESS,
			payload:response.data
		});
	} catch(err) {
		dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
		dispatch({
			type:LOGIN_FAIL
		});
	}
}

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT_SUCCESS
	})
}

//check token and auth user
export const loadUser = () => async (dispatch, getState) => { 
	dispatch({ type:USER_LOADING });

	const token = getState().auth.token;
	//set headers
	const config = {
		headers: {
			"Content-Type":"application/json"
		}
	}
	if(token) {
		config.headers["x-auth-token"] = token;
	}
	try {
		const response = await axios.get("/api/auth/user",config);
		dispatch({
			type: USER_LOADED,
			pyaload: response.data
		});
	} catch(err) {
		dispatch(returnErrors(err.response.data, err.response.status));
		dispatch({
			type: AUTH_ERROR
		})
	}
};