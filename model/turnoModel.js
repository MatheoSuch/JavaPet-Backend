const { Schema, model } = require('mongoose');

const TurnosSchema = Schema(
	{
		detalleCita: {
			type: String,
			required: [true, 'El detalle de la cita es obligatorio'],
			maxlength: [500, 'El detalle de la cita no puede exceder los 500 caracteres'],
		},
		veterinario: {
			type: String,
			required: [true, 'El veterinario es obligatorio'],
			enum: {
				values: ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'],
				message: '{VALUE} no es un veterinario válido',
			},
		},
		mascota: {
			type: String,
			required: [true, 'El nombre de la mascota es obligatorio'],
			maxlength: [
				100,
				'El nombre de la mascota no puede exceder los 100 caracteres',
			],
		},
		especie: {
			type: String,
			required: [true, 'La especie es obligatoria'],
			maxlength: [50, 'La especie no puede exceder los 50 caracteres'],
		},
		raza: {
			type: String,
			required: [true, 'La raza es obligatoria'],
			maxlength: [50, 'La raza no puede exceder los 50 caracteres'],
		},
		fecha: {
			type: Date,
			required: [true, 'La fecha es obligatoria'],
			validate: {
				validator: function (v) {
					return v > new Date();
				},
				message: 'La fecha debe ser una fecha futura',
			},
		},
		hora: {
			type: String,
			required: [true, 'La hora es obligatoria'],
			validate: {
				validator: function (v) {
					return /([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(v);
				},
				message: (props) => `${props.value} no es una hora válida!`,
			},
		},
	},
	{ timestamps: true }
);

module.exports = model('Turnos', TurnosSchema);
