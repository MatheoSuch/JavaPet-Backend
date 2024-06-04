const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use('/auth', require('./router/authRouter'));

app.use('/admin', require('./router/adminRouter'));

dbConnection();
// app.use("/admin", require("./router/authRouter"));

// app.get('/informacion', (req, res) => {
// 	res.send('Petición Get exitosa');
// });

// app.put('/editarProducto', (req, res) => {
// 	res.send('Petición Put exitosa');
// });

// app.post('/crearUsuario', (req, res) => {
// 	const { nombre, precio, descripcion } = req.body;

// 	if (nombre === '' || !precio || !descripcion);
// 	{
// 		return res.send('Todos los campos son obligatorios');
// 	}
// 	res.send('Producto registrado correctamente');
// const usuario = false;
// if (usuario) {
// 	res.send('Error, el usuario ya se encuentra registrado');
// } else {
// 	res.send('El usuario se registro coreectamente');
// }
// });

// app.delete('/eliminar', (req, res) => {
// 	res.send('Usuario Eliminado');
// });

app.listen(process.env.PORT, () => {
	console.log(`Escuchando puerto ${process.env.PORT}`);
});
