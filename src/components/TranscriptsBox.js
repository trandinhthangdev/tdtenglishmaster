import { Box, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { transcriptsById } from "../utils/constants";
import DictBox from "./DictBox";

const TranscriptsBox = ({ videoId }) => {
  const transcripts = transcriptsById[videoId].transcript
    .split("\n")
    .map((item) => item.split(/([^\w]+)/));
  const [dataDict, setDataDict] = useState(null);

  return (
    <>
      <Box
        id="transcriptsBox"
        sx={{
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          width: "320px",
          padding: "0 10px",
        }}
      >
        {transcripts.map((sentence) => {
          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {sentence.map((item) => {
                if (item.trim() === "") return <></>;
                return (
                  <Typography
                    component={"span"}
                    sx={{
                      margin: "0 2px",
                      cursor: "pointer",
                      "&:hover": {
                        // fontWeight: "bold",
                        color: "#508C9B",
                      },
                    }}
                    onClick={(event) => {
                      setDataDict({
                        el: event.currentTarget,
                        word: item.trim().toLowerCase(),
                      });
                    }}
                  >
                    {item}
                  </Typography>
                );
              })}
            </Box>
          );
        })}
      </Box>
      {dataDict && (
        <Popover
          open={true}
          anchorEl={dataDict.el}
          onClose={() => setDataDict(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPopover-paper": {
              borderRadius: "10px",
            },
          }}
          classes={{ paper: "MuiPopover-paper" }}
        >
          <DictBox word={dataDict.word} />
        </Popover>
      )}
    </>
  );
};

export default TranscriptsBox;
