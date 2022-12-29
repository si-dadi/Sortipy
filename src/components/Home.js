import Navbar from "./Navbar";
import SideNav from "./Player/SideNav";
import { MusicPlayer } from "./Player/MusicPlayer";
import React, { useState, useEffect } from "react";
import Error from "./services/Error";
import HomePage from "./services/pages/HomePage";
import LikedSongs from "./services/pages/LikedSongs";
import Playlists from "./services/pages/Playlists";
import TopCharts from "./services/pages/TopCharts";
import Recommendations from "./services/pages/Recommendations";
import SearchResults from "./Player/SearchResults";

const genres = [
  { title: "Pop", value: "pop" },
  { title: "Hip-Hop", value: "hip hop" },
  { title: "Dance", value: "dance" },
  { title: "Electronic", value: "electronic" },
  { title: "Soul", value: "soul" },
  { title: "Alternative", value: "alternative" },
  { title: "Rock", value: "rock" },
  // { title: "Latin", value: "latin" },
  // { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "country" },
  { title: "Worldwide", value: "worldwide" },
  // { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  // { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "k pop" },
];

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "262792b9afmsh3bea3d41ee6769cp1edc58jsn436bfad00fef",
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
};

export default function Home() {
  const [navigator, setNavigator] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [fetchAlbums, setAlbums] = useState([]);
  const [fetchTracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(genres[0].value || "pop");
  const [topCharts, setTopCharts] = useState([]);
  const [reccomendations, setReccomendations] = useState([]);

  // For Song Details in MusicPlayer Section
  const [songName, setSongName] = useState("");
  const [singerName, setSingerName] = useState("");
  const [songImage, setSongImage] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchAudioErr, setSearchAudioErr] = useState(false);
  const [duration, setDuration] = useState(0); // total song duration

  console.log(isPlaying);

  return (
    <div className="fixed overflow-auto text-white z-0 w-screen min-h-screen h-screen min-w-full bg-gradient-to-tr from-slate-800 via-black/95 to-slate-800 ">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        fetchAlbums={fetchAlbums}
        setAlbums={setAlbums}
        fetchTracks={fetchTracks}
        setTracks={setTracks}
      />
      <SideNav
        navigator={navigator}
        setNavigator={setNavigator}
        setSearchTerm={setSearchTerm}
      />
      <MusicPlayer
        songName={songName}
        singerName={singerName}
        songImage={songImage}
        audioSrc={audioSrc}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        searchAudioErr={searchAudioErr}
        duration={duration}
      />
      {searchTerm === "" ? (
        navigator === "Home" ? (
          <HomePage
            selected={selected}
            setSelected={setSelected}
            genres={genres}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            fetchTracks={fetchTracks}
            setTracks={setTracks}
            setSongName={setSongName}
            setSingerName={setSingerName}
            setSongImage={setSongImage}
            setAudioSrc={setAudioSrc}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSearchAudioErr={setSearchAudioErr}
            setDuration={setDuration}
          />
        ) : navigator === "Liked Songs" ? (
          <LikedSongs />
        ) : navigator === "Your Playlists" ? (
          <Playlists />
        ) : navigator === "Recommendations" ? (
          <Recommendations
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            reccomendations={reccomendations}
            setReccomendations={setReccomendations}
          />
        ) : navigator === "Top Charts" ? (
          <TopCharts
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            topCharts={topCharts}
            setTopCharts={setTopCharts}
            songName={songName}
            setSongName={setSongName}
            singerName={singerName}
            setSingerName={setSingerName}
            songImage={songImage}
            setSongImage={setSongImage}
            setAudioSrc={setAudioSrc}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSearchAudioErr={setSearchAudioErr}
            setDuration={setDuration}
          />
        ) : (
          <Error />
        )
      ) : (
        <SearchResults
          searchTerm={searchTerm}
          fetchAlbums={fetchAlbums}
          fetchTracks={fetchTracks}
          songName={songName}
          setSongName={setSongName}
          singerName={singerName}
          setSingerName={setSingerName}
          songImage={songImage}
          setSongImage={setSongImage}
          setAudioSrc={setAudioSrc}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setSearchAudioErr={setSearchAudioErr}
          selected={selected}
          setDuration={setDuration}
        />
      )}
    </div>
  );
}
