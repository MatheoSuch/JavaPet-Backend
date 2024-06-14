const express = require('express');
const {
	crearTurnos,
	eliminarTurno,
	listaTurnos,
	editarTurno,
	listaUsuarios,
} = require('../controllers/adminControllers');
const validarJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const routerAdmin = express.Router();

routerAdmin.get('/listaUsuarios', validarJWT, listaUsuarios);

routerAdmin.post('/crearTurnos', validarJWT, crearTurnos);

routerAdmin.get('/listaTurnos', validarJWT, listaTurnos);

routerAdmin.put('/editarTurno', validarJWT, editarTurno);

routerAdmin.delete('/eliminarTurno/:id', validarJWT, eliminarTurno);

// routerAdmin.post(
// 	'/crearPaciente',
// 	[
// 		validarJWT,
// 		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
// 		check('apellido', 'por favor ingrese un valor').not().isEmpty(),
// 		check('email', 'por favor ingrese su email').not().isEmpty(),
// 		check('telefono', 'el telegono no es valido').isLength({
// 			min: 10,
// 			max: 10,
// 		}),
// 		validarCampos,
// 	],
// 	crearPaciente
// );

// routerAdmin.put('/editarPaciente',validarJWT, editarPaciente);

// routerAdmin.delete('/eliminarPaciente',validarJWT, eliminarPaciente);

module.exports = routerAdmin;
