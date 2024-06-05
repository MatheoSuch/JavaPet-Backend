const express = require('express');
const {
	listaPacientes,
	crearTurnos,
	eliminarTurno,
	listaTurnos,
	editarTurno,
} = require('../controllers/adminControllers');
const validarJWT = require('../middlewares/validarJWT');
const routerAdmin = express.Router();

routerAdmin.post('/crearTurnos', validarJWT, crearTurnos);

routerAdmin.get('/listaTurnos', validarJWT, listaTurnos);

routerAdmin.put('/editarTurno', validarJWT, editarTurno);

routerAdmin.delete('/eliminarTurno/:id', validarJWT, eliminarTurno);

// routerAdmin.post('/crearPaciente',validarJWT, crearPaciente);

routerAdmin.get('/listaPacientes', validarJWT, listaPacientes);

// routerAdmin.put('/editarPaciente',validarJWT, editarPaciente);

// routerAdmin.delete('/eliminarPaciente',validarJWT, eliminarPaciente);

module.exports = routerAdmin;
