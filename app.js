const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
const corsOptions = {
	origin: 'https://javapets.netlify.app',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

app.use(cors(corsOptions));

dbConnection()
	.then(() => {
		app.use('/auth', require('./router/authRouter'));
		app.use('/admin', require('./router/adminRouter'));

		app.use((err, req, res, next) => {
			console.error(err.stack);
			res.status(500).send('Algo salió mal!');
		});

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.info(`Escuchando puerto ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error al conectar a la base de datos:', error);
	});
