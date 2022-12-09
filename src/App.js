import "./App.css";
import "./scss/style.scss";
import React from "react";
import { useState, useRef } from "react";
import Canvas from "./components/canvas";
import Item from "./components/item";
import FolderInfo from "./components/playerBlock";

function App() {
  const [list, setList] = useState([`${process.env.PUBLIC_URL}/music/001.mp3`]);
  const [currentActive, setCurrent] = useState(false);
  return (
    <div className="App">
      <Canvas src={list} currentActive={currentActive} />
      <div className="list-music  ">
        {list.map((el) => {
          return (
            <Item key={el} name={el} active={[currentActive, setCurrent]} />
          );
        })}
      </div>
      <FolderInfo currentActive={currentActive} />
    </div>
  );
}

export default App;
