/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQBn6v1CzZK1wgOlu7HXKsJ5wHX20ZiGEiggfZKX1v3iCoBvOtk8FZBQpPfnNF4YsNtFs3RIvNsYMigejZ21aszFGP6fyDMxwwlLc_1KKvlsWCYGTnrnotgG4zjIDZHxUhZ4q20FJt27ouIcYJQrEAm9rLaXS3Q_VL0DuKoG7LstrjyuV7OcSxzITBO-rIQ4q1smWKi7_bm-0gy-Lw';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}


const App = () => {

  const [text, setText] = useState('');
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [tracksNumber,setTracksNumber] = useState();
  const [tracksTitle, setTracksTitle] = useState();

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Reply received! This is what I received: ", data);
      setText("Hello");
      setSongsLoaded(true);
      setTracksNumber(data.items.length);
      setTracksTitle(data.items[0].track.name);
    })
  }, [])


  if(songsLoaded){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Name that Tune!</h1>
        </header>
        <div className="App-images">
          <p>You will have to change the code to run a real game!</p>
          <p>{text}</p>
          <p>Your playlist: {tracksNumber}</p>
          <p>You are listening to: {tracksTitle}</p>
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <img src ={loading}></img>
      </div>
    );
  }
};

export default App;
