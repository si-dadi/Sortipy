import React from "react";
import {FaHeart} from 'react-icons/fa'

function LikedSongs({ songImage, songName, singerName }) {
  return (
    <div className="items-center mx-auto overflow-y-auto">
      <div className="text-white justify-center items-center flex mt-20 my-5 text-2xl">
        Liked Songs
      </div>
      <div className="w-10/12 items-center text-white justify-center z-50 text-center flex flex-col my-5">
        <div className="left-0 px-4 w-1/3 flex flex-row items-center text-white shadow-slate-800 bg-black/90 rounded-3xl">
          <div className="items-center text-center w-1/5 left-0 relative">
            <img
              // src={songImage}
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*"
              width={"70px"}
              className="rounded-full mx-5 text-white text-xs italic"
              alt="Search a Song to Play"
            />
          </div>
          <div className=" w-1/4 px-2 mx-4 lg:text-xl md:text-sm sm:text-xs text-white font-bold items-center text-center">
            {/* {songName} */}
            Perfect
          </div>
          <div className="w-1/4 px-2 mx-4 lg:text-md md:text-sm sm:text-xs text-white/70 items-center text-center">
            {/* {singerName} */}
            Ed Sheeran
          </div>
          <div><FaHeart className="drop-shadow-[0px_0px_8px_#39ff14] fill-green-300 scale-125 right-0"/></div>
        </div>
      </div>
    </div>
  );
}

export default LikedSongs;
