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
    if (file) {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, file];
        localStorage.setItem("audioFiles", JSON.stringify(updatedFiles));
        return updatedFiles;
      });
    }
  };

  const handleFileSelected = (file) => {
    const index = files.findIndex((f) => f === file);
    setCurrentFileIndex(index);
  };

  const handleFileEnded = () => {
    setCurrentFileIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < files.length ? nextIndex : 0;
    });
  };

  const handlePrevious = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : files.length - 1
    );
  };

  const handleNext = () => {
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
              src={URL.createObjectURL(currentFile)}
              onEnded={handleFileEnded}
              playName={currentFile}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
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
