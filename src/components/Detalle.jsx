import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";


const Detalle = () => {
  // Si no esta logueado no mostrar este componente
  let token = sessionStorage.getItem('token');

  // Obtener la URL que esta en el navegador en el momento
  let query = new URLSearchParams(window.location.search);
  // Obtener el dato ID de la URL
  let movieID = query.get('peliculitaID');
  // console.log(movieID);

  // Obtener datos, empieza null, porque se va a realizar un renderizado condicional para evitar errores
  const [movie, setMovie] = useState(null);

  // Llamar a la API y se ejecute una sola vez []
  useEffect(() => {
    // console.log(movieID);
    const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=8764e6417ae516fb86bc820ee865a6d8&language=es-ES`
    // console.log(endpoint);
    axios.get(endpoint)
      .then(response => {
        const movieData = response.data;
        // console.log(movieData);
        setMovie(movieData);
      })
      .catch(error => {
        console.log(error);
      })
  }, [movieID]); 

  return (
    <>
      { !token && <Navigate to="/" /> }
      { !movie && <p>Cargando...</p>}
      {
        movie &&
        <>
          <h2>Titulo: {movie.title}</h2>
          <div className="row">
              <div className="col-4">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
              </div>
              <div className="col-8">
                <h5>Fecha de estreno: { movie.release_date }</h5>
                <p>{ movie.overview }</p>
                <h5>Raking: { movie.vote_average }</h5>
                <h5>Generos:</h5>
                <ul>
                  { movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>) }
                </ul>
              </div>
            </div>
        </>
      }
    </>
  )
}

export default Detalle;
