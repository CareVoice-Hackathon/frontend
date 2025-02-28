import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import "./Record.css";



function Record(){
  const [selectedPatient, setSelectedPatient] = useState("Patient A");
  const [consentGiven, setConsentGiven] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // Start Recording
  const startRecording = async () => {
    if (!consentGiven) {
      alert("Please provide consent before recording.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      audioChunks.current = [];
      const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });

      // Convert to a URL for playback
      setAudioURL(URL.createObjectURL(audioBlob));

      // Upload to backend
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("patient", selectedPatient);

      await fetch("http://localhost:8080/transcript", {
        method: "POST",
        body: formData,
      });
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div className="record-container">
      <div className="record-box">
        <label>Patient</label>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="Patient A">Patient A</option>
          <option value="Patient B">Patient B</option>
          <option value="Patient C">Patient C</option>
        </select>
  
        <div className="checkbox-container">
          <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} />
          <label>Consent</label>
        </div>
  
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`record-button ${recording ? "recording" : ""}`}
        ></button>
  
        {audioURL && (
          <audio src={audioURL} controls className="audio-player"></audio>
        )}
      </div>
    </div>
  );  
};

export default Record;

