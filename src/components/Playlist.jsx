import React, { useEffect, useState } from "react";
import image from "../assert/music.png";

function Playlist({ files, onFileSelected, playName }) {
  const [selectedIndex, setSelectedIndex] = useState(
    localStorage.getItem("currentAudioFiles") || playName.name
  );

  useEffect(() => {
    localStorage.setItem("currentAudioFiles", selectedIndex);
  }, [selectedIndex]);

  return (
    <div id="player01" className="player">
      <h3 className="info" style={{ textAlign: "center" }}>
        <h1>Playlist</h1>
      </h3>
      <div className="wrapper">
        <ul className="list-group">
          {files.map((file, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedIndex(file.name);
                onFileSelected(file);
              }}
              style={{
                backgroundColor:
                  selectedIndex === file.name ? "#fff" : "transparent",
                color: selectedIndex === file.name ? "#000" : "#fff",
                padding: "5px",
                borderRadius: "8.5px",
              }}
            >
              <img
                src={image}
                alt="music icon"
                style={{ marginRight: "16px" }}
              />
              <h3>{file.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Playlist;
