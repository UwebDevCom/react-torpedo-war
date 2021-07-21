import React from 'react'
import middle from '../assets/middle.svg';
import head from '../assets/head.svg';
import tail from '../assets/tail.svg';
import one from '../assets/one.svg';
 function ImageOfSubmarine({data: {ImgSubmarine , isSubmarine}}) {

    return (
        <React.Fragment>
            <img src={ImgSubmarine === 'middle' ? middle : ImgSubmarine ==='head' ? head : ImgSubmarine ==='tail' ? tail : one }  alt={ImgSubmarine}/>
        </React.Fragment>
    )
}

export default ImageOfSubmarine;
// {`./${ImgSubmarine}.svg`}