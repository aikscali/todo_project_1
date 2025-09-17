const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Intenta obtener el token de la cookie o del header Authorization
  const token = req.cookies?.token || (req.headers['authorization']?.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    req.user = user; // aquí tienes user.id, user.email, etc.
    next();
  });
}

module.exports = authMiddleware;
