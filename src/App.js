import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import StartTheGame from './components/startTheGame';
import GameResults from './components/gameResults';
import BoradGame from './components/boradGame';
import { GameContext } from './context/context';

function App() {

  const { startNewGame } = useContext(GameContext);

  useEffect(() => {
  }, [startNewGame])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <section className="splashScreenContainer">
        <StartTheGame />
          {startNewGame ?

            (<>
              <GameResults />
              <BoradGame />
            </>
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
