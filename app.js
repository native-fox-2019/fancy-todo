require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./routes");
const { handler } = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(handler);

app.listen(PORT, () => console.log("Listening On Port :", PORT));
