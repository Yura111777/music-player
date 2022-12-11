import axios from "axios";
import { useState, useEffect, useRef, memo } from "react";
import { playMusic } from "../helpers/helper";
import { connect } from "react-redux";

const Item = ({ name, add, setCurrent }) => {
  const [title, settitle] = useState(null);
  const [artist, setartist] = useState(null);
  const [ready, setReady] = useState(false);
  const listItem = useRef(null);

  useEffect(() => {
    const jsmediatags = window.jsmediatags;
    let song = new Audio();
    song.src = name;
    const snail = document.querySelector("#snail");
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

    let activeAudioSecond = false;
    let status = false;
    let aud;

    listItem.current.addEventListener(
      "click",
      () => {
        add([song, listItem.current]);
        setCurrent([!status, song, listItem.current]);

        if (!activeAudioSecond || song.currentTime === 0.1) {
          aud = playMusic(false, song, 512, listItem.current, song.currentTime);
          activeAudioSecond = true;
          song = aud;
          add([song, listItem.current]);
        } else {
          console.log("Act render");
          playMusic(true, song, 512, listItem.current);
        }
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
};
const mapStateToProps = (state) => {
  return {
    act: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (el) => dispatch({ type: "ADD_SONG", payload: el }),
    setCurrent: (el) => dispatch({ type: "ADD_PLAY", payload: el }),
    addAct: (el) => dispatch({ type: "ADD_ACT", payload: el }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
