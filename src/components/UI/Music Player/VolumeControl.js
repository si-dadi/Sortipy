import React, { useState } from "react";
import {
  ImVolumeMute2,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeHigh,
} from "react-icons/im";

function VolumeControl({ Volume, onChange, setVolume }) {
  const [prevVol, setprevVol] = useState(0);

  return (
    <div className="relative m-auto w-1/5 items-center justify-center flex flex-row">
      {Volume <= 100 && Volume > 70 && (
        <ImVolumeHigh onClick={() => setVolume(0)} size={25} color="#FFF" />
      )}
      {Volume <= 70 && Volume > 40 && (
        <ImVolumeMedium onClick={() => setVolume(0)} size={25} color="#FFF" />
      )}
      {Volume <= 40 && Volume >= 10 && (
        <ImVolumeLow onClick={() => setVolume(0)} size={25} color="#FFF" />
      )}
      {Volume < 10 && (
        <ImVolumeMute2 onClick={() => setVolume(40)} size={25} color="#FFF" />
      )}
      <input
        className="volumeBar w-[40%] relative outline-none rounded-[5px] mr-3 bg-primary appearance-none -rotate-90 cursor-pointer"
        type="range"
        min={0}
        max={100}
        step={5}
        defaultValue={Volume}
        onChange={onChange}
      />
    </div>
  );
}

export default VolumeControl;
