const express = require('express');

// importamos nuestros servicios
const MoviesService = require('../services/movies');

function moviesApi(app) {
  //iniciamos rutas
  const router = express.Router();

  // ruta de inicios
  app.use('/api/movies', router);

  // ponemos nuestros servicios
  const moviesService = new MoviesService();

  // iniciamos con el home,=(/api/movies)  //ver todo
  router.get('/', async function (req, res, next) {
    // viene de la api
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });

      // error al proposito
      // throw new Error('Error getting movies :D');

      // mandamos el estatus 200, que esta ok, y lo mandamos con .json
      res.status(200).json({
        data: movies, // los datos son lo que declaramos antes
        message: 'movies listed', // Y los mensages para el cliente
      });
    } catch (err) {
      next(err);
    }
  });

  // iniciamos con el home,=(/api/movies)  //ver por id
  router.get('/:movieId', async function (req, res, next) {
    // viene de la url
    const { movieId } = req.params;
    try {
      const movies = await moviesService.getMovie({ movieId });

      // mandamos el estatus 200, que esta ok, y lo mandamos con .json
      res.status(200).json({
        data: movies, // los datos son lo que declaramos antes
        message: 'movies retrieved', // Y los mensages para el cliente
      });
    } catch (err) {
      next(err);
    }
  });

  // iniciamos con el home,=(/api/movies)  //crear pelicula
  router.post('/', async function (req, res, next) {
    // viene desdel cuerpo, le ponemos un alisas
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie });

      // mandamos el estatus 201, que esta ok, y lo mandamos con .json
      res.status(200).json({
        data: createMovieId, // los datos son lo que declaramos antes
        message: 'movie create', // Y los mensages para el cliente
      });
    } catch (err) {
      next(err);
    }
  });

  // iniciamos con el home,=(/api/movies)  //para actualisar
  router.put('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMoviesId = await moviesService.updateMovie({
        movieId,
        movie,
      });

      // mandamos el estatus 200, que esta ok, y lo mandamos con .json
      res.status(200).json({
        data: updatedMoviesId, // los datos son lo que declaramos antes
        message: 'movies updated', // Y los mensages para el cliente
      });
    } catch (err) {
      next(err);
    }
  });

  // iniciamos con el home,=(/api/movies)  //para borrar
  router.delete('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const deleteMoviesId = await moviesService.deleteMovie({ movieId });

      // mandamos el estatus 200, que esta ok, y lo mandamos con .json
      res.status(200).json({
        data: deleteMoviesId, // los datos son lo que declaramos antes
        message: 'movies deleted', // Y los mensages para el cliente
      });
    } catch (err) {
      next(err);
    }
  });

  // reto
  // router.patch('/:movieId', async function (req, res, next) {
  //   const { movieId } = req.params;
  //   const { body: movie } = req;

  //   try {
  //     const updatedMovieId = await moviesService.partialUpdateMovie({
  //       movieId,
  //       movie,
  //     });
  //     res.status(200).json({
  //       data: updatedMovieId,
  //       message: 'Movie Updated patch',
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // });
}

module.exports = moviesApi;
