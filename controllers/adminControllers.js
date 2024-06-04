const Turnos = require('../model/turnoModel');
const Usuarios = require('../model/usuarioModel');

const listaPacientes = async (req, res) => {
	try {
		// Excluye los campos "__v" y "password"
		const listaPacientes = await Usuarios.find().select('-__v -password');
		res.status(200).json({
			listaPacientes,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al obtener la lista de pacientes',
			error,
		});
	}
};

const listaTurnos = async (req, res) => {
	try {
		// Excluye los campos "__v" y "password"
		const listaTurnos = await Turnos.find().select('-__v -password');
		res.status(200).json({
			listaTurnos,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al obtener la lista de turnos',
			error,
		});
	}
};

const crearTurnos = async (req, res) => {
	const { nombre, edad } = req.body;

	try {
		if (!nombre || !edad) {
			return res.status(400).json({
				msg: 'Todos los campos son obligatorios',
			});
			// regex
		}
		// validar si ya existe el turno, no se sobreregistre (fall)

		const turnos = new Turnos(req.body);
		await turnos.save();

		res.status(201).json({
			msg: 'turno creado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Contactese con un administrador',
		});
	}
};

const eliminarTurno = async (req, res) => {
	try {
		const turnoEliminar = await Turnos.findById(req.params.id);
		if (!turnoEliminar) {
			return res.status(400).json({
				msg: 'No existe ningun produto con ese id',
			});
		}
		await Turnos.findByIdAndDelete(req.params.id);
		res.status(200).json({
			msg: 'Turno eliminado correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Contactese con un administrador',
		});
	}
};

const editarTurno = async (req, res) => {
	try {
		const turnoEditar = await Turnos.findById(req.body._id);
		if (!turnoEditar) {
			return res.status(400).json({
				msg: 'No existe ningun produto con ese id',
			});
		}
		await Turnos.findByIdAndUpdate(req.body._id, req.body);
		res.status(200).json({
			msg: 'Turno editado correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Contactese con un administrador',
		});
	}
};

module.exports = {
	listaPacientes,
	crearTurnos,
	listaTurnos,
	eliminarTurno,
	editarTurno,
};
