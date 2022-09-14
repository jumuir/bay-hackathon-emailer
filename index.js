const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();
const { PORT } = process.env || 8081;

app.use(cors());
app.use(express.json());
app.use('/email', require('./routes/email'));


app.listen(PORT, ()=> console.log(`Running with scissors on port ${PORT}`));