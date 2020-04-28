const express = require('express');

const app = express();

const { config } = require('./config/index');

const moviesApi = require('./routes/movies');

// --- middleware ---
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');
// --- middleware ---


// --- Body parser ---

// entender formatos .json
app.use(express.json());


// como es una funciona ponemos la app de expres.
moviesApi(app);

// --- middleware --- Error deven ir despues de las rutas
app.use(logErrors);
app.use(errorHandler);
// --- middleware --- Error 

app.listen(config.port, () => {
  console.log(`prendido http://localhost:${config.port}`);
});

// reto, del año bisiesto
// app.get( '/bisiesto/:anio', (req, res) => {
//   let tiempo = req.params.anio;
//   if( (tiempo % 4 === 0 && tiempo % 100 !== 0) || tiempo % 400 === 0 ){
//     res.send(`El año ${tiempo} es bisiesto.`);
//   }  else res.send(`El año ${tiempo} no es bisiesto.`);
// } )
