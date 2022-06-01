import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {

    // Redirecciona
    const navigate = useNavigate();
    //console.log(navigate);

    const submitHandler = e => {
        e.preventDefault();
        // Captura vr campo
        const email = e.target.email.value;
        const password = e.target.password.value;
        //console.log(email, password);

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        //console.log(regexEmail.test(email));

        // valida campo
        if (email === '' || password === '') {
            // console.log('Campos no pueden estar vacios');
            swAlert(<h2>Campos no pueden estar vacios</h2>);
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            // console.log('Debes escribir una dirección de correo electrónico válida');
            swAlert(<h2>Debes escribir una dirección de correo electrónico válida</h2>);
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            // console.log('Credenciales inválidas');
            swAlert(<h2>Credenciales inválidas</h2>);
            return;
        }

        // console.log('Ok lista para eviar la información');

        // Envíar información: 1.URL end point de la API a conectar. 2.Los datos objeto que la API espera recibir
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(<h2>Perfecto, ingresaste correctamente</h2>);
                // console.log(res.data); // Obtener token
                const tokenRecibido = res.data.token; // Guardar token
                sessionStorage.setItem('token', tokenRecibido); // Almacenar en el localStorage, pero al utilizar sessionStorage al salir del navegador se pierde el token, el cual solo almacena String
                // Redirecionar apenas logue a componente listado
                navigate('/listado');
            })
    }

    // localStorage mantiene sesion, sessionStorage al cerrar sesion borra esta
    let token = sessionStorage.getItem('token');

  return (
    <>
      { token && <Navigate to="/" /> }

      <div className="col-6 offset-3">
          <h2>Formulario de login</h2>
          <form onSubmit={submitHandler}>
              <label className="form-label d-block mt-2">
                  <span>Correo electrónico:</span> <br />
                  <input className="form-control" type='text' name='email' />
              </label>
              <label className="form-label d-block mt-2">
                  <span>Contraseña:</span> <br />
                  <input className="form-control" type='password' name='password' />
              </label>
              <button className="btn btn-success mt-2" type='submit'>Ingresar</button>
          </form>
      </div>
    </>
  )
}

export default Login
