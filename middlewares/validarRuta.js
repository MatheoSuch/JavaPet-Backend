const validarRol = (roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.payload.rol)) {
			return res.status(403).json({ msg: 'Acceso no autorizado' });
		}
		next();
	};
};

module.exports = validarRol;
