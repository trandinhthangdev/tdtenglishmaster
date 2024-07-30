import { Box, Typography } from "@mui/material";
import { dictionaries } from "../utils/constants";
import { useEffect } from "react";
const DictBox = ({ word }) => {
  const dict_html = dictionaries[word];

  useEffect(() => {
    // save word
    const data = localStorage.getItem("wordsLookup")
      ? JSON.parse(localStorage.getItem("wordsLookup"))
      : {};
    if (
      !data[word]?.lastLookup ||
      (new Date() - new Date(data[word]?.lastLookup)) / 1000 > 1
    ) {
      data[word] = {
        nbOfLookups: (data[word]?.nbOfLookups ?? 0) + 1,
        lastLookup: new Date(),
      };
      localStorage.setItem("wordsLookup", JSON.stringify(data));
    }
  }, []);
  return (
    <Box
      sx={{
        maxWidth: "360px",
        maxHeight: "480px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "10px",
          height: "40px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {word} ({dict_html.frequency})
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "10px",
          height: "calc(100% - 40px)",
          overflowY: "auto",
          fontSize: "14px",
        }}
      >
        <Box
          dangerouslySetInnerHTML={{
            __html: dict_html.html,
          }}
        ></Box>
      </Box>
    </Box>
  );
};
export default DictBox;
