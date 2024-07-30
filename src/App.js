import "./App.css";
import { useEffect, useState } from "react";
import init_data from "./data/data.json";
import { Box, Button, Typography } from "@mui/material";
import VideoDetail from "./components/VideoDetail";

function App() {
  const [data, setData] = useState(init_data);
  const [videoDetail, setVideoDetail] = useState(false);
  const [nbsPlayVideos, setNbsPlayVideos] = useState({});
  useEffect(() => {
    getNbsPlayVideos();
  }, []);

  const getNbsPlayVideos = () => {
    if (localStorage.getItem("playVideos")) {
      setNbsPlayVideos(JSON.parse(localStorage.getItem("playVideos")));
    }
  };
  console.log("nbsPlayVideos", nbsPlayVideos);
  return (
    <Box
      sx={{
        backgroundColor: "#2F3645",
        color: "#fff",
        // position: "relative",
      }}
    >
      {data.map((item) => {
        return (
          <Box
            sx={{
              padding: "10px",
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() => {
              setVideoDetail(item);
            }}
          >
            <Typography>{item.title}</Typography>
            {nbsPlayVideos[item.id] && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginLeft: "5px",
                }}
              >
                ({nbsPlayVideos[item.id].nbsPlayVideos}{" "}
                {nbsPlayVideos[item.id].nbsPlayVideos > 1 ? "plays" : "play"})
              </Typography>
            )}
          </Box>
        );
      })}
      {videoDetail && (
        <Box
          sx={{
            position: "fixed",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            backgroundColor: "#2F3645",
            zIndex: "999",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "50px",
            }}
          >
            <Button
              sx={{
                textTransform: "unset",
                color: "#fff",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
              onClick={() => {
                setVideoDetail(null);
                getNbsPlayVideos();
              }}
            >
              {"<<"} Back
            </Button>
            <Typography
              sx={{
                marginLeft: "10px",
              }}
            >
              {videoDetail.title}
            </Typography>{" "}
          </Box>
          <VideoDetail video={videoDetail} />
        </Box>
      )}
    </Box>
  );
}

export default App;
