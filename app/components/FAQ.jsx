import { Box, Typography } from "@mui/material";

export default function FAQ() {
  return (
    <Box py={8} px={2} sx={{ background: "#0f0c29" }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ color: "#ff6ec7" }}
      >
        Frequently Asked Questions
      </Typography>

      <Box maxWidth={800} mx="auto">
        <Typography fontWeight={600} sx={{ color: "#ff6ec7", mb: 1 }}>
          Is this service free?
        </Typography>
        <Typography mb={3} sx={{ color: "#ccc" }}>
          Yes, this Instagram downloader is completely free.
        </Typography>

        <Typography fontWeight={600} sx={{ color: "#ff6ec7", mb: 1 }}>
          Does it support audio download?
        </Typography>
        <Typography mb={3} sx={{ color: "#ccc" }}>
          Yes, you can download both video (MP4) and audio (MP3).
        </Typography>

        <Typography fontWeight={600} sx={{ color: "#ff6ec7", mb: 1 }}>
          Is it safe to use?
        </Typography>
        <Typography sx={{ color: "#ccc" }}>
          We do not store user data. Downloads are processed on demand.
        </Typography>
      </Box>
    </Box>
  );
}
