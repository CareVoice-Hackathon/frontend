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

  // Refs for visualizers and animation
  const recordingCanvasRef = useRef(null);
  const playbackCanvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Function to draw the live recording visualizer
  // Function to draw the live recording visualizer
const drawRecordingVisualizer = () => {
  const canvas = recordingCanvasRef.current;
  const analyser = analyserRef.current;
  if (!canvas || !analyser) return;
  // Remove the line below so that fftSize remains as set in startRecording
  // analyser.fftSize = 2048;
  
  const ctx = canvas.getContext("2d");
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const draw = () => {
    animationIdRef.current = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    // Clear canvas
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw waveform line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0; // normalize to roughly [0, 2]
      const y = (v * HEIGHT) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.stroke();
  };

  draw();
};

  // Function to draw the playback waveform
  const drawPlaybackWaveform = (audioBuffer) => {
    const canvas = playbackCanvasRef.current;
    if (!canvas || !audioBuffer) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const data = audioBuffer.getChannelData(0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.beginPath();
    const step = Math.ceil(data.length / width);
    const amp = height / 2;
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.moveTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }
    ctx.stroke();
  };

  // Start Recording
  const startRecording = async () => {
    if (!consentGiven) {
      alert("Please provide consent before recording.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Live visualizer
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;
    drawRecordingVisualizer();

    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      cancelAnimationFrame(animationIdRef.current);
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

  // When the audioURL is set, decode the audio and draw the waveform
  useEffect(() => {
    if(audioURL) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      fetch(audioURL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          drawPlaybackWaveform(audioBuffer);
        });
    }
  }, [audioURL]);

  return (
    <div className="w-[375px] h-[667px] rounded-3xl border border-gray-200 bg-zinc-50 p-4 text-gray-900 overflow-hidden flex flex-col">
      <div className="record-container">
        <div className="record-box">
          <label>Patient</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="Patient A">Patient A</option>
            <option value="Patient B">Patient B</option>
            <option value="Patient C">Patient C</option>
          </select>

          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
            />
            <label>I consent to my voice being recorded.</label>
          </div>

          <button
            onClick={recording ? stopRecording : startRecording}
            className={`record-button ${recording ? "recording" : ""}`}
          ></button>

          {/* Audio playback and waveform */}
          {audioURL && (
            <>
              <audio src={audioURL} controls className="audio-player"></audio>
              <canvas
                ref={playbackCanvasRef}
                width="220"
                height="80"
                className="playback-waveform"
              ></canvas>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Record;