import "./App.css";
import "./scss/style.scss";
import React from "react";
import { useState } from "react";
import Canvas from "./components/canvas";

export const UserContext = React.createContext(null);

function App() {
  const [list, setList] = useState([`${process.env.PUBLIC_URL}/music/001.mp3`]);
  return (
    <div className="App">
      <Canvas src={list} />
    </div>
  );
}

export default App;
