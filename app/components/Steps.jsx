import { Box, Typography, Grid, Card } from "@mui/material";

const steps = [
  { title: "Copy Link", text: "Copy the Instagram reel or video URL" },
  { title: "Paste URL", text: "Paste the link into the input box" },
  { title: "Download", text: "Click download and save instantly" },
];

export default function Steps() {
  return (
    <Box py={8} px={2} sx={{ background: "#0f0c29" }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={5}
        sx={{ color: "#ff6ec7" }}
      >
        How it Works
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {steps.map((s, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                backgroundColor: "#1c1c2e",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#ff6ec7", fontWeight: "bold" }}
              >
                {s.title}
              </Typography>
              <Typography color="#ccc" mt={1}>
                {s.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
