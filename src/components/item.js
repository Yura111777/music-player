import axios from "axios";
import { useState, useEffect } from "react";

const Item = ({ name, classButton }) => {
  const [title, settitle] = useState(null);
  const [artist, setartist] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (ready) {
    const jsmediatags = window.jsmediatags;
    const song = new Audio();
    song.src = name;
    let getTags = function (audio) {
      jsmediatags.read(audio, {
        onSuccess: function (tag) {
          settitle(tag.tags.title);
          setartist(tag.tags.artist);
        },
        onError: function (error) {
          console.log(error);
        },
      });
    };
    getTags(song.src);
  }

  return (
    <div className="music-box audio-player">
      <div className="button controls">
        <div className="play-container">
          <div className={`toggle-play ${classButton}`}></div>
        </div>
      </div>
      <div className="info">
        <h2 className="info-title">{title}</h2>
        <h2 className="info-artist">{artist}</h2>
      </div>
    </div>
  );
};
export default Item;
