require('dotenv').config();

const express = require('express');
const router = require('./routes/people');

const sequelize = require('./database/index');

const app = express();
app.use(express.json());

app.use('/people', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
