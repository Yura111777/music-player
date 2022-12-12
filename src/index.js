import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";

const filterTracks = (state, old) => {
  state.songArray.push(old);

  const newSongArr = state.songArray.filter((el) => el[0].src !== old[0].src);

  if (newSongArr.length) {
    newSongArr.forEach((el) => {
      el[0].pause();
      el[0].currentTime = 0.1;
      el[1].classList.remove("pause");
      el[1].classList.add("play");
    });
  }
  console.log(newSongArr);
  if (state.songArray.length > 3) {
    state.songArray.splice(0, 1);
  }

  return state.songArray;
};
let initialState = {
  songArray: [],
  currentSong: [null, new Audio(), null],
  act: false,
};
const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SONG":
      return {
        ...state,
        songArray: filterTracks(state, action.payload),
      };
      break;
    case "ADD_PLAY":
      return {
        ...state,
        currentSong: action.payload,
      };
      break;
    case "ADD_ACT":
      return {
        ...state,
        act: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};

const store = createStore(songReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
