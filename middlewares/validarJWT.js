var jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No exister un token',
		});
	}
	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT);
	} catch (error) {
		return res.status(401).json({
			msg: 'Token no valido',
		});
	}
	next();
};

module.exports = validarJWT;
