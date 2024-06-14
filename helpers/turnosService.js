const Turnos = require('../model/turnoModel');
const { parseISO, format, getDay, getHours } = require('date-fns');

// Horarios laborales
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
	// Convertir fecha y hora a objeto Date
	const turnoFechaHora = parseISO(`${fecha}T${hora}`);

	// Validar que la fecha sea de lunes a viernes (0: Domingo, 1: Lunes, ..., 6: Sábado)
	const diaSemana = getDay(turnoFechaHora);
	if (diaSemana === 0 || diaSemana === 6) {
		return { error: 'El turno debe ser de lunes a viernes.' };
	}

	// Validar que la hora esté dentro del horario laboral
	const horaTurno = getHours(turnoFechaHora);
	if (horaTurno < horarioApertura || horaTurno >= horarioFinalizado) {
		return {
			error: 'El turno debe estar dentro del horario laboral (8:00 a 16:00).',
		};
	}

	// Validar que no haya superposición de turnos
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

	// Crear y guardar el nuevo turno
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
};

module.exports = { crearTurno };
