import React, { useState ,useContext } from 'react'
import './gameResults.css';
import ImageOfSubmarine from './imageOfSubmarine';
import { GameContext } from '../context/context';

function GameResults() {
    
    const {resultsData} = useContext(GameContext);
    const [isShow, toggleResults] = useState(false);

    return (
        <div className="gameResultsWrapper">
            <button className="showResultsBtn" onClick={()=>toggleResults(!isShow)} >RESULTS</button>
        <div className={isShow ? "gameResultsContainer show" : "gameResultsContainer"}>
            <ul>
            {resultsData.map((item, i)=>{
               return (
                <li key={i + 'isItemSub'}>
                    <div className="d-flex row-big">
                    {item.data.map((sq, i)=>{
                        if(i === 0) {
                       return <React.Fragment key={i + 'isdataofitemsub'}>
                           {sq.data.map((item, i)=>{
                           return <ImageOfSubmarine key={ i + 'someimageforsub'} data={item}/>
                       })}
                       </React.Fragment>
                    }
                    })}
                    <span  className="strikesResultsContainer">{item.size+1} X 1</span>
                    </div>
                    <div>
                    {item.found > 0 ? <span className="strikeCount">{item.found}</span> :  0 } / {item.count}
                    </div>
                </li>
               )
            })
        }
            </ul>
        </div>
        </div>
    )
}

export default GameResults;