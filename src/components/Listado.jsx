import { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

const Listado = ({ addOrRemoveFromFavs }) => {
  // Obtener vr token
  const token = sessionStorage.getItem("token");

  // Almacenar datos api en principio vacio, al utilizar map no mostrar nada, pero si lo inicializas en null daria error
  const [moviesList, setMoviesList] = useState([]);

  // Obtener API
  useEffect(() => {
    // Obtener URL
    const endpoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=8764e6417ae516fb86bc820ee865a6d8&language=es-US&page=1";
    // Capturar data URL
    axios
      .get(endpoint)
      .then((response) => {
        // console.log(response);
        const apiData = response.data;
        // console.log(apiData);
        // Almacenar datos capturados de API
        setMoviesList(apiData.results);
      })
      .catch((error) => {
        //console.log(error, "o!!")
        swAlert(<h2>Hubo errores, intenta más tarde</h2>);
      });
  }, [setMoviesList]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    //{/* Renderizado condicional, protegiendo ruta */}
    //{/* Si no tengo información = token es null realice una redirección */}
    //{ !token && <Navigate to="/" /> */}

    <div className="row">
      {/* Recorrer y mostrar un nuevo array */}
      {moviesList.map((oneMovie, index) => {
        // create movieData object
        const movieData = {
          imgURL: `https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`,
          overview: oneMovie.overview,
          title: oneMovie.title,
        };

        return (
          <div className="col-3" key={index}>
            <div className="card my-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                className="card-img-top"
                alt="..."
              />
              <button
                className="favourite-btn"
                onClick={addOrRemoveFromFavs(movieData)} // <-- pass to callback
                data-movie-id={oneMovie.id} // Implemento ID de la pélicula por funcionalidad
              >
                🖤
              </button>
              <div className="card-body">
                <h5 className="card-title">
                  {oneMovie.title.substring(0, 20)}...
                </h5>
                <p className="card-text">
                  {oneMovie.overview.substring(0, 100)}...
                </p>
                <Link
                  to={`/detalle?peliculitaID=${oneMovie.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listado;
