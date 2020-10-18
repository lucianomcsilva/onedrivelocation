import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import 'babel-polyfill';

var reactApp = null; //instance to call in the Electron Menu
//import 'bootstrap/dist/css/bootstrap.css';


async function asyncTest () {
    let test = await myAsyncfunc();
    console.log(test);
}

async function myAsyncfunc () {
    return new Promise(resolve => {
        setTimeout(resolve("async/await now runs"), 1000);
    })
}

window.onload = () => {
    reactApp = ReactDOM.render(<App />, document.getElementById('app'));
    asyncTest();
    //prepareTags();
};

function prepareTags(){
  aTags = document.getElementsByTagName("a");
  for (var i = 0; i < aTags.length; i++) {
    aTags[i].setAttribute("onclick","require('shell').openExternal('" + aTags[i].href + "')");
    aTags[i].href = "#";
  }
  return false;
}