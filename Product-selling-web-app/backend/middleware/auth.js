const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token) {
        return res.status(httpStatus.UNAUTHORIZED).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send('Invalid Token');
      }
      return next();
}