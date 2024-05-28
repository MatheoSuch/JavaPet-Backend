const bcrypt = require('bcrypt');
const usuarioModel = require('../model/usuarioModel');
const Usuario = require('../model/usuarioModel');

const crearUsuario = async (req, res) => {
	const { name, email, password, edad } = req.body;

	if (!name || !email || !password || !edad) {
		return res.status(400).json({
			msg: 'Todos los campos son obligatorios',
		});
		// regex
	}
	try {
		// analizar correo
		let usuario = await usuarioModel.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				msg: 'El correo ya existe',
			});
		}
		// caso que no exista correo
		usuario = new Usuario(req.body);
		// Encriptar contraseña antes de guardarlo en base de datos
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);
		// guardamos datos en base de datos
		await usuario.save();
		res.status(201).json({
			msg: 'Usuario registado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactese con un administrador',
		});
	}
};

const loginUsuario = (req, res) => {
	res.json({
		modal: 'error',
		msg: 'Correo existente',
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
};
