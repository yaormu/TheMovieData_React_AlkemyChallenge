import { Navigate, Link } from "react-router-dom";

const Favoritos = ({ addOrRemoveFromFavs, favorites }) => {
  
    let token = sessionStorage.getItem('token');

  return (
    <>
    { !token && <Navigate to="/" /> }
    <h2>Sección Favoritos</h2>
    { !favorites.length && <div className="col-12 text-danger">No ienes nada en favoritos</div> }
    <div className="row">
        {
            favorites.map((oneMovie, index) => {
                return (
                    <div className="col-3" key={index}>
                        <div className="card my-4">
                            <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                            <button
                                className="favourite-btn"
                                onClick={addOrRemoveFromFavs(favorites)}
                                data-movie-id={oneMovie.id} 
                            >
                                🖤
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title.substring(0, 20)}...</h5>
                                <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
                                <Link to={`/detalle?peliculitaID=${oneMovie.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>
    </>
    );
};

export default Favoritos;
