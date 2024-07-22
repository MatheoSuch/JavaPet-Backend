const express = require('express');
const { registro, login } = require('../controllers/authControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const routerAuth = express.Router();

routerAuth.post(
	'/registro',
	[
		check('email', 'No es un Email válido').not().isEmpty().isEmail(),
		check('password', 'La contraseña es obligatoria')
			.not()
			.isEmpty()
			.isLength({ min: 5 }),
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	registro
);

routerAuth.post(
	'/login',
	[
		check('email', 'No es un Email válido').isEmail(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		validarCampos,
	],
	login
);

module.exports = routerAuth;
