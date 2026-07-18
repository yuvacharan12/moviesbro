import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './App.css'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [category,setCategory]=useState("movies")
  const [sorted,setSorted]=useState("sortby")
  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";

      if (category === "movies") {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      } else if (category === "series") {
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
      } else if (category === "kids") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751`;
      }
      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results.slice(0, 20));
    };

    fetchMovies();
  }, [category]);
  const sortedMovies = [...movies];

  if (sorted === "ratings") {
    sortedMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
  } else if (sorted === "newest") {
    sortedMovies.sort(
      (a, b) =>
        new Date(b.release_date) -
        new Date(a.release_date)
    );
  }

  return (
    <>
      <nav>
        <h2 className="title">Movies Bro's</h2>
        <ul className="lists">
          <li onClick={()=>setCategory("movies")}>Movies</li>
          <li onClick={()=>setCategory("series")}>Shows</li>
          <li onClick={()=>setCategory("kids")}>Kids</li>
        </ul>
        <select onChange={(e)=>setSorted(e.target.value)}>
          <option value="">Sort By</option>
          <option value="ratings">Ratings</option>
          <option value="newest">Newest</option>
        </select>
      </nav>
      <div className="movies-container">
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default App;