import { useEffect, useRef, useState } from "react";
import Item from "./item";
import FolderInfo from "./playerBlock";
import { playMusic } from "../helpers/helper";
import { song } from "../helpers/helper";

const Canvas = () => {
  return (
    <>
      <svg
        id="snail"
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
      <canvas className="canvas"></canvas>
      <input type="file" id="file" accept="audio/*" hidden />
    </>
  );
};

export default Canvas;
