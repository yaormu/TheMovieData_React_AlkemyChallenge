import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Buscador = () => {

  // Redireccionar
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim(); // "keyword" es el "name" del input & "trim" no tener en cuenta espacios
    // console.log(keyword);
    if (keyword.length === 0) { // Menor letras arrojara msj
      swAlert(<h5>Tienes que escribir una palabra clave</h5>);
    } else if (keyword.length < 4) {
      swAlert(<h5>Tienes que escribir más de 4 caracteres</h5>);
    } else {
      e.currentTarget.keyword.value = ""; // limpiar campos despues de la busqueda
      navigate(`/resultados?keyword=${keyword}`) // Depues de ? podria ir cualquier palabra
    }
  }

  return (
    <>
    <form className="d-flex align-items-center" onSubmit={submitHandler}>
        <label className="form-label mb-0 mx-2">
            <input className="form-control" type='text' name='keyword' placeholder="Escribe una palabra clave..." />
        </label>
        <button className="btn btn-warning" type='submit'>Buscar</button>
    </form>
    </>
  )

}

export default Buscador;
