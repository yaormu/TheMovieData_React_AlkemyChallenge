import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from "@sweetalert/with-react";

const Resultados = () => {
  let query = new URLSearchParams(window.location.search);  // Obtener la URL que esta en el navegador en el momento
  // console.log("nombre de url es: " + query)
  let movieName = query.get("keyword"); // Obtener el dato ID de busqueda la cual se coloco como "keyword"
  // console.log("nombre buscado fue: " + movieName)
  const [moviesResults, setMoviesResults] = useState([]); // Obtener datos resultados

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=8764e6417ae516fb86bc820ee865a6d8&language=es-ES&query=${movieName}`;  //console.log(endpoint);

    axios.get(endpoint)
      .then(response => {
        const moviesArray = response.data.results;
        // console.log(moviesArray);

        if (moviesArray.length === 0) {
          swAlert(<h4>Tu búsqueda no arrojó resultados</h4>);
        }

        setMoviesResults(moviesArray); // Recibe la data
      })
      .catch(error => console.log(error))
  }, [movieName]); // vacio para renderice una vez, o para que renderice cada vez que encuentre un cambio

  return (
    <>
      <h2>Buscaste: <em>{movieName}</em></h2>
      {moviesResults.length === 0 && <h3>No hay resultados</h3>}
      <div className="row">
        {
          moviesResults.map((oneMovie, index) => {
            return (
              <div className="col-4" key={index}>
                <div className="card my-4">
                  <img src={ `https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}` } className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{ oneMovie.title.substring(0, 30) }...</h5>
                    <Link to={`/detalle?peliculitaID=${oneMovie.id}`} className="btn btn-info">View Details</Link>
                  </div>
                </div>
              </div>

            )
            })
          }
          </div>

    </>
  )
}

export default Resultados;
