const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

//@route	POST api/auth
//@desc		Auth user
//@access	Public
router.post("/", async (req,res) => {
	const {email, password} = req.body;
	if(!email || !password) {
		return res.status(400).json({msg:"please enter all fields."});
	}
	let user = await User.findOne({email});
	if(!user) {
		return res.status(400).json({msg:"this user does not exist."});
	}
	const isValid = await bcrypt.compare(password, user.password);
	if(!isValid) {
		return res.status(400).json({msg:"incorrect email or password."});
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
					name:user.name,
					email:user.email
				}
			});
		}
	);
});


//@route	GET api/auth/user
//@desc		Get user data
//@access	Private
router.get("/user",auth, async (req,res) => {
	const user = await User.findById(req.user.id).select("-password");
	if(!user) {
		res.status(400).json({msg: "user does not exist."});
	}
	res.json(user);
});

module.exports = router;