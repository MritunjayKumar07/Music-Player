import React, { useState, useEffect } from "react";
import "./App.css";
import Playlist from "./components/Playlist";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [files, setFiles] = useState(() => {
    const apiData = localStorage.getItem("audioFiles");
    if (apiData) {
      return JSON.parse(apiData);
    } else {
      return [];
    }
  });
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    const apiData = localStorage.getItem("audioFiles") || "[]";
    const storedFiles = JSON.parse(apiData);
    setFiles(storedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("audioFiles", JSON.stringify(files));
  }, [files]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileWithObjectURL = {
        name: file.name,
        type: file.type,
        size: file.size,
        objectURL: URL.createObjectURL(file),
      };
      setFiles((prevFiles) => [...prevFiles, fileWithObjectURL]);
    }
  };

  const handleFileSelected = (file) => {
    const index = files.findIndex((f) => f === file);
    setCurrentFileIndex(index);
  };

  const handleFileEnded = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex < files.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentFile = files[currentFileIndex];

  return (
    <div className="App">
      <div id="boxes">
        {currentFile && (
          <>
            <Playlist
              files={files}
              onFileSelected={handleFileSelected}
              playName={currentFile}
            />
            <AudioPlayer
              src={currentFile.objectURL}
              type={currentFile.type}
              name={currentFile.name}
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
              <p>Files Supported: MP3</p>
              <input
                type="file"
                hidden
                accept=".mp3"
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
