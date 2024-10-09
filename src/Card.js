import React, { useState } from 'react';
import { Audio } from 'react-loader-spinner';

const Card = ({ searchTerm }) => {
  const [moviedata, setmoviedata] = useState({});
  const [loading, setloading] = useState(false);

  const fetchdata = () => {
    const searchUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey={your api key}`;
    setloading(true);

    // First fetch to get the list of movies
    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) throw new Error("network error");
        return response.json();
      })
      .then((data) => {
        if (data.Search && data.Search.length > 0) {
          const movieId = data.Search[0].imdbID; // Get the ID of the first movie
          // Fetch detailed information for the specific movie using the ID
          const detailUrl = `http://www.omdbapi.com/?i=${movieId}&apikey={your api key}`;
          return fetch(detailUrl);
        } else {
          setmoviedata({ error: "No results found" });
          throw new Error("No results found");
        }
      })
      .then((response) => response.json())
      .then((data) => {
        // Structure the movie data to include more details
        const movieDetails = {
          title: data.Title || "N/A",
          actors: data.Actors || "N/A",
          releaseDate: data.Released || "N/A",
          imdbRating: data.imdbRating || "N/A",
          genre: data.Genre || "N/A",
          plot: data.Plot || "N/A",
        };
        setmoviedata(movieDetails);
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setloading(false));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-4 p-4">
      <button
        onClick={fetchdata}
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Fetch results
      </button>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div>
          {moviedata.error ? (
            <h2 className="text-red-500 text-center mt-4">{moviedata.error}</h2>
          ) : (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{moviedata.title}</h2>
              <p className="mt-2 text-gray-600"><strong>Actors:</strong> {moviedata.actors}</p>
              <p className="mt-2 text-gray-600"><strong>Release Date:</strong> {moviedata.releaseDate}</p>
              <p className="mt-2 text-gray-600"><strong>IMDb Rating:</strong> {moviedata.imdbRating}</p>
              <p className="mt-2 text-gray-600"><strong>Genre:</strong> {moviedata.genre}</p>
              <p className="mt-2 text-gray-600"><strong>Plot:</strong> {moviedata.plot}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
