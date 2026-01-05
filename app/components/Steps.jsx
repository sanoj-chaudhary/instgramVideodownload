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
        sx={{ color: "#ff6ec7", fontWeight: "bold" }}
      >
        How it Works
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch" // ensures all cards have equal height
      >
        {steps.map((s, i) => (
          <Grid
            item
            key={i}
            xs={12} // Full width on mobile
            sm={6}  // 2 per row on small screens
            md={4}  // 3 per row on medium screens
            display="flex" // Makes cards equal height
            justifyContent="center"
          >
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                width: "100%",
                backgroundColor: "#1c1c2e",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
              <Typography
                color="#ccc"
                mt={1}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                {s.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
