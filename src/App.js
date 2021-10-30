import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import StartTheGame from './components/startTheGame';
import GameResults from './components/gameResults';
import BoradGame from './components/boradGame';
import { GameContext } from './context/context';
import HeaderMenu from './components/headerMenu';
import FindSquare from './components/findSquare';
function App() {

  const { startNewGame } = useContext(GameContext);
  const [isShow, toggleResults] = useState(false);
  
  useEffect(() => {
  // console.log('isShow',isShow)
  }, [startNewGame,isShow])

  return (
    <div className="App">
      <header className="App-header">
      {startNewGame ?  <HeaderMenu toggleResults={toggleResults} isShow={isShow} /> : null}
      </header>
      <main>
        <section className="splashScreenContainer">
        <StartTheGame />
          {startNewGame ?

            (<>
              <GameResults isShow={isShow} />
              <BoradGame />
              <FindSquare />
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
