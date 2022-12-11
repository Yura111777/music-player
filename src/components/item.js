import axios from "axios";
import { useState, useEffect, useRef, useContext, memo } from "react";
import { playMusic } from "../helpers/helper";
import { Music } from "../App";

const Item = memo(({ name, active }) => {
  const [title, settitle] = useState(null);
  const [artist, setartist] = useState(null);
  const [ready, setReady] = useState(false);
  const [currentActive, setCurrent] = active;
  const listItem = useRef(null);
  const [oldAud, setoldAud] = useContext(Music);

  useEffect(() => {
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

    let activeAudio = false;
    let activeAudioSecond = false;
    let status = false;

    listItem.current.addEventListener(
      "click",
      () => {
        if (!activeAudioSecond) {
          playMusic(false, song, 512, listItem.current);
          activeAudio = true;
          activeAudioSecond = true;
        } else {
          playMusic(true, song, 512, listItem.current);
        }
        setCurrent([!status, song, listItem.current]);
        setoldAud(song);
      },
      false
    );
  }, [name]);

  return (
    <div className="list-item">
      <div className="music-box audio-player">
        <div className="button controls">
          <div className="play-container">
            <div className="toggle-play play" ref={listItem}></div>
          </div>
        </div>
        <div className="info">
          <h2 className="info-title">{title}</h2>
          <h2 className="info-artist">{artist}</h2>
        </div>
      </div>
    </div>
  );
});
export default Item;
