export function playMusic(activeAudio, audio, fftSize, playBtn) {
  let dataArray;
  let audioContext;
  let audioSource;
  let analyzerMusic;
  const snail = document.querySelector("#snail");
  const c = document.querySelector(".canvas");
  const ctx = c.getContext("2d");

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

  const microfone = new Music(fftSize);
  let bars = [];
  let barWidth = c.width / (fftSize / 2);

  const createBars = () => {
    for (let i = 1; i < fftSize / 2; i++) {
      let color = "hsl(" + 100 + i * 2 + ",100%,50%)";
      bars.push(new Bar(0, i * 0.9, 1, 50, color, i));
    }
  };

  createBars();

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
      snail.style.transform = `translate(-50%, -50%) scale(${1 + softVolume},${
        1 + softVolume
      })`;
    }

    requestAnimationFrame(animate);
  };
  animate();
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (!activeAudio) {
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
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");

    audio.play();
    snail.style.visibility = "visible";

    // setButton("pause");
  } else {
    console.log(11);
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");

    audio.pause();
    snail.style.visibility = "hidden";
    // setButton("play");
  }
  return audio;
}
