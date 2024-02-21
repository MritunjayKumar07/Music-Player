import React, { useState, useEffect } from "react";
import "./App.css";
import Playlist from "./components/Playlist";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("audioFiles")) || [];
    setFiles(storedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("audioFiles", JSON.stringify(files));
  }, [files]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([...files, file]);
    saveAudioFile([...files, file]);
  };

  const saveAudioFile = (files) => {
    localStorage.setItem("audioFiles", JSON.stringify(files));
  };

  const handleFileSelected = (file) => {
    const index = files.findIndex((f) => f === file);
    setCurrentFileIndex(index);
  };

  const handleFileEnded = () => {
    setCurrentFileIndex((prevIndex) => prevIndex + 1);
  };

  const currentFile = files[currentFileIndex];

  return (
    <div className="App">
      <div id="boxes">
        {currentFile && (
          <>
            <Playlist files={files} onFileSelected={handleFileSelected} />
            <AudioPlayer
              src={URL.createObjectURL(currentFile)}
              onEnded={handleFileEnded}
              playName={currentFile}
            />
          </>
        )}
        <div id="player03" className="player horizontal">
          <h3>Upload Files</h3>
          <div className="wrapper upload">
            <div className="drop_box">
              <header>
                <h4>Select File here</h4>
              </header>
              <p>Files Supported: MP3, MP4, M4A, WMA</p>
              <input
                type="file"
                hidden
                accept=".mp3,.mp4,.m4a,.wma"
                id="fileID"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="fileID" className="btn">
                Choose File
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
