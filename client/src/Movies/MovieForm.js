import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieForm = (props) => {
  const { movie, setMovie } = props;
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [params]);

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
      <h2>Movie Form</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default MovieForm;
