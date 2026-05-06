import { useState, useEffect } from "react";
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
import uploadJob, { generateNewResume, getLastJobData, getLastMatchingResult } from "../api/jobApi.js";
import RadarChart from "../components/RadarChart.jsx";

function JobPage() {
  const [job, setJob] = useState("");
  const [jobScore, setJobScore] = useState("");
  const [newResume, setNewResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load last saved data on component mount
  useEffect(() => {
    const loadLastData = async () => {
      try {
        const [jobData, matchingResult] = await Promise.all([
          getLastJobData(),
          getLastMatchingResult()
        ]);
        
        if (jobData && jobData.job) {
          setJob(jobData.job);
        }
        
        if (matchingResult && Object.keys(matchingResult).length > 0) {
          setJobScore(matchingResult);
        }
      } catch (err) {
        console.error("Error loading last data:", err);
      }
    };

    loadLastData();
  }, []);

  const jobUpdateHandler = (e) => {
    setJob(e.target.value);
  };

  const clickJobHandler = async () => {
    if (job && job.trim() !== "") {
      setLoading(true);
      setError("");
      try {
        const result = await uploadJob(job);
        setJobScore(result);
      } catch (err) {
        setError("Failed to compare with job description. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please paste the job description before comparing.");
    }
  };

  const clearHandler = () => {
    setJob("");
    setJobScore("");
    setNewResume("");
    setError("");
  };

  const clickNewResumeHandler = async () => {
    if (job && job.trim() !== "") {
      setLoading(true);
      setError("");
      try {
        const result = await generateNewResume(job);
        // Parse JSON from the response if it's a string
        let parsedResult = result;
        if (typeof result === "string") {
          try {
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsedResult = JSON.parse(jsonMatch[0]);
            }
          } catch (e) {
            console.error("Failed to parse JSON:", e);
          }
        }
        setNewResume(parsedResult);
      } catch (err) {
        setError("Failed to generate new resume. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please paste the job description before generating resume.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Job Matching
      </Typography>

      <Box sx={{ display: "grid", gap: 3 }}>
        {/* Job Description Input Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            placeholder="Paste the job description here..."
            value={job}
            onChange={jobUpdateHandler}
            variant="outlined"
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={clickJobHandler}
              disabled={loading}
              sx={{ minWidth: "150px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Compare"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={clickNewResumeHandler}
              disabled={loading}
              sx={{ minWidth: "150px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate new resume"}
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

        {/* Matching Score Section */}
        {jobScore && (
          <>
            <RadarChart scoreData={jobScore} title="Job Matching Score" />
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6" gutterBottom>
                Raw Score Data
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={
                  typeof jobScore === "object"
                    ? JSON.stringify(jobScore, null, 2)
                    : jobScore
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
          </>
        )}

        {/* Generated Resume Section */}
        {newResume && (
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>
              Generated Resume
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Recommended Changes:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                value={
                  typeof newResume === "object" && newResume.resume
                    ? Array.isArray(newResume.resume)
                      ? newResume.resume.join("\n\n")
                      : newResume.resume
                    : typeof newResume === "string"
                    ? newResume
                    : ""
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
            </Box>

            {typeof newResume === "object" && newResume.highlights && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Highlights:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={
                    Array.isArray(newResume.highlights)
                      ? newResume.highlights.join("\n")
                      : newResume.highlights
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
              </Box>
            )}

            {typeof newResume === "object" && newResume.add_skill && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Skills to Add:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={
                    Array.isArray(newResume.add_skill)
                      ? newResume.add_skill.join("\n")
                      : newResume.add_skill
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
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default JobPage;
