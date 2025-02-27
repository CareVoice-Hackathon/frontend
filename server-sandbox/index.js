const express = require("express");
const app = express();

const PORT = 8080;

app.get("/patients", (req, res) => {
  const patients = [
    { id: 1, name: "Jae Kang", AHN: "xx-xx" },
    { id: 2, name: "Steven Au", AHN: "xx-xx" },
    { id: 3, name: "Maria Lopez", AHN: "xx-xx" },
  ];

  res.json(patients);
});

app.get("/patient/:patientId", (req, res) => {
  const mockDocuments = [
    { id: 1, type: "Transcription", createdTime: "2024-02-27 12:00:00" },
    { id: 2, type: "Summary", createdTime: "2024-02-27 12:30:00" },
    { id: 3, type: "HeadToToe", createdTime: "2024-02-27 13:00:00" },
    { id: 4, type: "DARP", createdTime: "2024-02-27 14:00:00" },
  ];
  res.json(mockDocuments);
});

app.get("/document/1", (req, res) => {
  res.json({
    patientId: 1,
    createdTime: "2024-02-27 12:00:00",
    type: "transcription",
    body: "This is a transcription text.",
  });
});

app.get("/document/2", (req, res) => {
  res.json({
    patientId: 1,
    createdTime: "2024-02-27 12:30:00",
    type: "summary",
    body: "This is a summary text.",
  });
});

app.get("/document/3", (req, res) => {
  res.json({
    patientId: 1,
    createdTime: "2024-02-27 13:00:00",
    type: "HeadToToe",
    body: {
      Neurological: "Normal",
      HEENT: "No abnormalities",
      Respiratory: "Clear breath sounds",
      Cardiac: "Regular heart rate and rhythm",
      Peripheral_Vascular: "No edema",
      Integumentary: "Intact skin",
      Musculoskeletal: "Full range of motion",
      Gastrointestinal: "Normal bowel sounds",
      Genitourinary: "No abnormalities",
      Sleep_Rest: "Adequate",
      Psychosocial: "No distress",
    },
  });
});

app.get("/document/4", (req, res) => {
  res.json({
    patientId: 1,
    createdTime: "2024-02-27 14:00:00",
    type: "DARP",
    body: {
      Data: "Patient reported pain",
      Action: "Administered medication",
      Response: "Pain relief observed",
      Plan: "Monitor pain levels",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
