import React, { useEffect } from "react";

function Recommendations({
  accessToken,
  setAccessToken,
  recommendations,
  setReccomendations,
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
        fetch("https://api.spotify.com/v1/recommendations", artistParams)
          .then((res) => res.json())
          // .then((data) => console.log(data))
      );
  }, []);
  return (
    <div className="text-white justify-center items-center flex flex-col text-3xl md:mt-[8%] sm:mt-[15%]">
      <h1>
        Recommendations
        </h1>
        <h3 className="mt-4">Work in Progress...</h3>
    </div>
  );
}

export default Recommendations;
