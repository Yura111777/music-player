import { useEffect, useRef, useState } from "react";
import Item from "./item";
import FolderInfo from "./playerBlock";

const Canvas = ({ src }) => {
  const canvas = useRef(null);
  const snailId = useRef(null);
  const file = useRef(null);
  const audio1 = useRef(null);
  const listItem = useRef(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [classButton, setButton] = useState("play");
  const audioPlayer = useRef(null);
  const playBtn = useRef(null);
  let audioContext;
  let audioSource;
  let analyzerMusic;
  useEffect(() => {
    const audio = new Audio(src[0]);
    console.dir(audio);

    audio.addEventListener(
      "loadeddata",
      () => {
        audioPlayer.current.querySelector(".time .length").textContent =
          getTimeCodeFromNum(audio.duration);
        audio.volume = 0.75;
      },
      false
    );

    //click on timeline to skip around
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

    //click volume slider to change volume
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

    //check audio percentage and update time accordingly
    setInterval(() => {
      const progressBar = audioPlayer.current.querySelector(".progress");
      progressBar.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
      audioPlayer.current.querySelector(".time .current").textContent =
        getTimeCodeFromNum(audio.currentTime);
    }, 500);

    //toggle between playing and pausing on button click
    let activeAudio = false;
    listItem.current.addEventListener(
      "click",
      () => {
        if (!activeAudio) {
          setActive(true);
          audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          audioSource = audioContext.createMediaElementSource(audio);
          analyzerMusic = audioContext.createAnalyser();
          audioSource.connect(analyzerMusic);
          analyzerMusic.connect(audioContext.destination);
          analyzerMusic.fftSize = fftSize;
          const bufferLength = analyzerMusic.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          microfone.playMusic();
          activeAudio = true;
        }

        if (audio.paused) {
          playBtn.current.classList.remove("play");
          playBtn.current.classList.add("pause");

          setButton("pause");
          audio.play();
          snail.style.visibility = "visible";
        } else {
          playBtn.current.classList.remove("pause");
          playBtn.current.classList.add("play");

          setButton("play");
          audio.pause();
          snail.style.visibility = "hidden";
        }
      },
      false
    );
    playBtn.current.addEventListener(
      "click",
      () => {
        if (!activeAudio) {
          setActive(true);
          audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          audioSource = audioContext.createMediaElementSource(audio);
          analyzerMusic = audioContext.createAnalyser();
          audioSource.connect(analyzerMusic);
          analyzerMusic.connect(audioContext.destination);
          analyzerMusic.fftSize = fftSize;
          const bufferLength = analyzerMusic.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          microfone.playMusic();
          activeAudio = true;
        }

        if (audio.paused) {
          playBtn.current.classList.remove("play");
          playBtn.current.classList.add("pause");
          audio.play();
          snail.style.visibility = "visible";
          setButton("pause");
        } else {
          playBtn.current.classList.remove("pause");
          playBtn.current.classList.add("play");
          audio.pause();
          snail.style.visibility = "hidden";
          setButton("play");
        }
      },
      false
    );

    audioPlayer.current
      .querySelector(".volume-button")
      .addEventListener("click", () => {
        const volumeEl = audioPlayer.current.querySelector(
          ".volume-container .volume"
        );
        audio.muted = !audio.muted;
        if (audio.muted) {
          volumeEl.classList.remove("icono-volumeMedium");
          volumeEl.classList.add("icono-volumeMute");
        } else {
          volumeEl.classList.add("icono-volumeMedium");
          volumeEl.classList.remove("icono-volumeMute");
        }
      });

    //turn 128 seconds into 2:08
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

    const c = canvas.current;
    const ctx = c.getContext("2d");
    const snail = snailId.current;

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    class Bar {
      constructor(x, y, width, height, color, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = index;
      }
      update(micinput) {
        const sound = micinput * 1000;
        if (sound > this.height) {
          this.height = sound;
        } else {
          this.height -= this.height * 0.03;
        }
      }
      draw(context, volume) {
        context.strokeStyle = this.color;
        context.lineWidth = 0.5;
        context.save();

        context.rotate(this.index * 0.043);
        context.beginPath();
        context.bezierCurveTo(
          this.x / 2,
          this.y / 2,
          this.height * -0.5 - 150,
          this.height + 50,
          this.x,
          this.y
        );

        context.moveTo(0, 0);
        context.lineTo(this.x, this.y + this.height);
        context.stroke();
        context.restore();
      }
    }

    class Music {
      constructor(fftSize) {
        this.init = false;
      }
      playMusic() {
        this.init = true;
      }
    }

    let fftSize = 512;
    const microfone = new Music(fftSize);
    let bars = [];
    let dataArray;
    let barWidth = c.width / (fftSize / 2);

    const createBars = () => {
      for (let i = 1; i < fftSize / 2; i++) {
        let color = "hsl(" + 100 + i * 2 + ",100%,50%)";
        bars.push(new Bar(0, i * 0.9, 1, 50, color, i));
      }
    };

    createBars();
    const audio1 = document.querySelector("#audio");

    const getSamples = () => {
      analyzerMusic.getByteTimeDomainData(dataArray);
      let normSamples = [...dataArray].map((e) => e / 128 - 1);
      return normSamples;
    };
    const getVolumes = () => {
      analyzerMusic.getByteTimeDomainData(dataArray);
      let normSamples = [...dataArray].map((e) => e / 128 - 1);
      let sum = 0;
      for (let i = 0; i < normSamples.length; i++) {
        sum += normSamples[i] * normSamples[i];
      }
      let volume = Math.sqrt(sum / normSamples.length);
      return volume;
    };
    let softVolume = 0;
    const animate = () => {
      if (microfone.init) {
        ctx.clearRect(0, 0, c.width, c.height);
        const samples = getSamples();
        const volume = getVolumes();
        ctx.save();
        ctx.translate(c.width / 2 - 70, c.height / 2 + 50);
        bars.forEach((bar, i) => {
          bar.update(samples[i]);
          bar.draw(ctx, 1);
        });

        ctx.restore();
        softVolume = softVolume * 0.9 + volume * 0.1;
        snail.style.opacity = 1;
        snail.style.transform = `translate(-50%, -50%) scale(${
          1 + softVolume
        },${1 + softVolume})`;
      }

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <audio ref={audio1} controls id="audio" type="audio/mp3" hidden></audio>
      <svg
        id="snail"
        ref={snailId}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496.07 269.85"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="red" />
            <stop offset="20%" stop-color="yellow" />
            <stop offset="40%" stop-color="green" />
            <stop offset="60%" stop-color="cyan" />
            <stop offset="80%" stop-color="blue" />
            <stop offset="100%" stop-color="magenta" />
          </linearGradient>
        </defs>
        <path
          className="cls-1"
          d="M416.48,101.23s-2.22-62.5,8.45-87.83c0,0-6.22-11.56,5.33-12.89,0,0,11.56,2.66,0,12.89,0,0-12.89,58.33,1.78,87.83,0,0,8-1.17,12.89,3.72,0,0,29.78-70.22,38.67-77.78,0,0-4-16,8.88-12.44,0,0,9.34,8-4.44,13.33,0,0-36,62.22-28.44,93.34,0,0,18.22,36.88-31.12,74.66s-25.27,54.22-12.19,59.56-14.92,19.55-36.69,11.11-34.67-10.22-62.67-5.78-39.11,2.22-63.11-3.11-23.56,7.56-44.45,7.56-43.55-4.45-56.89-10.67c0,0-19.11-2.22-41.33,6.67,0,0-25.33,0-43.11-9.34,0,0-15.56-1.78-29.33,6.22,0,0-30.23-.88-37.78-25.77,0,0-8.89-11.11,54.22-7.11,0,0,80-14.67,117.78-39.56s92.44-11.11,100.44-10.67S327.6,173,340,163.62s26.67-22.22,37.33-23.56S392.54,100.31,416.48,101.23Z"
        />
        <path
          className="cls-1"
          d="M432.63,157.45s-14.82,6.4-18.92,5.38-8.53-3.55-10,2.89,7.36,4.4,10.48,1.64,14.22-2.84,18.3.27"
        />
        <path
          className="cls-1"
          d="M456.72,164.49s15.1,1.78,19.3,5.41,7.73,8.15,11.57,3.66-1.76-7.57-7.4-6.83-18.74-6.83-19.43-10.62"
        />
        <path
          className="cls-1"
          d="M430.26,187s-4-15-29-3.86S368.93,221.62,343.6,235s-40.89,27.39-60.78,28"
        />
      </svg>
      <canvas className="canvas" ref={canvas}></canvas>
      <input ref={file} type="file" id="file" accept="audio/*" hidden />
      <div className="list-music  ">
        {src.map((el) => {
          return (
            <div key={el} className="list-item" ref={listItem}>
              <Item name={el} classButton={classButton} />
            </div>
          );
        })}
      </div>
      <div className="current-song" style={{ opacity: active ? 1 : 0 }}>
        <FolderInfo name={src[0]} active={active} />
        <div style={{ width: "50px", height: "50px" }}></div>
        <div ref={audioPlayer} className="audio-player">
          <div className="timeline">
            <div className="progress"></div>
          </div>
          <div className="controls">
            <div className="play-container">
              <div ref={playBtn} className="toggle-play play"></div>
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
        {/* <div className="play-container">
          <div ref={playBtn} className="toggle-play play"></div>
        </div> */}
      </div>
    </>
  );
};

export default Canvas;
