// tremos boom
const boom = require('@hapi/boom');

function validation() {
  return false;
}

//  es un middleware, de validacionde datos
// para integrarlo con "join y boom"
function validationHandlers(schema, check = 'body') {
  return function (req, res, next) {
    const error = validation(req[check], schema);

    // error ? next(new Error(error)) : next();
    // como usamos boom cambiamos lo de arriva por lo de avajo:
    error ? next(boom.badRequest(error)) : next();

  };
}

module.exports = validationHandlers;
