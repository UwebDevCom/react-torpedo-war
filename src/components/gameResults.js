import React, { useEffect ,useContext, useState} from 'react'
import './gameResults.css';
import ImageOfSubmarine from './imageOfSubmarine';
import { GameContext} from '../context/context';

function GameResults({isShow}) {
    

    const {resultsData,boardData, strikesCount, cols, rows ,clearBoard,submarines ,gamesTableResults} = useContext(GameContext);
    const [foundsubCount, setCountSubs] = useState(0);
    useEffect(() => {
        setCountSubs(boardData.filter(item=>item['isSubmarineFound']).length); 
       console.log(gamesTableResults)
        return ()=>{
            console.log('clean up')
        }
    },[resultsData,strikesCount])
    
    return (
        <>
       {isShow ? <div className="gameResultsWrapper">
                <span className="gameResultsContainerTitle">RESULTS STATUS</span>
         <div className="gameResultsContainer">
             <div className="gameInfoContainer">
                <div className="hitsInfoContainer">
                <span className="countResults">{strikesCount ? strikesCount.length : 0}</span>
                <span className="titleResults">Square Hits</span>
                </div>
                <div className="hitsInfoContainer">
                <span className="countResults">{cols + ' X ' + rows}</span>
                <span className="titleResults">Board Size</span>
                </div>
                <div className="hitsInfoContainer">
                <span className="countResults">{foundsubCount}</span>
                <span className="titleResults">Ships Hits</span>
                </div>
                <div>
                <button onClick={clearBoard} className="clearBoard squareTargetBtn">Clear Board</button>
                </div>
             </div>
            {gamesTableResults && gamesTableResults.map((item,index)=>
            <div className="recordResult" key={Math.random()*1000+ index}>
                 <span>{item.boardSize}</span> <span>{item.strikesCount}</span> <span>{item.totalSubmarines}</span>
                 </div>
                 )};
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
        : null}
        </>
    )
}

export default GameResults;