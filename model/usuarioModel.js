const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
	{
		nombre: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
		},
		apellido: {
			type: String,
			required: [true, 'El apellido es obligatorio'],
			maxlength: [50, 'El apellido no puede exceder los 50 caracteres'],
		},
		email: {
			type: String,
			required: [true, 'El email es obligatorio'],
			unique: true,
			match: [/.+@.+\..+/, 'El email debe ser válido'],
		},
		telefono: {
			type: String,
			required: [true, 'El teléfono es obligatorio'],
			match: [/^\d{10}$/, 'El teléfono debe tener 10 dígitos'],
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
			minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
		},
		rol: {
			type: String,
			enum: {
				values: ['admin', 'usuario'],
				message: '{VALUE} no es un rol válido',
			},
			default: 'usuario',
		},
	},
	{ timestamps: true }
);

module.exports = model('Usuarios', UsuarioSchema);
