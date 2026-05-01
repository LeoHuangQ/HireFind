import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import react from "react";

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 8, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 2 }}>
          Welcome to HireFind
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Analyze your resume and match it with job descriptions using AI-powered insights
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {/* Resume Analysis Card */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              transition: "transform 0.3s ease, boxShadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <AssignmentIcon
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h2" gutterBottom>
                Resume Analysis
              </Typography>
              <Typography color="textSecondary">
                Get detailed insights and scores for your resume. Improve your profile with AI-powered recommendations.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                component={RouterLink}
                to="/resume"
                variant="contained"
                color="primary"
                size="large"
              >
                Analyze Resume
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Job Matching Card */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              transition: "transform 0.3s ease, boxShadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <WorkIcon
                sx={{ fontSize: 60, color: "secondary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h2" gutterBottom>
                Job Matching
              </Typography>
              <Typography color="textSecondary">
                Compare your resume with job descriptions. Get matching scores to find the perfect fit.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                component={RouterLink}
                to="/job"
                variant="contained"
                color="secondary"
                size="large"
              >
                Match with Job
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Paper elevation={2} sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Key Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }}>
                ✓
              </Typography>
              <Typography variant="body2">
                AI-powered resume parsing and analysis
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }}>
                ✓
              </Typography>
              <Typography variant="body2">
                Instant matching scores with job descriptions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }}>
                ✓
              </Typography>
              <Typography variant="body2">
                Detailed insights and recommendations
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }}>
                ✓
              </Typography>
              <Typography variant="body2">
                Easy-to-use interface with MUI design
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Home;
