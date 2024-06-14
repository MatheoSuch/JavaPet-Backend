const { Schema, model } = require('mongoose');

const TurnosSchema = Schema(
	{
		detalleCita: {
			type: String,
			required: true,
		},
		veterinario: {
			type: String,
			required: true,
			enum: ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'],
		},
		mascota: {
			type: String,
			required: true,
		},
		especie: {
			type: String,
			required: true,
		},
		raza: {
			type: String,
			required: true,
		},
		fecha: {
			type: Date,
			required: true,
		},
		hora: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(v);
				},
				message: (props) => `${props.value} no es una hora válida!`,
			},
		},
	},
	{ timestamps: true }
	// Registra horario y fecha de la creación
);

module.exports = model('Turnos', TurnosSchema);
