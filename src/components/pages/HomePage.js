import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function HomePage({
  selected,
  setSelected,
  genres,
  accessToken,
  setAccessToken,
  fetchTracks,
  setTracks,
  setSongName,
  setSingerName,
  setSongImage,
  setAudioSrc,
  isPlaying,
  setIsPlaying,
  setSearchAudioErr,
  setDuration,
  checkLikedSong,
}) {

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
        setTracks(data.tracks.items);
        // console.log(fetchTracks)
      });
  }

  useEffect(() => {
    setSelected('hip hop')
    fetchResults();
  }, []);

  return (
    <div className="relative flex flex-col w-10/12 mx-auto mt-10 sm:mt-4 items-center justify-center top-20 ">
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
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        <div className="grid ld:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-auto h-1/2">
          {fetchTracks.map((track, i) => {
            // console.log(track)
            return (
              track.preview_url && (
                <Card
                  className="mx-3 overflow-auto my-3 bg-slate-700 hover:opacity-70 hover:scale-105 cursor-pointer text-white rounded-3xl"
                  onClick={() => {
                    setSongImage(track.album.images[0].url);
                    setSongName(track.name);
                    setSingerName(track.artists[0].name);
                    track.preview_url
                      ? setAudioSrc(track.preview_url)
                      : setSearchAudioErr(true);
                    setIsPlaying(!isPlaying);
                    setDuration(track.duration_ms);
                    checkLikedSong(track.id)
                  }}
                >
                  <CardHeader color="blue" className="relative h-56">
                    <img
                      src={track.album.images[0].url}
                      alt="error"
                      className="h-full w-full my-2 flex rounded-xl"
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography className="mb-2 text-2xl font-bold my-2">
                      {track.name}
                    </Typography>
                    <Typography className="text-xl my-2">
                      {track.artists[0].name}
                    </Typography>
                  </CardBody>
                </Card>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
