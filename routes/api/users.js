const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");



//@route	GET api/users
//@desc		Get all users
//@access	Private
router.get("/", async (req,res) => {
	res.json(await User.find());
})

/*
//@route	DELETE api/users
//@desc		DELETE a user
//@access	Private
router.delete("/:id", async (req,res) => {
	const ueer = await User.findById(req.params.id);
	if(user) {
		await user.remove();
		res.send("user has been removed successfully.");
	}
})*/

//@route	GET api/users
//@desc		Register new user
//@access	Public
router.post("/", async (req, res) => {
	const { name, email, password } = req.body;
	//simple checks
	if(!name || !email || !password) {
		return res.status(400).json({msg: "please fill all fields."});
	}
	if(await User.findOne({email})) {
		return res.status(400).json({msg:"this email is already used!"});
	}
	const newUser = new User({
		name,
		email,
		password
	});
	bcrypt.genSalt(10, async (err, salt) => {
	    bcrypt.hash(newUser.password, salt, async (err, hash) => {
			if(err) throw err;
			newUser.password = hash;
			await newUser.save();
			jwt.sign(
				{id:newUser._id},
				process.env.JWT_SECRET,
				{expiresIn: 3600},
				(err, token) => {
					if(err) throw err;
					res.json({
						token,
						user: {
							id:newUser._id,
							name:newUser.name,
							email:newUser.email
						}
					});
				}
			)
		})
	});
});

module.exports = router;