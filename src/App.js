import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import StartTheGame from './components/startTheGame';
import BoradGame from './components/boradGame';
import { GameContext } from './context/context';

function App() {

  const { startNewGameFun, startNewGame } = useContext(GameContext);

  useEffect(() => {
    console.log('context', startNewGame)
  }, [startNewGame])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <section className="splashScreenContainer">
        <StartTheGame />
          {startNewGame ?
            ( <BoradGame />
            ) : ''
          }
          <div className="startingNow">
            </div>
        </section>
      </main>
    </div>
  );
}

export default App;
