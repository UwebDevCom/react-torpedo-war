import React, {useState, useReducer , useContext, useEffect} from 'react'
import {GameContext} from '../context/context';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

function SetGameForm(props) {
    const limitedSize = 20;
    const {setNewGameData ,startNewGameFun} = useContext(GameContext);

    const [formData, setFormData] = useReducer(formReducer, {});
    const [curretError, setErrors] = useState(true);
    
    const [playNow, setTheGame] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
      if(playNow)
      startNewGameFun(playNow);      

  },[playNow ,curretError])

    const handleSubmit = (event) => {
      event.preventDefault();
      if((formData.rows*formData.columns/2) > formData.difficolty*formData.ships) {
        setErrors(false);       
        buildGameData(false);
      }
      else {
        setErrors(true);
        event.target.querySelector('.errorsMessage').classList.add('errorsMessageBlink');
        setTimeout(()=>{
          event.target.querySelector('.errorsMessage').classList.remove('errorsMessageBlink');
        },1000)

      }
    }
    const buildGameData = (bol)=>{
      if(!bol){
        setSpinner(true);
          setTimeout(() => {
            setSpinner(false)
          setNewGameData({...formData});
          setErrors(false)
        }, 3000);
        }
    }

    const handleChangeOnInputs = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    }

    return (
        <> 
        <form onSubmit={handleSubmit}>
           <div className="form-group">
           <label>Rows:</label>
           <input name="rows" onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Columns:</label>
           <input name="columns"  onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Difficolty: </label>
           <input name="difficolty" onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Ships: </label>
           <input name="ships" onChange={handleChangeOnInputs} type="number" />
          
           </div>
           {curretError ? <p className="errorsMessage">difficolty and ships count cannot be more than half of the board</p> : <p className="noErrors"></p>}
          {curretError 
             ? <button className="buttonStart" type="submit" >BUILD GAME</button>
             : <button className="buttonStart" disabled={spinner} onClick={()=>setTheGame(!playNow)} type="button">{spinner ? <div class="loader"></div> : 'Play'}</button>
          }
           
        </form>
        </>
        
    )
}

export default SetGameForm;