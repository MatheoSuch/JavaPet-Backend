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

module.exports = { listaPacientes, crearTurnos };
