import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
const FolderInfo = () => {
  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);
  const [title, settitle] = useState(null);
  const [artist, setartist] = useState(null);
  const [album, setalbum] = useState(null);
  const [genre, setgenre] = useState(null);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState(true);
  const audio1 = useRef(null);
  const audioPlayer = useRef(null);

  let audio = new Audio();
  const song = useSelector((state) => state.currentSong);
  // console.log(song[1].src);
  audio = song[1];
  let currentActive = song;
  useEffect(() => {
    // console.log(0);
    audio.addEventListener(
      "loadeddata",
      () => {
        audioPlayer.current.querySelector(".time .length").textContent =
          getTimeCodeFromNum(audio.duration);
        audio.volume = 0.75;
      },
      false
    );

    const timeline = audioPlayer.current.querySelector(".timeline");
    timeline.addEventListener(
      "click",
      (e) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek =
          (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
      },
      false
    );

    const volumeSlider = audioPlayer.current.querySelector(
      ".controls .volume-slider"
    );
    volumeSlider.addEventListener(
      "click",
      (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.current.querySelector(
          ".controls .volume-percentage"
        ).style.width = newVolume * 100 + "%";
      },
      false
    );

    const tree = setInterval(() => {
      const progressBar = audioPlayer.current.querySelector(".progress");
      progressBar.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
      audioPlayer.current.querySelector(".time .current").textContent =
        getTimeCodeFromNum(audio.currentTime);
      // console.log(progressBar.offsetWidth / 100 + "%");
      if (progressBar.offsetWidth / 100 + "%" > "3.48%") {
        let playBtn2 = document.querySelector(".toggle-play");
        playBtn2.classList.remove("pause");
        playBtn2.classList.add("play");
        clearInterval(tree);
      }
    }, 500);
    // console.log(111111);
    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    }

    const jsmediatags = window.jsmediatags;
    let getTags = async function (audio) {
      await jsmediatags.read(audio, {
        onSuccess: function (tag) {
          settitle(tag.tags.title);
          setartist(tag.tags.artist);
          setalbum(tag.tags.album);
          setgenre(tag.tags.genre);
        },
        onError: function (error) {
          console.log(error);
        },
      });
    };
    if (currentActive[0]) {
      getTags(currentActive[1].src);
    }
  }, [currentActive]);

  return (
    <div className="current-song" style={{ opacity: currentActive[0] ? 1 : 0 }}>
      <audio ref={audio1} controls id="audio" type="audio/mp3" hidden></audio>
      <div className="music-box audio-player">
        <div className="info">
          <h2 className="info-title">{title}</h2>
          <h2 className="info-artist">{artist}</h2>
          <h2 className="info-album">{album}</h2>
          <h2 className="info-genre">{genre}</h2>
        </div>
      </div>
      <div style={{ width: "50px", height: "50px" }}></div>
      <div ref={audioPlayer} className="audio-player">
        <div className="timeline">
          <div className="progress"></div>
        </div>
        <div className="controls">
          <div className="play-container">
            <div className="icono-caretLeftSquare"></div>
            <div className="icono-caretRightSquare"></div>
          </div>
          <div className="time">
            <div className="current">0:00</div>
            <div className="divider">/</div>
            <div className="length"></div>
          </div>
          <div className="name">Music Song</div>
          {/* <!--     credit for icon to https://saeedalipoor.github.io/icono/ --> */}
          <div className="volume-container">
            <div className="volume-button">
              <div className="volume icono-volumeMedium"></div>
            </div>

            <div className="volume-slider">
              <div className="volume-percentage"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderInfo;
