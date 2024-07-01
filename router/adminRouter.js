const express = require('express');
const {
	crearTurnos,
	eliminarTurno,
	listaTurnos,
	editarTurno,
	crearPaciente,
	listaPacientes,
	editarPaciente,
	eliminarPaciente,
} = require('../controllers/adminControllers');
const validarJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const routerAdmin = express.Router();

routerAdmin.get('/listaPacientes', validarJWT, listaPacientes);

routerAdmin.post(
	'/crearPaciente',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		check('apellido', 'por favor ingrese un valor').not().isEmpty(),
		check('email', 'por favor ingrese su email').not().isEmpty(),
		check('telefono', 'el teléfono no es valido').isLength({
			min: 10,
			max: 10,
		}),
		validarCampos,
	],
	crearPaciente
);

routerAdmin.put('/editarPaciente/:id', validarJWT, editarPaciente);

routerAdmin.delete('/eliminarPaciente/:id', validarJWT, eliminarPaciente);

routerAdmin.get('/listaTurnos', validarJWT, listaTurnos);

routerAdmin.post('/crearTurnos', validarJWT, crearTurnos);

routerAdmin.put('/editarTurno/:id', validarJWT, editarTurno);

routerAdmin.delete('/eliminarTurno/:id', validarJWT, eliminarTurno);

module.exports = routerAdmin;
