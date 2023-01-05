import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaRegHeart,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import VolumeControl from "./VolumeControl";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
// import './MusicPlayer.css'

const MusicPlayer = ({
  songName,
  singerName,
  songImage,
  audioSrc,
  isPlaying,
  setIsPlaying,
  searchAudioErr,
  duration,
  trackId
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [Duration, setDuration] = useState(0); // total song duration
  const [currentTime, setCurrentTime] = useState(0); // current time: TODO: change to time left in the future
  const [seekTime, setSeekTime] = useState(0);
  const audioPlayer = useRef(); //audio ref
  const audioProgress = useRef(); //audio progress
  const animationRef = useRef();
  const [Volume, setVolume] = useState(40);
  const [sliderPer, setSliderPer] = useState(0);

  const calcTime = (msec) => {
    const min = Math.floor(msec / 60000);
    const reutnMin = min < 10 ? `0${min}` : `${min}`;
    const sec = Math.floor((msec % 60000) / 1000).toFixed(0);
    const reutnSec = sec < 10 ? `0${sec}` : `${sec}`;
    return `${reutnMin} : ${reutnSec}`;
  };

  const calcPlayDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const reutnMin = min < 10 ? `0${min}` : `${min}`;
    const sec = Math.floor(seconds % 60).toFixed(0);
    const reutnSec = sec < 10 ? `0${sec}` : `${sec}`;
    return `${reutnMin} : ${reutnSec}`;
  };

  const changeProgress = () => {
    setSliderPer((currentTime / 30) * 100);
  };

  const whilePlaying = () => {
    audioProgress.current.value = audioPlayer.current.currentTime;
    updateCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const updateCurrentTime = () => {
    // console.log(audioProgress.current.value);
    audioProgress.current.style.setProperty(
      "time elapsed",
      `${(audioProgress.current.value / 30) * 100}%`
    );
    setCurrentTime(audioProgress.current.value);
  };

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = Volume / 100;
    }
  }, [Volume, isPlaying]);
  useEffect(() => {
    audioPlayer.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-0 lg:w-11/12 md:w-11/12 sm:w-full bg-slate-500 text-primary rounded-3xl text-white z-50 opacity-80 duration-1000 hover:opacity-100 items-center text-center mx-auto">
      <div className="flex flex-row items-center ">
        {/* Song Details */}
        <div className="left-0 w-1/3 flex flex-row items-center text-white">
          <div>
            <img
              src={songImage}
              // onError={(event) => (event.target.style.display = "none")}
              width={"70px"}
              className="rounded-full mx-5 text-white text-xs italic"
              alt="Search a Song to Play"
            />
          </div>
          <div className="flex flex-col text-center">
            <div className="lg:text-xl md:text-sm sm:text-xs text-white font-bold">
              {songName}
            </div>
            <div className="lg:text-md md:text-sm sm:text-xs text-white/70">
              {singerName}
            </div>
          </div>
        </div>

        {/* Music Controls */}
        <div className="w-full flex flex-grow flex-col">
          <audio
            src={audioSrc}
            preload="metadata"
            ref={audioPlayer}
            onVolumeChange={Volume / 100}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} // gets time passed
            // onLoadedData={(e)=> setDuration(e.currentTarget.duration)}    // gets song duration
          />
          {/* Player attributes - top */}
          <div className="playerCotrols flex items-center px-6 py-3 justify-center">
            {/* player controls */}
            <div className="flex items-center justify-center ">
              <motion.div
                className="previous hover:text-primaryTextWhite cursor-pointer mr-4 last:mr-0"
                whileTap={{ scale: 0.8 }}
                // onClick={() => updateSong("prev")}
              >
                <i className="">
                  <FaStepBackward />
                </i>
              </motion.div>
              <motion.div
                className="backward hover:text-primaryTextWhite cursor-pointer mr-4 last:mr-0"
                whileTap={{ scale: 0.8 }}
                // onClick={() =>
                // (audioPlayer.current.currentTime -= 5)
                // }
              >
                <i className="">
                  <FaBackward />
                </i>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="playPause mr-4 last:mr-0 bg-primaryTextWhite rounded-full p-2 cursor-pointer"
                // play/pause on spacebar press, needs fix
                // onKeyDown={(e) => {
                //   if (e.key === "E") {
                //     setIsPlaying(!isPlaying);
                //     !isPlaying
                //       ? audioPlayer.current.play()
                //       : audioPlayer.current.pause();
                //     songName !== ""
                //       ? (document.title = `Sortify | Playing ${songName}`)
                //       : (document.title = "Sortify");
                //   }
                // }}

                onClick={() => {
                  audioPlayer && !isPlaying
                    ? audioPlayer.current.play()
                    : audioPlayer.current.pause();
                  songName !== ""
                    ? (document.title = `Sortify | Playing ${songName}`)
                    : (document.title = "Sortify - Web Player");
                  setIsPlaying(!isPlaying);
                  whilePlaying();
                }}
              >
                <i>
                  {isPlaying ? (
                    <BsPauseFill className=" scale-150" />
                  ) : (
                    <BsFillPlayFill className=" scale-150" />
                  )}
                </i>
              </motion.div>
              <motion.div
                className="forward hover:text-primaryTextWhite cursor-pointer mr-4 last:mr-0"
                whileTap={{ scale: 0.8 }}
                // onClick={() =>
                // (audioPlayer.current.currentTime += 5)
                // }
              >
                <i className="">
                  <FaForward />
                </i>
              </motion.div>
              <motion.div
                className="next hover:text-primaryTextWhite cursor-pointer mr-4 last:mr-0"
                whileTap={{ scale: 0.8 }}
                // onClick={() => updateSong("next")}
              >
                <i className="">
                  <FaStepForward />
                </i>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="mr-3 last:mr-0 favourite text-primaryGreen cursor-pointer"
                // onClick={() => {
                // 	updateFav(song?.id);
                // }}
                onClick={() => setIsFavourite(!isFavourite)}
              >
                <i className="transition-all duration-300 ease-in-out">
                  {isFavourite ? (
                    <FaHeart className="drop-shadow-[0px_0px_8px_#39ff14] scale-125 " />
                  ) : (
                    <FaRegHeart onClick={() => {
                      // console.log(trackId)
                      // const dbRef = doc(db, 'users', `${localStorage.getItem('email')}`)
                      // setDoc(dbRef, {LikedSongs : trackId})
                    }} />
                  )}
                </i>
              </motion.div>
            </div>
          </div>

          {/* player range seeker */}
          <div className="playerSeeker flex items-center justify-center mb-4">
            <div className="currentTime text-primaryTextWhite text-[14px] font-semibold">
              {currentTime && !isNaN(currentTime)
                ? `${calcPlayDuration(currentTime)}`
                : "00 : 00"}
            </div>
            <input
              className="w-[80%] sm:w-[50%] relative h-[3px] mx-4  outline-none mr-3 appearance-none bg-white/80 shadow-xx rounded slider-thumb bg-gradient-to-r from-green-500 to-yellow-400 cursor-pointer"
              type="range"
              ref={audioProgress}
              defaultValue={0}
              onChange={changeProgress} 
              min='0'
              max='30'
              step={0.05}  
              onInput={(event) => setSeekTime(event.target.value)}
              value={currentTime}
            />
            
            <div className="duration text-primaryTextWhite text-[14px] font-semibold">
              {duration && !isNaN(duration)
                ? `00 : 30 (${calcTime(duration)})`
                : "00 : 00"}
            </div>
          </div>
        </div>

        <VolumeControl
          Volume={Volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
};

export { MusicPlayer };
