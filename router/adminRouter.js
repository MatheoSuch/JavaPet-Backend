const express = require('express');
const { listaPacientes, crearTurnos } = require('../controllers/adminControllers');
const routerAdmin = express.Router();

routerAdmin.post('/crearTurnos', crearTurnos);

// routerAdmin.get('/listaTurnos', listaTurnos);

// routerAdmin.put('/editarTurno', editarTurno);

// routerAdmin.delete('/eliminarTurno', eliminarTurno);

// routerAdmin.post('/crearPaciente', crearPaciente);

routerAdmin.get('/listaPacientes', listaPacientes);

// routerAdmin.put('/editarPaciente', editarPaciente);

// routerAdmin.delete('/eliminarPaciente', eliminarPaciente);

module.exports = routerAdmin;
