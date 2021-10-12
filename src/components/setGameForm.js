import React, {useState, useReducer , useContext, useEffect} from 'react'
import {GameContext} from '../context/context';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

   const initialState = {
    columns: "8",
    difficolty: "4",
    islands: null,
    rows: "8",
    shape: "rect",
    ships: "8"
  };


function SetGameForm(props) {
    const limitedSize = 20;
    
    const {setNewGameData ,startNewGameFun, totalSubmarines} = useContext(GameContext);
    const [formData, setFormData] = useReducer(formReducer, initialState);
    
    const [curretError, setErrors] = useState(true);    
    const [playNow, setTheGame] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [checkboxValue,setCheckboxValue] = useState(false);

    useEffect(() => {
      if(playNow)
      startNewGameFun(playNow);    
      if(formData.rows*formData.columns/2 < totalSubmarines){
        setErrors(true); 
      } 
  },[playNow ,curretError, totalSubmarines])

    const handleSubmit = (event) => {
      event.preventDefault();

      if((formData.rows*formData.columns/2) > totalSubmarines && formData.rows*formData.columns > formData.difficolty*formData.ships && formData.difficolty > 0 && formData.ships > 0) {
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
        }, 1000);
        }
    }

    const handleChangeOnInputs = event => {
      if (event.target.name === 'islands'){
        setCheckboxValue(!checkboxValue);
        setFormData({
          name: event.target.name,
          value: checkboxValue,
        });
      }
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
           <input disabled={!curretError} value={formData.rows} name="rows" onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Columns:</label>
           <input disabled={!curretError} value={formData.columns} name="columns"  onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Difficolty: </label>
           <input disabled={!curretError} value={formData.difficolty} name="difficolty" onChange={handleChangeOnInputs} type="number" max={limitedSize} />
           </div>
           <div className="form-group">
           <label>Ships: </label>
           <input disabled={!curretError} value={formData.ships} name="ships" onChange={handleChangeOnInputs} type="number" />         
           </div>
           <div className="selectShape">
             <span>Shape Board:</span>
          <label>
          <input disabled={!curretError} name="shape" value="rect" onChange={handleChangeOnInputs} type="radio"  required /> 
          <div className="markupOne"></div>
          </label>        
           <label>
           <input disabled={!curretError} name="shape" value="rhombus" onChange={handleChangeOnInputs} type="radio" required />
           <div className="markupTwo"></div>
           </label>         
           </div>
           <div className="form-group-checkbox">
           <input id="addIslands" disabled={!curretError} name="islands" type="checkbox" checked={checkboxValue} onChange={handleChangeOnInputs}  />
           <label htmlFor="addIslands">Adding islands </label>
           </div>
           {curretError ? <p className="errorsMessage">difficolty and ships count cannot be more than half of the board</p> : <p className="noErrors"></p>}
          {curretError 
             ? <button className="buttonStart" type="submit">BUILD GAME</button>
             : <button className="buttonStart" disabled={spinner} onClick={()=>setTheGame(!playNow)} type="button">{spinner ? <div className="loader"></div> : 'Play'}</button>
          }
           
        </form>
        </>
        
    )
}

export default SetGameForm;