import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addSlide, createSlidesMaker, setBackground, setSelectedSlide, SlidesMaker} from "./model/SlidesMaker";
import {setSlideBackgroundColor, setSlideBackgroundPicture} from "./model/slide/Slide";
import {Colors} from "./model/types/Colors";
import {createPicture, Picture} from "./model/slide/slide_objects/picture/Picture";

let slidesMaker: SlidesMaker = createSlidesMaker();

const testBackgroundPicture: Picture = createPicture('https://sun9-59.userapi.com/c855736/v855736552/2ab80/5EcafNhcrDg.jpg');
const testBackgroundPicture2: Picture = createPicture('https://sun9-19.userapi.com/c850220/v850220293/e9ca4/_eAdwybvugU.jpg');
const testBackgroundColor: Colors = Colors.GREEN;

slidesMaker = setBackground(slidesMaker, testBackgroundPicture);
slidesMaker = addSlide(slidesMaker);
slidesMaker = setBackground(slidesMaker, testBackgroundColor);
slidesMaker = addSlide(slidesMaker);
slidesMaker = setBackground(slidesMaker, testBackgroundPicture2);
slidesMaker = setSelectedSlide(slidesMaker, 2);

ReactDOM.render(
  <React.StrictMode>
    <App appModel={slidesMaker} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
