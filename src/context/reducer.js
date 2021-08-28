
const abc = [];

function generateData(cols, rows,shape) {
    const boardData = [];
    const isRhombus = shape === 'rhombus' ? true : false;
    console.log(shape)
    const isColsEven = (cols % 2) ? false : true ;
    const isRowsEven = (rows % 2) ? false : true ;

    let counterForRhombus = 0;
    const skippingSquare = cols-rows > 0 ? cols/rows: rows/cols;
    let createRhombusBoard = (u,i) =>{
        console.log(u,'u')
        let isSquareRhombusCols;
        let isSquareRhombusRows;
        if(isColsEven) {
            isSquareRhombusCols =  ((cols/2) === i || (cols/2)-1 === i)
        }else {
            isSquareRhombusCols = (Math.floor((cols/2)) === i)
        }

        if(isRowsEven) {
            isSquareRhombusRows =  ((rows/2) === u || (rows/2)-1 === u)
        }else {
            isSquareRhombusRows = (Math.floor((rows/2)) === u)
        }



        const rhombusFun = () =>{
            console.log(u)
            if(Math.floor((cols/2)) >= i){
            if(isColsEven && isRowsEven){
                if( (Math.floor((rows/2)) - Math.round(i*skippingSquare) -1 <= u && Math.floor((rows/2)) + Math.round(i*skippingSquare) >= u)) {
                    return true
                }
            }else if(isRowsEven){
                if( (Math.floor((rows/2)) - Math.round(i*skippingSquare) -1 <= u && Math.floor((rows/2)) + Math.round(i*skippingSquare) >= u)) {
                    return true
                }
            }else {
                if( (Math.floor((rows/2)) - i*skippingSquare  <= u && Math.floor((rows/2)) + i*skippingSquare >= u)) {
                    return true
                }
            }
        }
        else {
            if(isColsEven){
                if ( Math.round((i - Math.ceil((cols/2)))* skippingSquare)  <= u && rows - Math.round((i - Math.ceil((cols/2)))* skippingSquare)  > u ){
                    return true
                }
            }else if(cols/rows ===1){
                if ( Math.round((i - Math.ceil((cols/2)))* skippingSquare)  < u && rows-1 - Math.round((i - Math.ceil((cols/2)))* skippingSquare)  > u ){
                    return true
                }
        }else {
            if ( Math.round((i - Math.ceil((cols/2)))* skippingSquare) +Math.ceil(skippingSquare)  < u && rows - Math.ceil(skippingSquare+1) - Math.round((i - Math.ceil((cols/2)))* skippingSquare)  > u ){
                return true
            }
        }
        }
        }

        return isSquareRhombusCols || isSquareRhombusRows || rhombusFun()
        }
 
    for (let i = 0; i < cols; i++) {
        abc.push((i + 10).toString(36).toUpperCase());
        for (let u = 0; u < rows; u++) {
            boardData.push({ id: u + '-' + abc[i], x: u, y: abc[i], dirty: false, isPushed: false, r: isRhombus ? createRhombusBoard(u, i) : true })
        }        
    }
    return boardData;
}

function generateSubmarines(level, maxSize, data, boardSize) {

    let submarines = [];
    let dataBoard = [...data];

    function rotateShips(position) {
        if (position) {
            dataBoard.sort((a, b) => {
                if (a.x > b.x)
                    return 1
                else
                    return -1
            });
        }
        else {
            dataBoard.sort((a, b) => {
                if (a.y > b.y) {
                    return -1;
                } else {
                    return 1;
                }
            })
        }
    }

    while (submarines.length !== level) {

        let submarineSize = Math.ceil(Math.random() * maxSize);
        let randomSquare = Math.ceil(Math.random() * dataBoard.length) - 1;
        let position = '';
        let randoRotate = Math.round(Math.random());

        if (randoRotate) {
            position = 'vertic';
        } else {
            position = 'horiz';
        }

        rotateShips(randoRotate);
        if (position === 'vertic') {
            if ((0 < (abc.indexOf(dataBoard[randomSquare].y) + 2) - submarineSize)) {

                let submarineDataSquare = [];
                let slicedDataOfSubmarine = [...dataBoard].splice(randomSquare, submarineSize);
                let checkCol = slicedDataOfSubmarine[0].x;
                if (slicedDataOfSubmarine.filter(item => item.isPushed).length === 0 && slicedDataOfSubmarine.filter(item => item.x !== checkCol).length === 0 && !slicedDataOfSubmarine.some(item => !item.r)) {
                    if (position === 'vertic') slicedDataOfSubmarine.sort((a, b) => {
                        if (a.y < b.y) {
                            return -1;
                        } else {
                            return 1;
                        }
                    })
                    slicedDataOfSubmarine.forEach((item, i, arr) => {
                        if (arr.length > 1) {
                            switch (i) {
                                case 0:
                                    item.ImgSubmarine = 'tail'
                                    break;
                                case arr.length - 1:
                                    item.ImgSubmarine = 'head'
                                    break;
                                default:
                                    item.ImgSubmarine = 'middle'
                                    break;
                            }
                        } else {
                            item.ImgSubmarine = 'one';
                        }

                        item.isSubmarine = true;
                        item.isSubmarineFound = false;
                        item.position = position;
                        dataBoard.forEach((item, i) => {
                            if (randomSquare <= i && i < (submarineSize + randomSquare)) {
                                item.isPushed = true
                            }
                        });
                        submarineDataSquare.push(item);
                    });
                }
                if (submarineDataSquare.length > 0) {
                    console.log('ver')
                    submarines.push({ id: data[randomSquare].id + 'sub', position, size: submarineSize, data: submarineDataSquare });
                }
            }
        }
        else {
            if (boardSize - submarineSize >= dataBoard[randomSquare].x) {

                let submarineDataSquare = [];
                let slicedDataOfSubmarine = [...dataBoard].splice(randomSquare, submarineSize);
                if (slicedDataOfSubmarine.filter(item => item.isPushed).length === 0 && !slicedDataOfSubmarine.some(item => !item.r)) {
                    slicedDataOfSubmarine.forEach((item, i, arr) => {
                        if (arr.length > 1) {
                            switch (i) {
                                case 0:
                                    item.ImgSubmarine = 'tail'
                                    break;
                                case arr.length - 1:
                                    item.ImgSubmarine = 'head'
                                    break;
                                default:
                                    item.ImgSubmarine = 'middle'
                                    break;
                            }
                        } else {
                            item.ImgSubmarine = 'one';
                        }

                        item.isSubmarine = true;
                        item.isSubmarineFound = false;
                        item.position = position;
                        dataBoard.forEach((item, i) => {
                            if (randomSquare <= i && i < (submarineSize + randomSquare)) {
                                item.isPushed = true
                            }
                        });
                        submarineDataSquare.push(item);
                    });
                }
                if (submarineDataSquare.length > 0) {
                    console.log('hor')
                    submarines.push({ id: data[randomSquare].id + 'sub', position, size: submarineSize, data: submarineDataSquare });
                }
            }
        }
    }
    return submarines;
}

function totalSubmarinesFun(submarines) {
    let totalSubmarines = 0;
    submarines.map(item => {
        totalSubmarines = totalSubmarines + item.data.length
    });
    return totalSubmarines;
}

function getResults(submarines, level, action) {
    let results = [];

    for (let i = 0; i < level; i++) {
        let result = {};
        if (submarines) {
            let resultsBySize = submarines.filter((sub) => sub.size === i + 1);
            result.id = Math.random() * 100000;
            result.data = resultsBySize;
            result.count = resultsBySize.length;
            result.found = 0;
            result.size = i;
            if (action) {
                result.data.forEach((itm) => {
                    if (itm.data.some(it => !it.isSubmarineFound)) {
                    } else {
                        result.found = result.found + 1
                    }
                })
            }

            if (result.count !== 0) {
                results.push(result)
            }
        }

    }
    return results;
}


function gameReducer(state, action) {
    switch (action.type) {
        case 'SET':
            state.level = (+action.payload.difficolty);
            state.rows = (+action.payload.rows);
            state.cols = (+action.payload.columns);
            state.shape = action.payload.shape;
            state.numberOfShips = (+action.payload.ships);
            state.boardData = generateData(state.rows, state.cols, state.shape);
            state.submarines = generateSubmarines(state.numberOfShips, state.level, state.boardData, state.cols);
            state.totalSubmarines = totalSubmarinesFun(state.submarines);
            state.resultsData = getResults(state.submarines, state.level);

            return {
                ...state,
            }
        case 'START':

            return {
                ...state,
                startNewGame: action.payload
            }

        case 'RESULTS':

            return {
                ...state,
                resultsData: getResults(state.submarines, state.level, action.payload)
            }

        default:
            return state
    }
};



export { gameReducer };