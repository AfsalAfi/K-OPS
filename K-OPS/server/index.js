require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routers/user');
const adminRoutes = require('./routers/admin/adminControl');
const bodyParser = require('body-parser');
const { connect } = require('./config/connection')
const { PORT } = require('./config/db-config');

// database connect
connect()


//middlewares


app.use(express.json());
// app.use(cors());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);


const port = PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`))