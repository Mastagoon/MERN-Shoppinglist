const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 5,
		max: 20
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 20
	},
	email: {
		type: String,
		required: true,
		min: 5,
		max: 20,
		unique: true
	},
	registerDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = user = mongoose.model("user", userSchema);