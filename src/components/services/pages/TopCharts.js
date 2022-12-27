import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function TopCharts({ accessToken, setAccessToken, topCharts, setTopCharts }) {
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
    var artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((res) => res.json())
      .then((data) => setAccessToken(data.access_token))
      // .then(console.log("AT: ",accessToken))
      .then(
        fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
          // 'https://api.spotify.com/v1/browse/featured-playlists',
          artistParams
        )
          .then((res) => res.json())
          .then((data) => setTopCharts(data.tracks.items))
      )
      // .then(console.log(fetchTracks));
  }, []);
  // console.log(topCharts)
  return (
    <>
      <div className="justify-center items-center overflow-auto flex flex-col m-auto w-10/12 ">
        <div className="text-white flex items-center text-3xl font-bold mt-5 mb-8">
          Top Charts{" "}
        </div>
        {/* <SearchResults fetchTracks={fetchTracks}/> */}
        <div className="grid ld:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-auto h-1/2">
        
        {topCharts.map((track, i) => {
          // console.log(track)
          return (
            <Card
              onClick={()=>window.open(track.track.preview_url, "_blank")}
              className="mx-3 overflow-auto my-3 bg-slate-700 hover:opacity-70 hover:scale-105 cursor-pointer text-white rounded-3xl"
            >
              <CardHeader color="blue" className="relative h-56">
                <img
                  src={track.track.album.images[0].url}
                  alt="error"
                  className="h-full w-full my-2 flex rounded-xl"
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography className="mb-2 text-2xl font-bold my-2">
                  {track.track.name}
                </Typography>
                <Typography className="text-xl my-2">
                  {track.track.artists[0].name}
                </Typography>
              </CardBody>
            </Card>
          );
        })}
      </div>
        </div>
    </>
  );
}

export default TopCharts;
