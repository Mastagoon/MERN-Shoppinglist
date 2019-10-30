const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
	
const Item = require("../../models/item");

//@route	GET api/items
//@desc		Get all items
//@access	Public
router.get("/", (req,res) => {
	Item.find()
		.sort({date:-1})
		.then(items => res.json(items));
});

//@route	POST api/items
//@desc		Create an item
//@access	Private
router.post("/", auth, (req,res) => {
	const newItem = new Item({
		name: req.body.name
	});
	newItem.save()
			.then(item => res.json(item));
});

//@route	DELETE api/items
//@desc		Delete an item
//@access	Private
router.delete(":id", auth, (req,res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.send("Item removed successfully.")));
});	

module.exports = router;