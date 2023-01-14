import {
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaHeart} from "react-icons/fa";
import { db } from "../services/firebase";
import Loader from "../services/Loader";

function LikedSongs({
  accessToken,
  setAccessToken,
  likedSongsArray,
  setLikedSongsArray,
  setSongImage,
  setSongName,
  setSingerName,
  setAudioSrc,
  setSearchAudioErr,
  setIsPlaying,
  isPlaying,
  setDuration,
}) {
  const dbRef = doc(db, "users", localStorage.getItem("email"));
  const [likedSongsData, setLikedSongsData] = useState([]);
  const [likedSongsAPI, setLikedSongsAPI] = useState([]);

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
  var artistParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    const getData = () => {
      getDoc(dbRef, "users", localStorage.getItem("email")).then((docSnap) => {
        if (docSnap.exists()) {
          setLikedSongsData(docSnap.data());
          setLikedSongsArray(likedSongsData.LikedSongs);
          likedSongsArray &&
            likedSongsArray.map((data) => {
              fetch(data, artistParams)
                .then((res) => res.json())
                .then((res) =>
                  setLikedSongsAPI((likedSongsAPI) => [...likedSongsAPI, res])
                );
              // .then(res=>console.log(res))
            });
        }
      });
    };
    getData();
  }, []);
  // console.log("LSA", likedSongsArray);
  // console.log(("LSD", likedSongsData));
  console.log("LSAPI", likedSongsAPI);
  return (
    <div className="items-center justify-center mx-auto overflow-y-auto">
      {likedSongsAPI.length === 0 ? (
        <Loader/>
      ) : (
        <>
          <div className="text-white justify-center items-center flex mt-20 my-5 text-2xl">
            Liked Songs
          </div>
          {likedSongsAPI.map((res, i) => {
            return (
              <div
                className="items-center justify-center flex my-4 w-full text-white shadow-slate-800 hover:bg-slate-800 rounded-3xl hover:scale-105 cursor-pointer transition"
                onClick={() => {
                  setSongImage(res.album.images[0].url);
                  setSongName(res.name);
                  setSingerName(res.artists[0].name);
                  res.preview_url
                    ? setAudioSrc(res.preview_url)
                    : setSearchAudioErr(true);
                  setIsPlaying(!isPlaying);
                  setDuration(res.duration_ms);
                  // checkLikedSong(res.id)
                }}
              >
                <div className="items-center text-center font-bold">
                  {i + 1}
                </div>
                <div className="items-center text-center w-1/5 left-0 relative">
                  <img
                    src={res?.album?.images[0].url}
                    width={"70px"}
                    className="rounded-full mx-5 text-white text-xs italic"
                    alt="Search a Song to Play"
                  />
                </div>
                <div className=" w-1/4 px-2 mx-4 lg:text-xl md:text-sm sm:text-xs text-white font-bold items-center text-center">
                  {res?.name}
                </div>
                <div className="w-1/4 px-2 mx-4 lg:text-md md:text-sm sm:text-xs text-white/70 items-center text-center">
                  {res?.artists[0]?.name}
                </div>
                <div>
                  <FaHeart className="drop-shadow-[0px_0px_8px_#39ff14] fill-green-300 scale-125 right-0" />
                  {/* <i className="transition-all duration-300 ease-in-out">
                  {
                    doesn't work rip

                    isLikedSong ? (
                      <FaHeart
                        className="drop-shadow-[0px_0px_8px_#39ff14] scale-125 "
                        onClick={() => {
                          try {
                            updateDoc(dbRef, {
                              LikedSongs: arrayRemove(
                                "https://api.spotify.com/v1/tracks/" + trackId
                              ),
                            }
                            );
                            setIsLikedSong(false)
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => {
                          console.log(trackId)
                          try {
                            updateDoc(dbRef, {
                              LikedSongs: arrayUnion(
                                "https://api.spotify.com/v1/tracks/" + trackId
                              ),
                            });
                            setIsLikedSong(true)
                            
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                    )
                  }
                </i> */}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default LikedSongs;
