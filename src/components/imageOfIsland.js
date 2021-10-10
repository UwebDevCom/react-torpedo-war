import React from 'react'
import islandicon from '../assets/islandicon.svg';


const buildImageOfIsland = () =>{
    return (<img style={{padding: '15%'}} className='islandImg'
        src={ islandicon}  alt="island" />)
    }

 function ImageOfIsland() {
    return (
        <React.Fragment>
        {buildImageOfIsland() }
        
    </React.Fragment>
    )
}

export default ImageOfIsland;