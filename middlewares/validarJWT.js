var jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No existe un token',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT);
		req.payload = payload;
		next(); // Llama a next solo si todo está correcto
	} catch (error) {
		console.error('Error al verificar token:', error);
		return res.status(401).json({
			msg: 'La sesión expiró o el token es inválido',
			type: 'error',
		});
	}
};

module.exports = validarJWT;
