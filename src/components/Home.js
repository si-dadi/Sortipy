import Navbar from "../components/UI/NavBar/Navbar";
import SideNav from "./UI/SideNav/SideNav";
import { MusicPlayer } from "./UI/Music Player/MusicPlayer";
import React, { useState } from "react";
import Error from "./services/Error";
import HomePage from "./pages/HomePage";
import LikedSongs from "./pages/LikedSongs";
import Playlists from "./pages/Playlists";
import TopCharts from "./pages/TopCharts";
import Recommendations from "./pages/Recommendations";
import SearchResults from "./UI/NavBar/SearchResults";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./services/firebase";

const genres = [
  { title: "Hip-Hop", value: "hip hop" },
  { title: "K-Pop", value: "k pop" },
  { title: "Country", value: "country" },
  { title: "Dance", value: "dance" },
  { title: "Alternative", value: "alternative" },
  { title: "Electronic", value: "electronic" },
  { title: "Rock", value: "rock" },
  { title: "Pop", value: "pop" },
  { title: "Soul", value: "soul" },
  { title: "Worldwide", value: "worldwide" },
];

export default function Home() {
  const [navigator, setNavigator] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [fetchAlbums, setAlbums] = useState([]);
  const [fetchTracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(genres[0].value || "hip hop");
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
  const [trackId, setTrackId] = useState("");
  const [isLikedSong, setIsLikedSong] = useState(false);
  const [likedSongsData, setLikedSongsData] = useState([]);
  const [likedSongsArray, setLikedSongsArray] = useState([]);

  // console.log(isPlaying);
  // window.addEventListener(
  //   'keydown', function (k) {
  //     if(k.which===32)
  //     setIsPlaying(!isPlaying)
  //   }
  // );

  // firestore
  const dbRef = doc(db, "users", localStorage.getItem("email"));

  async function checkLikedSong(TrackId) {
    await getDoc(dbRef, "users", localStorage.getItem("email")).then(
      (docSnap) => {
        if (docSnap.exists()) {
          setLikedSongsData(docSnap.data());
          setLikedSongsArray(likedSongsData.LikedSongs)
          // console.log("LSA", likedSongsArray);
          if (
            likedSongsArray.includes(
              `https://api.spotify.com/v1/tracks/${TrackId}` 
            )
          ) {
            setIsLikedSong(true);
          } else setIsLikedSong(false);

          return isLikedSong;
        } else {
          return <Error />;
        }
      }
    );
    console.log("L", isLikedSong);
  }

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
        trackId={trackId}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        checkLikedSong={checkLikedSong}
        isLikedSong={isLikedSong}
        setIsLikedSong={setIsLikedSong}
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
            checkLikedSong={checkLikedSong}
          />
        ) : navigator === "Liked Songs" ? (
          <LikedSongs
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            likedSongsArray={likedSongsArray}
            setLikedSongsArray={setLikedSongsArray}
            setSongImage={setSongImage}
            setSongname={setSongName}
            setSingerName={setSingerName}
            setAudioSrc={setAudioSrc}
            setSearchAudioErr={setSearchAudioErr}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            setDuration={setDuration}
          />
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
            checkLikedSong={checkLikedSong}

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
          setTrackId={setTrackId}
          checkLikedSong={checkLikedSong}
        />
      )}
    </div>
  );
}
