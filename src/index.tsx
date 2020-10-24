import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    addObjectOnSelectedSlide,
    addSlide,
    createSlidesMaker,
    setBackground,
    setSelectedSlide,
    SlidesMaker
} from "./model/SlidesMaker";
import {Colors} from "./model/types/Colors";
import {createPicture, Picture} from "./model/slide/slide_objects/picture/Picture";
import {createTextBox} from "./model/slide/slide_objects/textbox/TextBox";
import {createRect} from "./model/types/Rect";
import {createParagraph} from "./model/types/Paragraph";
import {Alignment} from "./model/types/Alignment";
import {createFont} from "./model/types/Font";

let slidesMaker: SlidesMaker = createSlidesMaker();

const testBackgroundPicture2: Picture = createPicture("https://i.imgur.com/eob00g2.png");
const testBackgroundColor: Colors = Colors.BROWN;

slidesMaker = setBackground(slidesMaker, testBackgroundColor);
slidesMaker = addSlide(slidesMaker);
slidesMaker = setBackground(slidesMaker, testBackgroundPicture2);
slidesMaker = setSelectedSlide(slidesMaker, 1);

slidesMaker = addObjectOnSelectedSlide(slidesMaker, createTextBox(
        createRect(100, 234, 100, 20),
        createParagraph(),
        createFont('Arial', 12)
    ));

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
