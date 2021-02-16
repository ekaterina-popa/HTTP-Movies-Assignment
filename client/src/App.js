import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
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
    const id = params.id;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("edited movie", res.data);
        setMovie(res.data);
        setMovieList([...movieList, res.data]);
      })
      .catch(console.error);
  };

  const onAddSubmit = () => {
    axios
      .post("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("added movie", res.data);
        setMovieList(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getMovieList();
  }, []);

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
        render={(props) => (
          <MovieForm
            {...props}
            onSubmit={onEditSubmit}
            movie={movie}
            setMovie={setMovie}
          />
        )}
      />
      <Route
        exact
        path="/add-movie"
        render={(props) => (
          <MovieForm
            {...props}
            onSubmit={onAddSubmit}
            movie={movie}
            setMovie={setMovie}
          />
        )}
      />
    </>
  );
};

export default App;
