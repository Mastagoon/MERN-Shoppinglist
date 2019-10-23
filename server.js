const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
require("dotenv/config");
const app = express();

//middlewares
app.use(bodyParser.json());
app.use("/api/items", items);

mongoose.connect(process.env.DB_CONNECTION
	,{ useNewUrlParser: true },
	 () => console.log("Mongodb Connected."));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));