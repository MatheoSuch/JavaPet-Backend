const express = require('express');
const { registro, login } = require('../controllers/authControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const routerAuth = express.Router();

routerAuth.post(
	'/registro',
	[
		[
			check('email', 'No es un Email valido').not().isEmpty().isEmail(),
			validarCampos,
		],
	],
	registro
);

routerAuth.post('/login', login);

module.exports = routerAuth;
