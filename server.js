const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
require("dotenv/config");
const app = express();

//middlewares
app.use(express.json());
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

mongoose.connect(process.env.DB_CONNECTION
	,{ useNewUrlParser: true,
		useUnifiedTopology: true },
	 () => console.log("Mongodb Connected."));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));