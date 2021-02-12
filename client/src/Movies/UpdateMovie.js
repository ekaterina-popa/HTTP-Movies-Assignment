import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(props.movie);
  const params = useParams();
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        ></input>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        ></input>
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        ></input>
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
          value={movie.stars}
        ></input>
        <button
          type="submit"
          onClick={props.history.push(`/movies/${params.id}`)}
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateMovie;
