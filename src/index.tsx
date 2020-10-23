import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addSlide, createSlidesMaker, setBackground, setSelectedSlide, SlidesMaker} from "./model/SlidesMaker";
import {Colors} from "./model/types/Colors";
import {createPicture, Picture} from "./model/slide/slide_objects/picture/Picture";

let slidesMaker: SlidesMaker = createSlidesMaker();

const testBackgroundPicture: Picture = createPicture('https://media.discordapp.net/attachments/764231322415661076/766796858692599878/on6phJnOxPs.png');
const testBackgroundPicture2: Picture = createPicture("https://i.imgur.com/eob00g2.png");
const testBackgroundColor: Colors = Colors.BROWN;

slidesMaker = setBackground(slidesMaker, testBackgroundColor);
slidesMaker = addSlide(slidesMaker);
slidesMaker = setBackground(slidesMaker, testBackgroundPicture2);
slidesMaker = setSelectedSlide(slidesMaker, 1);

ReactDOM.render(
  <React.StrictMode>
    <App
         appModel={slidesMaker}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
