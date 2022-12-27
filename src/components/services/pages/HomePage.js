import React, { useState, useEffect } from "react";
import SearchResults from "../../Player/SearchResults";

function HomePage({
  selected,
  setSelected,
  genres,
  accessToken,
  setAccessToken, fetchTracks, setTracks, setSongname, setSingerName, setSongImage
}) {
  const [genreTitle, setGenreTitle] = useState(genres[0].title);

  useEffect(() => {
    //Spotify API Access Token
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        process.env.REACT_APP_SPOTIFY_CLIENT +
        "&client_secret=" +
        process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((res) => res.json())
      .then((data) => setAccessToken(data.access_token));
    // .then(console.log(accessToken))
  }, []);

  async function fetchResults() {
    var artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var trackArtistId = await fetch(
      "https://api.spotify.com/v1/search?q=genre:" +
        selected +
        "&type=track,artist",
      artistParams
    )
      .then((res) => res.json())
      // .then(data => console.log(data.artists))
      .then((data) => {
        // console.log(data);
        setTracks(data.tracks.items)
        // console.log(fetchTracks)
      });
  }

  return (
    <div className="relative flex flex-col w-10/12 mx-auto mt-10 sm:mt-4 items-center justify-center">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white uppercase my-4">
          Discover {selected}
        </h2>

        <select
        defaultValue={genres[0]}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            fetchResults();
          }}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 z-10"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {/* [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      <SearchResults fetchTracks={fetchTracks}/>
      </div>
    </div>
  );
}

export default HomePage;
