const { Schema, model } = require('mongoose');

const TurnosSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	edad: {
		type: Number,
		require: true,
	},
	direccion: {
		type: String,
	},
	fecha: {
		type: Date,
	},
	rol: {
		type: String,
		default: 'usuario',
	},
});

module.exports = model('Turnos', TurnosSchema);
