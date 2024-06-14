const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		telefono: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		rol: {
			type: String,
			enum: ['admin', 'usuario'],
			default: 'usuario',
		},
	},
	{ timestamps: true }
);

module.exports = model('Usuarios', UsuarioSchema);
