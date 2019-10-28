const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

//@route	POST api/auth
//@desc		Auth user
//@access	Public

router.post("/", async (req,res) => {
	const {login, password} = req.body;
	if(!login || !password) {
		return res.status(400).json({msg:"invalid login info."});
	}
	let user = await User.findOne({username: login});
	if(!user) {
		//if the user logged in using email
		user = await User.findOne({email: login});
	}
	if(!user) {
		return res.status(400).json({msg:"this user does not exist."});
	}
	const isValid = await bcrypt.compare(password, user.password);
	if(!isValid) {
		return res.status(400).json({msg:"incorrect username or password."});
	}
	jwt.sign(
		{id:user._id},
		process.env.JWT_SECRET,
		{expiresIn: 3600},
		(err, token) => {
			if(err) throw err;
			res.json({
				token,
				user: {
					id:user._id,
					name:user.username,
					email:user.email
				}
			});
		}
	);
});

module.exports = router;