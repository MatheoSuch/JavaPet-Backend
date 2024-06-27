const { crearTurno } = require('../helpers/turnosService');
const Usuarios = require('../model/usuarioModel');
const Turnos = require('../model/turnoModel');

const listaPacientes = async (req, res) => {
	try {
		// Excluye los campos "__v" y "password"
		const pacientes = await Usuarios.find().select('-__v -password');
		res.status(200).json({
			listaPacientes: pacientes,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al obtener la lista de pacientes',
			error: error.message,
		});
	}
};

const crearPaciente = async (req, res) => {
	const { nombre, apellido, email, telefono } = req.body;

	try {
		if (!nombre || !apellido || !email || !telefono) {
			return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
		}
		// Verificar si el correo electrónico tiene un formato válido
		if (!isValidEmail(Usuarios.email)) {
			return res.status(400).json({ msg: 'El correo electrónico no es válido' });
		}
		// Verificar si ya existe un paciente con el mismo email
		let pacienteExistente = await Usuarios.findOne({ email: email });
		if (pacienteExistente) {
			return res
				.status(400)
				.json({ msg: 'El correo electrónico ya está registrado' });
		}
		// Crear un nuevo paciente con los datos proporcionados
		const nuevoPaciente = new Usuarios({
			nombre,
			apellido,
			email,
			telefono,
		});
		// Encriptar la contraseña del paciente
		// if (password) {
		// 	const salt = bcrypt.genSaltSync(10);
		// 	dueno.password = bcrypt.hashSync(dueno.password, salt);
		// }
		// Guardar el nuevo paciente en la base de datos
		await nuevoPaciente.save();
		res.status(201).json({
			msg: 'Paciente creado exitosamente',
			paciente: nuevoPaciente,
		});
	} catch (error) {
		console.error('Error al crear paciente:', error);
		res.status(500).json({ msg: 'Error interno del servidor' });
	}
};

const editarPaciente = async (req, res) => {
	try {
		const editarPaciente = await Usuarios.findById(req.body._id);
		if (!editarPaciente) {
			return res.status(400).json({
				msg: 'No existe ningún paciente con ese id',
			});
		}
		await Usuarios.findByIdAndUpdate(req.body._id, req.body);
		res.status(200).json({
			msg: 'Paciente editado correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Contactese con un administrador',
		});
	}
};

const eliminarPaciente = async (req, res) => {
	try {
		const eliminarPaciente = await Usuarios.findById(req.params.id);
		if (!eliminarPaciente) {
			return res.status(400).json({
				msg: 'No existe ningún paciente con ese id',
			});
		}
		await Usuarios.findByIdAndDelete(req.params.id);
		res.status(200).json({
			msg: 'Paciente eliminado correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Contactese con un administrador',
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
	const { detalleCita, veterinario, mascota, especie, raza, fecha, hora } = req.body;

	// Log de los datos recibidos
	console.log('Datos recibidos:', req.body);

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
			console.log('Error: Todos los campos son obligatorios');
			return res.status(400).json({
				msg: 'Todos los campos son obligatorios',
			});
		}
		if (!detalleCita || detalleCita.length < 10 || detalleCita.length > 200) {
			console.log('Error: Detalle de la cita incorrecto');
			return res.status(400).json({
				msg: 'El detalle de la cita debe tener entre 10 y 200 caracteres',
			});
		}

		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinario || !veterinariosDefinidos.includes(veterinario)) {
			console.log('Error: Veterinario no disponible');
			return res.status(400).json({
				msg: 'Debe seleccionar uno de los veterinarios disponibles',
			});
		}

		if (!mascota || mascota.length < 2 || mascota.length > 30) {
			console.log('Error: Nombre de la mascota incorrecto');
			return res.status(400).json({
				msg: 'El nombre de la mascota debe tener entre 2 y 30 caracteres',
			});
		} else if (!especie || especie.length < 2 || especie.length > 30) {
			console.log('Error: Especie de la mascota incorrecta');
			return res.status(400).json({
				msg: 'La especie de la mascota debe tener entre 2 y 30 caracteres',
			});
		} else if (!raza || raza.length < 2 || raza.length > 30) {
			console.log('Error: Raza de la mascota incorrecta');
			return res.status(400).json({
				msg: 'La raza de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		const resultado = await crearTurno(
			detalleCita,
			veterinario,
			mascota,
			especie,
			raza,
			fecha,
			hora
		);

		if (resultado.error) {
			console.log('Error al crear turno:', resultado.error);
			return res.status(400).json({
				msg: resultado.error,
			});
		}

		console.log('Turno creado exitosamente');
		res.status(201).json({
			msg: 'Turno creado',
			turno: resultado.turno,
		});
	} catch (error) {
		console.log('Error en el servidor:', error);
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
			return res.status(404).json({
				msg: 'No existe ningún turno con ese id',
			});
		}

		// Aquí se actualiza el turno con los datos recibidos en req.body
		await Turnos.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			msg: 'Turno editado correctamente',
		});
	} catch (error) {
		console.error('Error al editar turno:', error);
		res.status(500).json({
			msg: 'Error en el servidor al intentar editar el turno. Por favor, contacte con un administrador',
		});
	}
};

module.exports = {
	listaPacientes,
	crearPaciente,
	editarPaciente,
	eliminarPaciente,
	crearTurnos,
	listaTurnos,
	eliminarTurno,
	editarTurno,
};
