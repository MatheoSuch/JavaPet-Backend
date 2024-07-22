const Turnos = require('../model/turnoModel');
const { parseISO, format, getDay, getHours } = require('date-fns');

const horarioApertura = 8;
const horarioFinalizado = 16;

const crearTurno = async (
	detalleCita,
	veterinario,
	mascota,
	especie,
	raza,
	fecha,
	hora
) => {
	try {
		if (
			!detalleCita ||
			!veterinario ||
			!mascota ||
			!especie ||
			!raza ||
			!fecha ||
			!hora
		) {
			return { error: 'Todos los campos son obligatorios.' };
		}

		if (detalleCita.length < 10 || detalleCita.length > 200) {
			return {
				error: 'El detalle de la cita debe tener entre 10 y 200 caracteres.',
			};
		}

		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinariosDefinidos.includes(veterinario)) {
			return { error: 'Debe seleccionar uno de los veterinarios disponibles.' };
		}

		if (mascota.length < 2 || mascota.length > 30) {
			return {
				error: 'El nombre de la mascota debe tener entre 2 y 30 caracteres.',
			};
		}

		if (especie.length < 2 || especie.length > 30) {
			return {
				error: 'La especie de la mascota debe tener entre 2 y 30 caracteres.',
			};
		}

		if (raza.length < 2 || raza.length > 30) {
			return { error: 'La raza de la mascota debe tener entre 2 y 30 caracteres.' };
		}

		const turnoFechaHora = parseISO(`${fecha}T${hora}`);

		const diaSemana = getDay(turnoFechaHora);
		if (diaSemana === 0 || diaSemana === 6) {
			return { error: 'El turno debe ser de lunes a viernes.' };
		}

		const horaTurno = getHours(turnoFechaHora);
		if (horaTurno < horarioApertura || horaTurno >= horarioFinalizado) {
			return {
				error: 'El turno debe estar dentro del horario laboral (8:00 a 16:00).',
			};
		}

		const turnoExistente = await Turnos.findOne({
			veterinario: veterinario,
			fecha: format(turnoFechaHora, 'yyyy-MM-dd'),
			hora: format(turnoFechaHora, 'HH:mm'),
		});
		if (turnoExistente) {
			return {
				error: 'Ya existe un turno asignado para el veterinario en ese horario.',
			};
		}

		const nuevoTurno = new Turnos({
			detalleCita,
			veterinario,
			mascota,
			especie,
			raza,
			fecha: format(turnoFechaHora, 'yyyy-MM-dd'),
			hora: format(turnoFechaHora, 'HH:mm'),
		});
		await nuevoTurno.save();

		return { turno: nuevoTurno };
	} catch (error) {
		throw error;
	}
};

module.exports = { crearTurno };
