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

function App() {

  const addOrRemoveFromFavs = movieData => e => {
    console.log(movieData);
  }

  // Función para capturar opcion añadir o quitar de 💛 favoritos, se pasara mediante props a los hijos
  // const addOrRemoveFromFavs = e => {
    // capturar elementos
    //const btn = e.currentTarget;  // console.log(btn);
    // Capturar el elemnto padre donde esta el boton, que seria un div
    // const parent = btn.parentElement; // console.log(parent)
    // const imgURL = parent.querySelector('img').getAttribute('src'); // Capturar el elemento src de la img
    // const title = parent.querySelector('h5').innerText;
    // const overview = parent.querySelector('p').innerText;
    // Objeto que recoga todos los valores
    // const movieData = {
    //  imgURL, title, overview
    // }
    // console.log(movieData);
  // }

  

  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route  path="/resultados" element={<Resultados />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
