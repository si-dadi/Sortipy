import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function SearchResults({
  searchTerm,
  fetchAlbums,
  fetchTracks,
  songName,
  setSongName,
  singerName,
  setSingerName,
  songImage,
  setSongImage,
  setAudioSrc,
  isPlaying,
  setIsPlaying,
  setSearchAudioErr,
  selected,
  setDuration,
  setTrackId,
  checkLikedSong,
}) {
  // console.log(fetchTracks);
  return (
    <div className="justify-center items-center overflow-auto flex flex-col m-auto w-10/12 z-0">
      <div className="text-white flex items-center text-3xl font-bold mt-5 mb-8">
        Search Results for " {searchTerm ? searchTerm : selected} "
      </div>

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
                  setIsPlaying(false)
                  setDuration(track.duration_ms);
                  setTrackId(track.id);
                  checkLikedSong(track.id);
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
  );
}

export default SearchResults;
