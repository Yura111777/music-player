import "./App.css";
import "./scss/style.scss";
import React from "react";
import { useState } from "react";
import Canvas from "./components/canvas";
import Item from "./components/item";
import FolderInfo from "./components/playerBlock";

function App({ songArray }) {
  const [list, setList] = useState([
    `${process.env.PUBLIC_URL}/music/001.mp3`,
    `${process.env.PUBLIC_URL}/music/2.mp3`,
    `${process.env.PUBLIC_URL}/music/3.mp3`,
    `${process.env.PUBLIC_URL}/music/4.mp3`,
    `${process.env.PUBLIC_URL}/music/5.mp3`,
    `${process.env.PUBLIC_URL}/music/6.mp3`,
    `${process.env.PUBLIC_URL}/music/7.mp3`,
    `${process.env.PUBLIC_URL}/music/8.mp3`,
    `${process.env.PUBLIC_URL}/music/9.mp3`,
    `${process.env.PUBLIC_URL}/music/10.mp3`,
    `${process.env.PUBLIC_URL}/music/11.mp3`,
    `${process.env.PUBLIC_URL}/music/12.mp3`,
    `${process.env.PUBLIC_URL}/music/13.mp3`,
    `${process.env.PUBLIC_URL}/music/14.mp3`,
    `${process.env.PUBLIC_URL}/music/15.mp3`,
    `${process.env.PUBLIC_URL}/music/16.mp3`,
    `${process.env.PUBLIC_URL}/music/17.mp3`,
    `${process.env.PUBLIC_URL}/music/18.mp3`,
    `${process.env.PUBLIC_URL}/music/19.mp3`,
    `${process.env.PUBLIC_URL}/music/20.mp3`,
  ]);
  const [currentActive, setCurrent] = useState(false);
  return (
    <div className="App">
      <audio controls id="audio" type="audio/mp3" hidden></audio>

      <Canvas src={list} currentActive={currentActive} />

      <div className="list-music  ">
        {list.map((el) => {
          return <Item key={el} name={el} />;
        })}
      </div>

      <FolderInfo currentActive={currentActive} />
    </div>
  );
}

export default App;
