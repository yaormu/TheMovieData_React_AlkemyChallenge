// Libraries
import { Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound"

// Styles
import "./css/bootstrap.min.css";
import "./css/app.css";
import Favoritos from "./components/Favoritos";

function App() {
  // El objetivo de tener esta funcionalidad del elemento padre para poderla compartir 
  // posteriormente con el compononetes Resultados y Listados
  const addOrRemoveFromFavs = movieData => e => {
    const favMovies =  localStorage.getItem('favs'); // Obtener contenido del localStorage

    let tempMoviesInFavs; // Obtendra valores de acuerdo al localStorage

    if (favMovies === null) {
      tempMoviesInFavs = []
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
      
    const btn = e.currentTarget; 
    const parent = btn.parentElement; // Obtener el elemento padre del boton
    const imgURL = parent.querySelector('img').getAttribute('src'); // Capturar el elemento src de la img
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieDataObtenida = { // Al tener el mismo nombre key no hay necesidad declarar imgURL: imgURL
      imgURL, title, overview,
      id: btn.dataset.movieId,
    }

    let moviesIsInArray = tempMoviesInFavs.find(oneMovie => { // Filtrar con id y no repetir
      return oneMovie.id === movieDataObtenida.id
    });

    if (!moviesIsInArray) { // Si no esta la pelicula la ingresamos
      tempMoviesInFavs.push(movieDataObtenida); // Insertar información a movieDataObtenida
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs)) // Insertar datos al localStorage
      console.log('Se agrego la pelicula')
    } // Si esta la pelicula la sacamos
    else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieDataObtenida.id;
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      console.log("Se elimino la pelicula");
    }
  }

return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/listado" 
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} 
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route  path="/resultados" element={<Resultados />} />
          <Route  path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
