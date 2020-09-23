import React from 'react';
import ReactDOM from 'react-dom';
import './application/styles/index.css';
import App from './application/components/App';
import * as serviceWorker from './serviceWorker';
import {BaseObject} from "./base/BaseObject";
import {Rect} from "./model/Rect";

let base = new BaseObject();
let rect = new Rect();

base._addHandler(rect.rectChangeEvent(), () => {
    console.log('Rect changed!');
});

rect.setWidth(120);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



serviceWorker.unregister();
