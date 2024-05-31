require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes/people');

const sequelize = require('./database/index');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
