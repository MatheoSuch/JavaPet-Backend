const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');

const registro = async (req, res) => {
	const { nombre, apellido, email, telefono, password, confirmPassword } = req.body;

	if (!nombre || !email || !password || !apellido || !telefono || !confirmPassword) {
		return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
	} else if (password < 5) {
		return res.status(400).json({
			msg: ' la contraseña debe ser mayor a 5 caracteres',
		});
	} else if (password !== confirmPassword) {
		return res.status(400).json({
			msg: 'Las contraseñas debe ser iguales',
		});
	}
	// regex

	try {
		// analizar correo
		let usuario = await Usuario.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				msg: 'El correo ya existe',
			});
		}
		// caso que no exista correo
		const nuevoUsuario = new Usuario(req.body);
		// Encriptar contraseña antes de guardarlo en base de datos
		const salt = bcrypt.genSaltSync(10);
		nuevoUsuario.password = bcrypt.hashSync(password, salt);
		// guardamos datos en base de datos
		await nuevoUsuario.save();
		res.status(201).json({
			msg: 'Usuario registrado exitosamente',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Por favor contactese con un administrador',
		});
	}
};
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Buscar al paciente por su email
		const usuario = await Usuario.findOne({ email: email });
		if (!usuario) {
			return res
				.status(400)
				.json({ msg: 'Correo electrónico o contraseña incorrectos' });
		}

		// Verificar la contraseña del paciente
		const validarPassword = await bcrypt.compare(password, usuario.password);
		if (!validarPassword) {
			return res
				.status(400)
				.json({ msg: 'Correo electrónico o contraseña incorrectos' });
		}

		// Generar un token de autenticación
		const payload = {
			id: usuario._id,
			name: usuario.nombre,
			apellido: usuario.apellido,
			rol: usuario.rol,
		};
		const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '2h' });

		return res.status(200).json({
			msg: 'Usuario Logueado',
			type: 'success',
			token,
		});
	} catch (error) {
		console.error('Error al autenticar paciente:', error);
		res.status(500).json({ msg: 'Error interno del servidor' });
	}
};

module.exports = {
	registro,
	login,
};
