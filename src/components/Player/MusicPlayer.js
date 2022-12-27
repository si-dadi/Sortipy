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

const MusicPlayer = ({ songName, singerName, songImage, audioSrc, isPlaying, setIsPlaying, searchAudioErr }) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [duration, serDuration] = useState(0); // total song duration
  const [currentTime, setCurrentTime] = useState(0); // current time: TODO: change to time left in the future
  const audioPlayer = useRef(); //audio ref
  const audioProgress = useRef(); //audio progress
  const animationRef = useRef();
  const [Volume, setVolume] = useState(40);
  // load song when play button clicked

  // load song when song is changed and reset on page refresh
  // useEffect(() => {
  // 	if (isPlaying) {
  // 		audioPlayer.current.play();
  // 		animationRef.current = requestAnimationFrame(whilePlaying);
  // 	} else {
  // 		audioPlayer.current.pause();
  // 		cancelAnimationFrame(animationRef.current);
  // 	}
  // }, [isPlaying, song]);

  // // player progress
  // useEffect(() => {
  // 	const seconds = Math.floor(audioPlayer.current.duration);
  // 	serDuration(seconds);
  // }, [
  // 	audioPlayer?.current?.loadedmetadata,
  // 	audioPlayer?.current?.readyState,
  // ]);

  const calcTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    // < 10 -> 09 or 11,12,13,...
    const reutnMin = min < 10 ? `0${min}` : `${min}`;

    const sec = Math.floor(seconds % 60);
    const reutnSec = sec < 10 ? `0${sec}` : `${sec}`;

    return `${reutnMin} : ${reutnSec}`;
  };

  const changeProgress = () => {};

  // const changeProgressVolume =(e)=>{
  // setVolume(e.target.value)
  // console.log(Volume)
  // if (Volume > 70) return <ImVolumeHigh />;
  // else if (Volume > 40) return <ImVolumeMedium />;
  // else if (Volume > 5) return <ImVolumeLow />;
  // else return <ImVolumeMute2 />;
  // }

  const whilePlaying = () => {
    audioProgress.current.value = audioPlayer.current.currentTime;
    updateCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const updateCurrentTime = () => {
    // console.log(audioProgress.current.value);
    audioProgress.current.style.setProperty(
      "--player-played",
      `${(audioProgress.current.value / duration) * 100}%`
    );
    setCurrentTime(audioProgress.current.value);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full bg-slate-500 text-primary rounded-3xl text-white z-50">
      <div className="flex flex-row">
        {/* Song Details */}
        <div className="left-0 w-1/3 px-5 mx-5 flex flex-row items-center text-white">
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
          <audio src={audioSrc} preload="metadata" ref={audioPlayer}/>
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
                className="playPause mr-4 last:mr-0  bg-primaryTextWhite rounded-full p-2 cursor-pointer"
                onClick={() => {
                  !isPlaying?(audioPlayer.current.play()):(audioPlayer.current.pause())
                  setIsPlaying(!isPlaying);
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
                    <FaRegHeart />
                  )}
                </i>
              </motion.div>
            </div>
          </div>

          {/* player range seeker */}
          <div className="playerSeeker flex items-center justify-center mb-4">
            <div className="currentTime text-primaryTextWhite text-[14px] font-semibold">
              {calcTime(currentTime)}
            </div>
            <input
              className="tracklist_range w-[80%] relative h-[5px] mx-4  outline-none rounded-[5px] mr-3 bg-primary appearance-none"
              type="range"
              ref={audioProgress}
              onChange={changeProgress}
            />
            <div className="currentTime text-primaryTextWhite text-[14px] font-semibold">
              {calcTime(currentTime)}
            </div>
            {/* <div className="duration text-primaryTextWhite text-[14px] font-semibold">
						{duration && !isNaN(duration)
							? calcTime(duration)
							: "00:00"}
					</div> */}
          </div>
        </div>

        {/* <VolumeIcon value={Volume}/> */}
        {/* <VolumeControl value={Volume} changeProgressVolume={changeProgressVolume}/> */}
        <VolumeControl
          value={Volume}
          onChange={(e) => setVolume(e.target.value)}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};

export { MusicPlayer };
