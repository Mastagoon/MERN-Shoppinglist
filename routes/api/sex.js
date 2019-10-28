const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

router.get("/", async (req,res) => {
	const test = await User.findOne({username: "username"}, (err, res) => {
		if(err) throw err;
		return res;
	})
	/*if(test) {
		return res.json({user: test});
	}*/	
});

module.exports = router;