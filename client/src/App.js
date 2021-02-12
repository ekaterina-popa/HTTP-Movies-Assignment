import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialMovieState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState(initialMovieState);
  const params = useParams();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const onEditSubmit = () => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));

    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        console.log("res.data", res.data);
      })
      .catch(console.error);
  };

  const onAddSubmit = () => {
    axios
      .post("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("added movie", res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getMovieList();
    onEditSubmit();
    onAddSubmit();
  });

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/movies/:id"
        render={(props) => <Movie {...props} addToSavedList={addToSavedList} />}
      />

      <Route
        exact
        path="/update-movie/:id"
        render={(props) => <UpdateMovie {...props} onSubmit={onEditSubmit} />}
      />
      <Route
        exact
        path="/add-movie"
        render={(props) => (
          <UpdateMovie
            {...props}
            onSubmit={onAddSubmit}
            movie={initialMovieState}
          />
        )}
      />
    </>
  );
};

export default App;
