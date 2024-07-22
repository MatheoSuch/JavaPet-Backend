const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);
		console.info('Base de datos conectada exitosamente');
	} catch (error) {
		console.error('Error al conectar con la base de datos:', error.message);
	}
};

module.exports = dbConnection;
