import React from 'react'
import middle from '../assets/middle.svg';
import head from '../assets/head.svg';
import tail from '../assets/tail.svg';
import one from '../assets/one.svg';

import middleVertic from '../assets/middle-vertic.svg';
import headVertic from '../assets/head-vertic.svg';
import tailVertic from '../assets/tail-vertic.svg';
import oneVertic from '../assets/one-vertic.svg';

 function ImageOfSubmarine({data: {ImgSubmarine ,position}}) {

    const buildImageOfShip = (position) =>{
            if(position=== 'horiz'){
                return (<img className='horiz'
                src={ImgSubmarine === 'middle' ? middle : ImgSubmarine ==='head' ? head : ImgSubmarine ==='tail' ? tail : one }  alt={ImgSubmarine} />)
            }else {
                return (<img className='vertic'
                src={ImgSubmarine === 'middle' ? middleVertic : ImgSubmarine ==='head' ? headVertic : ImgSubmarine ==='tail' ? tailVertic : oneVertic }  alt={ImgSubmarine} />)
            }
    }
    return (
        <React.Fragment>
            {buildImageOfShip(position) }
            
        </React.Fragment>
    )
}

export default ImageOfSubmarine;