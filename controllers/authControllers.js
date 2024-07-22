const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');
const isValidEmail = require('../middlewares/validarEmail');

const registro = async (req, res) => {
	const { nombre, apellido, email, telefono, password, confirmPassword } = req.body;

	if (!nombre || !email || !password || !apellido || !telefono || !confirmPassword) {
		return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ msg: 'El email no es válido' });
	}

	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(telefono)) {
		return res.status(400).json({ msg: 'El teléfono debe tener 10 dígitos' });
	}

	if (password.length < 5) {
		return res.status(400).json({
			msg: 'La contraseña debe tener más de 5 caracteres',
		});
	}

	if (password !== confirmPassword) {
		return res.status(400).json({
			msg: 'Las contraseñas deben ser iguales',
		});
	}

	try {
		let usuario = await Usuario.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				msg: 'El correo ya existe',
			});
		}

		const nuevoUsuario = new Usuario({
			nombre,
			apellido,
			email,
			telefono,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
		});

		await nuevoUsuario.save();
		res.status(201).json({
			msg: 'Usuario registrado exitosamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactese con un administrador',
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
	}
	if (!isValidEmail(email)) {
		return res.status(400).json({ msg: 'El correo electrónico no es válido' });
	}

	try {
		const usuario = await Usuario.findOne({ email: email });
		if (!usuario) {
			return res
				.status(400)
				.json({ msg: 'Correo electrónico o contraseña incorrectos' });
		}

		const validarPassword = await bcrypt.compare(password, usuario.password);
		if (!validarPassword) {
			return res
				.status(400)
				.json({ msg: 'Correo electrónico o contraseña incorrectos' });
		}

		const payload = {
			id: usuario._id,
			name: usuario.nombre,
			apellido: usuario.apellido,
			rol: usuario.rol,
		};
		const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1h' });

		return res.status(200).json({
			msg: 'Usuario Logueado',
			type: 'success',
			token,
			rol: usuario.rol,
		});
	} catch (error) {
		res.status(500).json({ msg: 'Error interno del servidor' });
	}
};

module.exports = {
	registro,
	login,
};
