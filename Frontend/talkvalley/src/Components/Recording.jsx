import React, { useState } from "react";
import RecordRTC from "recordrtc";
import { useRef } from "react";
import "../Styles/Recording.css";

function Recording() {
  const [recorder, setRecorder] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [webcamStream, setWebcamStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [count, setCount] = useState(1)
  const videoRef = useRef();

  const startRecording = async () => {
    const screen = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const webcam = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = webcam;
    const audio = await navigator.mediaDevices.getUserMedia({ audio: true });

    setScreenStream(screen);
    setWebcamStream(webcam);
    setAudioStream(audio);

    const combinedStream = new MediaStream([
      ...screen.getTracks(),
      ...webcam.getTracks(),
      ...audio.getTracks(),
    ]);

    const rec = new RecordRTC(combinedStream, {
      type: "video",
    });

    setRecorder(rec);
    rec.startRecording();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();

      const blobURL = URL.createObjectURL(blob);


      const downloadLink = document.createElement("a");
      downloadLink.href = blobURL;
      downloadLink.download = "recorded-video.webm";
      downloadLink.innerHTML = `<p>Download Recorded Video ${count}&nbsp;</p>`;
      downloadLink.style.color = 'white'
      document.getElementById('list').appendChild(downloadLink);

      setIsRecording(false);
    });
  

    screenStream.getTracks().forEach((track) => track.stop());
    webcamStream.getTracks().forEach((track) => track.stop());
    audioStream.getTracks().forEach((track) => track.stop());

    setScreenStream(null);
    setWebcamStream(null);
    setAudioStream(null);
    setRecorder(null);
    setCount(count+1);
  };

  return (
    <div className="recording">
      <div id="list"></div>
      <div className="webcam-box">
        <video ref={videoRef} autoPlay muted className="video" />
      </div>
      {!isRecording ? (
        <button className="start_btn" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button className="start_btn" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
}

export default Recording;
