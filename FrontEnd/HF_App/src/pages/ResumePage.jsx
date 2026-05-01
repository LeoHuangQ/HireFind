import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import uploadResume from "../api/resumeApi.js";

function ResumePage() {
  const [resume, setResume] = useState("");
  const [resumeScore, setResumeScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resumeUpdateHandler = (e) => {
    setResume(e.target.value);
  };

  const clickResumeHandler = async () => {
    if (resume && resume.trim() !== "") {
      setLoading(true);
      setError("");
      try {
        const result = await uploadResume(resume);
        setResumeScore(result);
      } catch (err) {
        setError("Failed to analyze resume. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please paste your resume before analyzing.");
    }
  };

  const clearHandler = () => {
    setResume("");
    setResumeScore("");
    setError("");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Resume Analysis
      </Typography>

      <Box sx={{ display: "grid", gap: 3 }}>
        {/* Resume Input Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload Your Resume
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            placeholder="Paste your resume content here..."
            value={resume}
            onChange={resumeUpdateHandler}
            variant="outlined"
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={clickResumeHandler}
              disabled={loading}
              sx={{ minWidth: "150px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearHandler}
              disabled={loading}
            >
              Clear
            </Button>
          </Box>
        </Paper>

        {/* Error Message */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Resume Score Section */}
        {resumeScore && (
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>
              Resume Score
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={
                typeof resumeScore === "object"
                  ? JSON.stringify(resumeScore, null, 2)
                  : resumeScore
              }
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            />
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default ResumePage;
