const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createIndexes } = require('./models/usermodel');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", require("./routes/userroute"))
app.use("/api/order", require("./routes/orderroute"))
app.use("/api/admin",require("./routes/adminroute"))
app.use("/api/gc",require("./routes/gcroute"))
app.get("*", (req, res) => {
    return res.status(404).send("Page Not Found")
})

module.exports = app

