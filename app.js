const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', require('./router/authRouter'));

app.use('/admin', require('./router/adminRouter'));

dbConnection();

app.listen(process.env.PORT, () => {
	console.info(`Escuchando puerto ${process.env.PORT}`);
});
