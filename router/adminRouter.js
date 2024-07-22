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
const validarRuta = require('../middlewares/validarRuta');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const routerAdmin = express.Router();

routerAdmin.get(
	'/listaPacientes',
	validarJWT,
	validarRuta(['admin']),
	listaPacientes
);

routerAdmin.post(
	'/crearPaciente',
	[
		validarJWT,
		validarRuta(['admin']),
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('apellido', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
		check('telefono', 'El teléfono debe tener 10 dígitos').isLength({
			min: 10,
			max: 10,
		}),
		validarCampos,
	],
	crearPaciente
);

routerAdmin.put(
	'/editarPaciente/:id',
	validarJWT,
	validarRuta(['admin']),
	[
		check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
		check('apellido', 'El apellido es obligatorio').optional().not().isEmpty(),
		check('email', 'El email debe ser válido').optional().isEmail(),
		check('telefono', 'El teléfono debe tener 10 dígitos')
			.optional()
			.isLength({ min: 10, max: 10 }),
		validarCampos,
	],
	editarPaciente
);

routerAdmin.delete(
	'/eliminarPaciente/:id',
	validarJWT,
	validarRuta(['admin']),
	eliminarPaciente
);

routerAdmin.get('/listaTurnos', validarJWT, validarRuta(['admin']), listaTurnos);

routerAdmin.post(
	'/crearTurnos',
	[
		validarJWT,
		validarRuta(['admin']),
		check('detalleCita', 'El detalle de la cita es obligatorio').not().isEmpty(),
		check('veterinario', 'El veterinario es obligatorio')
			.not()
			.isEmpty()
			.isIn(['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila']),
		check('mascota', 'La mascota es obligatoria').not().isEmpty(),
		check('especie', 'La especie es obligatoria').not().isEmpty(),
		check('raza', 'La raza es obligatoria').not().isEmpty(),
		check('fecha', 'La fecha es obligatoria').not().isEmpty().isISO8601(),
		check('hora', 'La hora debe tener un formato válido').matches(
			/([01]?[0-9]|2[0-3]):[0-5][0-9]/
		),
		validarCampos,
	],
	crearTurnos
);

routerAdmin.put(
	'/editarTurno/:id',
	validarJWT,
	validarRuta(['admin']),
	[
		check('detalleCita', 'El detalle de la cita es obligatorio')
			.optional()
			.not()
			.isEmpty(),
		check('veterinario', 'El veterinario es obligatorio')
			.optional()
			.not()
			.isEmpty()
			.isIn(['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila']),
		check('mascota', 'La mascota es obligatoria').optional().not().isEmpty(),
		check('especie', 'La especie es obligatoria').optional().not().isEmpty(),
		check('raza', 'La raza es obligatoria').optional().not().isEmpty(),
		check('fecha', 'La fecha es obligatoria').optional().not().isEmpty().isISO8601(),
		check('hora', 'La hora debe tener un formato válido')
			.optional()
			.matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/),
		validarCampos,
	],
	editarTurno
);

routerAdmin.delete(
	'/eliminarTurno/:id',
	validarJWT,
	validarRuta(['admin']),
	eliminarTurno
);

module.exports = routerAdmin;
