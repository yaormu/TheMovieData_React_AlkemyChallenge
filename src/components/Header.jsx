import { Link } from "react-router-dom";

// Components
import Buscador from "./Buscador";

const Header = () => {
    return (
      <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <Link className="navbar-brand" to="/">YaFilms</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/"> Home </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/listado"> Listado </Link>
                    </li>
                  </ul>
                </div>
                <Buscador />
              </div>
          </nav>
      </header>
    )
}

export default Header
