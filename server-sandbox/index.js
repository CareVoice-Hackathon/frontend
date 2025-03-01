const express = require("express");
const app = express();

const PORT = 8000;

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
    { id: 1, type: "Transcript", createdTime: "2024-02-27 12:00:00" },
    { id: 2, type: "Summary", createdTime: "2024-02-27 12:30:00" },
    { id: 3, type: "HeadToToe", createdTime: "2024-02-27 13:00:00" },
    { id: 4, type: "DARP", createdTime: "2024-02-27 14:00:00" },
  ];
  res.json(mockDocuments);
});

app.get("/transcript/1", (req, res) => {
  res.json({
    patientName: "Loryn Sand",
    createdTime: "2024-02-27 12:00:00",
    body: "This is a transcript text.",
  });
});

app.get("/summary/:id", (req, res) => {
  res.json({
    patientName: "Jae",
    createdTime: "2024-02-27 12:30:00",
    body: "This is a summary text.",
  });
});

app.get("/head-to-toe/:id", (req, res) => {
  res.json({
    patientName: "Loryn Sand",
    createdTime: "2024-02-27 13:00:00",
    body: {
      neurological: "Normal",
      HEENT: "No abnormalities",
      respiratory: "Clear breath sounds",
      cardiac: "Regular heart rate and rhythm",
      peripheral_Vascular: "No edema",
      integumentary: "Intact skin",
      musculoskeletal: "Full range of motion",
      gastrointestinal: "Normal bowel sounds",
      genitourinary: "No abnormalities",
      sleep_Rest: "Adequate",
      psychosocial: "No distress",
    },
  });
});

app.get("/DARP/:id", (req, res) => {
  res.json({
    patientName: "Loryn Sand",
    createdTime: "2024-02-27 14:00:00",
    body: {
      data: "Patient reported pain",
      action: "Administered medication",
      response: "Pain relief observed",
      plan: "Monitor pain levels",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
