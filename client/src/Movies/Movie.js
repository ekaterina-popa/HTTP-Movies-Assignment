import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const routeToUpdatePage = (e) => {
    e.preventDefault();
    props.history.push(`/update-movie/${params.id}`);
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="edit-button" onClick={routeToUpdatePage}>
        Edit
      </button>
      <button className="save-button" onClick={saveMovie}>
        Save
      </button>
    </div>
  );
}

export default Movie;
