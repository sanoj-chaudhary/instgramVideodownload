"use client";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const download = (type) => {
    if (!url) return alert("Paste Instagram URL");
    if (!agree) return alert("Please accept the disclaimer");

    setLoading(true);

    const downloadUrl = `http://localhost:5000/api/download?url=${encodeURIComponent(
      url
    )}&type=${type}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setLoading(false), 4000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // dark gradient
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 450,
          maxWidth: "100%",
          borderRadius: 4,
          boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
          p: 3,
          backgroundColor: "#1c1c2e", // dark card background
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ color: "#ff6ec7" }} // vibrant accent
          >
            Instagram Reels Downloader
          </Typography>

          <Typography
            variant="body1"
            color="#ccc"
            textAlign="center"
            mb={4}
          >
            Download Instagram videos or audio instantly. Easy, fast, and free!
          </Typography>

          {/* URL Input */}
          <TextField
            fullWidth
            label="Instagram URL"
            placeholder="https://www.instagram.com/reel/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            sx={{
            //   mb: 3,
              "& .MuiInputLabel-root": { color: "#ff6ec7" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#ff6ec7" },
                "&.Mui-focused fieldset": { borderColor: "#ff6ec7" },
              },
              input: { color: "#fff" },
            }}
          />
{/* Consent */}
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                sx={{ color: "#ff6ec7" }}
              />
            }
            label={
              <Typography variant="caption" color="#ccc">
                I agree to download content only with permission
              </Typography>
            }
          />
          {/* Download Buttons */}
          <Stack spacing={2} mb={2}>
            <Button
              variant="contained"
              startIcon={<VideoLibraryIcon />}
              disabled={loading || !agree}
              onClick={() => download("video")}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 3,
                background:
                  "linear-gradient(90deg, #ff6ec7 0%, #7873f5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #7873f5 0%, #ff6ec7 100%)",
                },
              }}
            >
              Download Video (MP4)
            </Button>
<Button
  variant="contained" // change to contained
  startIcon={<MusicNoteIcon />}
  disabled={loading || !agree}
  onClick={() => download("audio")}
  sx={{
    py: 1.5,
    fontWeight: "bold",
    borderRadius: 3,
    background: "linear-gradient(90deg, #ff6ec7 0%, #7873f5 100%)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(90deg, #7873f5 0%, #ff6ec7 100%)",
    },
  }}
>
  Download Audio (MP3)
</Button>


          </Stack>

          {/* Loading */}
          {loading && (
            <Box mt={2} textAlign="center">
              <CircularProgress color="secondary" />
              <Typography variant="caption" display="block" mt={1} color="#ccc">
                Processing your request...
              </Typography>
            </Box>
          )}

          

          {/* Disclaimer */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              fontSize: "0.75rem",
              lineHeight: 1.6,
              color: "#888",
            }}
          >
            <strong>Disclaimer:</strong> This tool is for personal and educational
            use only. Users are responsible for ensuring they have the right to
            download and use any content. This application is not affiliated with
            Instagram or Meta.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
