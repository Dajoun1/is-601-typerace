import React, { useState, useEffect } from 'react';

function App() {
  const buttonTextItems = ['Bears, beets, battlestar galactica', "What's Forrest Gump's Password? 1Forrest1", 'Where do programmers like to hang out? The Foo Bar'];
  
  const initialGameState = {
    victory: false,
    startTime: null,
    endTime: null
};
const [userText, setUserText] = useState('');
const [snippet, setSnippet] = useState('');
const [gameState, setGameState] = useState(initialGameState);
const [wins, setWins] = useState(null)
const updateUserText = (event) => {
  setUserText(event.target.value);

  
  if (event.target.value === snippet) {
    setGameState({
      ...gameState,
      endTime: new Date().getTime() - gameState.startTime 
    });
    
     }
      };
  const [hasError, setHasError] = useState(false);
  const [films, setFilms] = useState([]);

const chooseSnippet = (index) => { 
  setSnippet(buttonTextItems[index]);
setGameState({...gameState, startTime: new Date().getTime() });
}
useEffect(() => {
  if(gameState.victory) { 
    
  } 
  document.title = 'Victory!'; 
}, [gameState.victory]);
  
const fetchData = async () => {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films?limit=3");
    const filmsData = await response.json();
    
    setFilms(filmsData);
  } catch (err) {
     setHasError(true)
  }
}

useEffect(() => {
  fetchData();
}, []);

  return (
    <div>
      <h2>TypeRace</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <h4>{gameState.endTime !== null ?  `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
      <input onChange={updateUserText} value={userText}/>
      <hr />
      {buttonTextItems.map((textItem, index) => <button style={{ background: 'lightblue'}} onClick={() => chooseSnippet(index)}>{textItem}</button>)}
    </div>
  );
};
export default App;