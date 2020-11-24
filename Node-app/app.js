const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database/dbs');
require('dotenv').config();
var bodyParser = require('body-parser');
// DataBase Connection
connectDB();
// Port

const PORT = process.env.PORT || 2000;
// parse application/json
app.use(bodyParser.json());
app.use(cors());
// Router
app.use('/api/list', require('./api/route/list'));
app.use('/api/card', require('./api/route/card'));

app.listen(PORT, () => console.log(`Server is Running ---> ${PORT}`));
