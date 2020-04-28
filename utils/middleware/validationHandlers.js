function validation() {
  return false;
}

//  es un middleware, de validacionde datos
// para integrarlo con "joinbund"
function validationHandlers(schema, check = 'body') {
  return function (req, res, next) {
    const error = validation(req[check], schema);

    error ? next(new Error(error)) : next();
  };
}

module.exports = validationHandlers;
