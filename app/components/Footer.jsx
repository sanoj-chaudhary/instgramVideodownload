import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box py={4} textAlign="center" sx={{ background: "#1c1c2e" }}>
      <Typography variant="caption" sx={{ color: "#888" }}>
        © {new Date().getFullYear()} Instagram Reels Downloader • Not affiliated
        with Instagram
      </Typography>
    </Box>
  );
}
