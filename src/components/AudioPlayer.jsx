import React, { useEffect, useState } from "react";
import image from "../assert/music.png";

function AudioPlayer({ name}) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const apiData = localStorage.getItem("audioFiles");
    if (apiData) {
      const allFiles = JSON.parse(apiData);
      const selectedFile = allFiles.find(
        (item) =>
          item.name === name || localStorage.getItem("currentAudioFiles")
      );
      setFile(selectedFile);
    }
  }, [name]);

  const Audio = () => {
    if (!file || !file.objectURL) {
      return null;
    }

    return (
      <audio controls autoPlay>
        <source src={file.objectURL} type={file.type} />
      </audio>
    );
  };

  const AudioName = () => {
    if (!file || !file.objectURL) {
      return null;
    }

    return <h3>{localStorage.getItem("currentAudioFiles")}</h3>;
  };

  return (
    <div id="player02" className="player horizontal">
      <div className="wrapper">
        <div className="info-wrapper">
          <img src={image} alt="music icon" style={{ marginRight: "16px" }} />
          <div className="info">
            <AudioName />
          </div>
        </div>
        <div className="track-time">{file ? <Audio /> : null};</div>
      </div>
    </div>
  );
}

export default AudioPlayer;
