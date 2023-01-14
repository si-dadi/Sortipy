import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({
  searchTerm,
  setSearchTerm,
  accessToken,
  setAccessToken,
  fetchAlbums,
  setAlbums,
  fetchTracks,
  setTracks,
}) => {
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
    // console.log("Searching For" + searchTerm);

    var artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var trackArtistId = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchTerm +
        "&type=track,artist",
      artistParams
    )
      .then((res) => res.json())
      // .then(data => console.log(data.artists))
      .then((data) => {
        setAlbums(data.artists);
        setTracks(data.tracks.items);
      });
  }

  return (
    <div>
      <form
        autoComplete="off"
        className="p-2 text-gray-500 hover:text-gray-300 focus-within:text-gray-300"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-row justify-start items-center">
          <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className="flex-1 bg-transparent border-none placeholder-gray-400 hover:text-gray-50 outline-none text-base text-white p-4"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              fetchResults();
            }}
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
