// nos traemos nuestro archivo de configuracion, el erros nos traiga el stac(informacion)
const { config } = require('../../config/index');

// esto no es un middleware.
function withErrorStack(err, stack) {
  // si estamos en desarrollo
  if (config.dev) {
    return { err, stack };
  }
  return err;
}

// va a hacer un console.log del error
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

// para manegar los errores,
function errorHandler(err, req, res, next) { //eslint-disable-line
  // express imprmi los errores en formato html , lo cambiamos a.json
  // como bamos a usar una pia en .json,
  res.status(err.status || 500); //es un rroro por defecto del servidos

  res.json(withErrorStack(err.message, err.stack));
}

// exportamos los modulos
module.exports = {
  logErrors,
  errorHandler
}