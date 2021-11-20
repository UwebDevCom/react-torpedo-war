import React from 'react'
import islandicon from '../assets/islandicon.svg';




 function ImageOfIsland({hideIsland}) {

    const buildImageOfIsland = () =>{
        return (!hideIsland ? <img style={{padding: '15%'}} className='islandImg'
            src={ islandicon}  alt="island" />: null)
        }

    return (
        <React.Fragment>
        {buildImageOfIsland() }
        
    </React.Fragment>
    )
}

export default ImageOfIsland;
