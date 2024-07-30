import { Box, Typography } from "@mui/material";
import YouTube from "react-youtube";
import TranscriptsBox from "./TranscriptsBox";
import { useEffect } from "react";

const VideoDetail = ({ video }) => {
  console.log("VideoDetail");
  useEffect(() => {
    // save video
    const videoId = video.id;
    const data = localStorage.getItem("playVideos")
      ? JSON.parse(localStorage.getItem("playVideos"))
      : {};
    if (
      !data[videoId]?.lastPlay ||
      (new Date() - new Date(data[videoId]?.lastPlay)) / 1000 > 1
    ) {
      data[videoId] = {
        nbsPlayVideos: (data[videoId]?.nbsPlayVideos ?? 0) + 1,
        lastPlay: new Date(),
      };
      localStorage.setItem("playVideos", JSON.stringify(data));
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          flex: 1,
          overflow: "hidden",
          "& > div": {
            height: "100%",
            width: "100%",
            "& iframe": {
              height: "100%",
              width: "100%",
            },
          },
        }}
      >
        <YouTube
          videoId={video.id}
          title={video.title}
          sx={{
            width: "100%",
          }}
          opts={{
            playerVars: {
              autoplay: 1,
              //   controls: 0,
              disablekb: 1,
            },
          }}
        />
      </Box>
      <TranscriptsBox videoId={video.id} />
    </Box>
  );
};

export default VideoDetail;
