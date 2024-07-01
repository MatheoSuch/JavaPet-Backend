const { crearTurno } = require('../helpers/turnosService');
const Usuarios = require('../model/usuarioModel');
const Turnos = require('../model/turnoModel');
const isValidEmail = require('../middlewares/validarEmial');
const bcrypt = require('bcrypt');

const listaPacientes = async (req, res) => {
	try {
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
	const { nombre, apellido, email, telefono, password } = req.body;

	try {
		if (!nombre || !apellido || !email || !telefono || !password) {
			return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
		}
		if (!isValidEmail(email)) {
			return res.status(400).json({ msg: 'El correo electrónico no es válido' });
		}
		let pacienteExistente = await Usuarios.findOne({ email: email });
		if (pacienteExistente) {
			return res
				.status(400)
				.json({ msg: 'El correo electrónico ya está registrado' });
		}
		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const nuevoPaciente = new Usuarios({
			nombre,
			apellido,
			email,
			telefono,
			password: hashedPassword,
		});

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
		const { nombre, apellido, email, telefono, password, rol } = req.body;
		const { id } = req.params;

		console.log('ID del paciente recibido:', id);
		console.log('Datos recibidos para editar paciente:', req.body);

		const pacienteExistente = await Usuarios.findById(id);
		if (!pacienteExistente) {
			return res.status(404).json({
				msg: 'No existe ningún paciente con ese id',
			});
		}

		const emailExistente = await Usuarios.findOne({ email });
		if (emailExistente && emailExistente._id.toString() !== id) {
			return res.status(400).json({
				msg: 'El correo electrónico ya está en uso por otro paciente',
			});
		}
		pacienteExistente.nombre = nombre;
		pacienteExistente.apellido = apellido;
		pacienteExistente.email = email;
		pacienteExistente.telefono = telefono;
		pacienteExistente.rol = rol;

		if (password) {
			const salt = await bcrypt.genSalt(10);
			pacienteExistente.password = await bcrypt.hash(password, salt);
		}

		const pacienteActualizado = await pacienteExistente.save();
		res.status(200).json({
			msg: 'Paciente editado correctamente',
			paciente: pacienteActualizado,
		});
	} catch (error) {
		console.error('Error al editar paciente:', error);
		let errorMsg =
			'Error en el servidor al intentar editar el paciente. Por favor, contacte con un administrador';
		if (error.message.includes('bcrypt')) {
			errorMsg = 'Error al encriptar la contraseña';
		}
		res.status(500).json({
			msg: errorMsg,
			error: error.message,
		});
	}
};

const eliminarPaciente = async (req, res) => {
	try {
		const paciente = await Usuarios.findById(req.params.id);

		if (!paciente) {
			return res.status(404).json({
				msg: 'No existe ningún paciente con ese id',
			});
		}

		await Usuarios.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'Paciente eliminado correctamente',
		});
	} catch (error) {
		console.error('Error al eliminar paciente:', error);
		res.status(500).json({
			msg: 'Error interno del servidor al intentar eliminar el paciente',
			error: error.message,
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

		if (detalleCita.length < 10 || detalleCita.length > 200) {
			console.log('Error: Detalle de la cita incorrecto');
			return res.status(400).json({
				msg: 'El detalle de la cita debe tener entre 10 y 200 caracteres',
			});
		}

		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinariosDefinidos.includes(veterinario)) {
			console.log('Error: Veterinario no disponible');
			return res.status(400).json({
				msg: 'Debe seleccionar uno de los veterinarios disponibles',
			});
		}

		if (mascota.length < 2 || mascota.length > 30) {
			console.log('Error: Nombre de la mascota incorrecto');
			return res.status(400).json({
				msg: 'El nombre de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		if (especie.length < 2 || especie.length > 30) {
			console.log('Error: Especie de la mascota incorrecta');
			return res.status(400).json({
				msg: 'La especie de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		if (raza.length < 2 || raza.length > 30) {
			console.log('Error: Raza de la mascota incorrecta');
			return res.status(400).json({
				msg: 'La raza de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		// Parsear la fecha y hora correctamente
		const turnoFechaHora = new Date(`${fecha}T${hora}`);

		// Validar la fecha y hora
		if (isNaN(turnoFechaHora.getTime())) {
			console.log('Error: Fecha y/o hora inválidas');
			return res.status(400).json({
				msg: 'La fecha y/o hora son inválidas',
			});
		}

		// Buscar un turno existente con el mismo veterinario, fecha y hora

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
			turno: {},
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
		console.log('ID del turno recibido:', req.params.id);
		console.log('Datos recibidos para editar:', req.body);

		const turnoEditar = await Turnos.findById(req.params.id);
		if (!turnoEditar) {
			return res.status(404).json({
				msg: 'No existe ningún turno con ese id',
			});
		}

		await Turnos.findByIdAndUpdate(req.params.id, req.body);

		res.status(200).json({
			msg: 'Turno editado correctamente',
		});
	} catch (error) {
		console.error('Error al editar turno:', error);
		res.status(500).json({
			msg: 'Error en el servidor al intentar editar el turno. Por favor, contacte con un administrador',
			error: error.message,
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
