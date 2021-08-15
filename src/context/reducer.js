
const abc = [];

function generateData(cols, rows) {
    const boardData = [];
    for (let i = 0; i < cols; i++) {
        abc.push((i+10).toString(36).toUpperCase());
        for (let u = 0; u < rows; u++) {
            boardData.push({ id: u + '-' + abc[i], x: u, y: abc[i], dirty: false, isPushed:false })
        }
    }
    return boardData;
}

function generateSubmarines(level, maxSize, data, boardSize) {

    let submarines = [];
    let dataBoard = [...data];
    
    function rotateShips(position){
        if(position) {
            dataBoard.sort((a,b)=>{
                if (a.x > b.x )
                return  1
                else 
                return -1
            });
        }
        else {            
            dataBoard.sort((a,b)=>{
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
        
        if(randoRotate){
            position = 'vertic';
        } else{
            position = 'horiz';
        }
        
        rotateShips(randoRotate);
        

        if (position === 'vertic'){
            if ((0 < (abc.indexOf(dataBoard[randomSquare].y)+2) - submarineSize)) {

                let submarineDataSquare = [];
                let slicedDataOfSubmarine = [...dataBoard].splice(randomSquare, submarineSize);
                let checkCol = slicedDataOfSubmarine[0].x;
                if (slicedDataOfSubmarine.filter(item=>item.isPushed).length === 0 && slicedDataOfSubmarine.filter(item=>item.x !== checkCol).length === 0) {
                   if(position === 'vertic') slicedDataOfSubmarine.sort((a,b)=>{
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
                        dataBoard.forEach((item,i)=>{
                            if(randomSquare <= i  &&  i < (submarineSize + randomSquare)) {
                                item.isPushed = true
                            }
                        }); 
                        submarineDataSquare.push(item);
                    });
                }
                if (submarineDataSquare.length > 0) {
                    submarines.push({ id: data[randomSquare].id + 'sub', position, size: submarineSize, data: submarineDataSquare });
                }
            }
        }else {
         if (boardSize - submarineSize >= dataBoard[randomSquare].x) {
            
            let submarineDataSquare = [];
            let slicedDataOfSubmarine = [...dataBoard].splice(randomSquare, submarineSize);
            if (slicedDataOfSubmarine.filter(item=>item.isPushed).length === 0) {
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
                    dataBoard.forEach((item,i)=>{
                        if(randomSquare <= i  &&  i < (submarineSize + randomSquare)) {
                            item.isPushed = true
                        }
                    }); 
                    submarineDataSquare.push(item);
                });
            }
            if (submarineDataSquare.length > 0) {
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

function getResults(submarines, level , action) {
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
            if(action){
                    result.data.forEach((itm)=>{
                        if(itm.data.some(it=>!it.isSubmarineFound)){
                        }else 
                        {
                            result.found = result.found +1
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
            state.numberOfShips = (+action.payload.ships);
            state.boardData = generateData(state.rows, state.cols);
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
                resultsData: getResults(state.submarines, state.level , action.payload)
            }

        default:
            return state
    }
};



export { gameReducer };