const createHttpError = require('http-errors');

module.exports = (schema) => (req, res, next) => {
  try {
    const { error } = schema.body.validate(req.body);
    if (error) {
      next(createHttpError(422, { message: error.message }));
    } else {
      next();
    }
  } catch (err) {
    if (err.isJoi) return next(createHttpError(422, { message: err.message }));
    next(createHttpError(500));
  }
};
