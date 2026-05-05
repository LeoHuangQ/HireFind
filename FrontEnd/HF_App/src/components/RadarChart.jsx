import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Paper, Typography } from "@mui/material";

function RadarChartComponent({ scoreData, title = "Score Analysis" }) {
  // Transform the score data into radar chart format
  const transformData = (data) => {
    if (!data) return [];

    // Parse if it's a string
    let parsedData = data;
    if (typeof data === "string") {
      try {
        // Try to extract JSON from the string
        const jsonMatch = data.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          return [];
        }
      } catch (e) {
        console.error("Failed to parse data:", e);
        return [];
      }
    }

    // If it's already an array, use it directly
    if (Array.isArray(parsedData)) {
      return parsedData.map((item) => ({
        name: item.name || "Unknown",
        value: Math.min(Math.max(parseFloat(item.score || item.value || 0), 0), 100),
      }));
    }

    // If it's an object, convert to array format
    if (typeof parsedData === "object") {
      const chartArray = [];

      // Handle breakdown.skills array (for job matching)
      if (parsedData.breakdown?.skills && Array.isArray(parsedData.breakdown.skills)) {
        parsedData.breakdown.skills.forEach((skill) => {
          chartArray.push({
            name: skill.name || "Unknown Skill",
            value: Math.min(Math.max(parseFloat(skill.score || 0), 0), 100),
          });
        });
      }

      // Handle skills array (for resume parsing)
      if (parsedData.skills && Array.isArray(parsedData.skills)) {
        parsedData.skills.forEach((skill) => {
          chartArray.push({
            name: skill.name || "Unknown Skill",
            value: Math.min(Math.max(parseFloat(skill.score || 0), 0), 100),
          });
        });
      }

      // Add experience score
      if (parsedData.breakdown?.experience || parsedData.experience) {
        chartArray.push({
          name: "Experience",
          value: Math.min(Math.max(parseFloat(parsedData.breakdown?.experience || parsedData.experience || 0), 0), 100),
        });
      }

      // Add overall match score
      if (parsedData.match_score) {
        chartArray.push({
          name: "Overall Match",
          value: Math.min(Math.max(parseFloat(parsedData.match_score || 0), 0), 100),
        });
      }

      // If we found specific structured data, return it
      if (chartArray.length > 0) {
        return chartArray;
      }

      // Fallback: extract all numeric values
      return Object.entries(parsedData)
        .filter(([, value]) => typeof value === "number")
        .map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1"),
          value: Math.min(Math.max(value, 0), 100),
        }));
    }

    return [];
  };

  const chartData = transformData(scoreData);
  
  // Debug: log the transformed data
  console.log("Transformed chart data:", chartData);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f5f5f5", mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Box sx={{ width: "100%", minHeight: 400, position: "relative" }}>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip formatter={(value) => `${value.toFixed(1)}`} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default RadarChartComponent;
