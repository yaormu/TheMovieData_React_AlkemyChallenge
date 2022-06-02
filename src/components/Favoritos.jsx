import { useEffect, useState } from "react";

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      console.log(favsArray);
      setFavorites(favsArray);
    }
  }, []);

  return (
    <>
    <h2>Sección Favoritos</h2>
    <div className="row">
        {
            favorites.map((oneMovie, index) => {
                return (
                    <div className="col-3" key={index}>
                        <div className="card my-4">
                            <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title.substring(0, 20)}...</h5>
                                <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
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
