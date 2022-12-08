import { useState, useEffect } from "react";
const FolderInfo = ({ name, active }) => {
  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);
  const [title, settitle] = useState(null);
  const [artist, setartist] = useState(null);
  const [album, setalbum] = useState(null);
  const [genre, setgenre] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (ready) {
    if (active) {
      const jsmediatags = window.jsmediatags;
      const song = new Audio();
      song.src = name;
      let getTags = function (audio) {
        jsmediatags.read(audio, {
          onSuccess: function (tag) {
            setData(tag.tags.picture.data);
            setFormat(tag.tags.picture.format);
            let base64String = "";
            for (let i = 0; i < data?.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            document.querySelector(
              "#cover"
            ).src = `data:${format};base64,${window.btoa(base64String)}`;
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
      getTags(song.src);
    }
  }

  return (
    <div className="music-box audio-player">
      <div className="info">
        <img src="" id="cover" alt="" />
        <h2 className="info-title">{title}</h2>
        <h2 className="info-artist">{artist}</h2>
        <h2 className="info-album">{album}</h2>
        <h2 className="info-genre">{genre}</h2>
      </div>
    </div>
  );
};

export default FolderInfo;
