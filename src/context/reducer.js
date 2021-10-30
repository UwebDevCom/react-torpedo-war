
const abc = [];

function generateData(cols, rows, shape) {

    const boardData = [];
    const isRhombus = shape === 'rhombus' ? true : false;



    let createRhombusBoard = (u, i) => {

        const skippingSquare = cols - rows > 0 ? cols / rows : rows / cols;

        const middleCols = cols % 2 > 0 ? [Math.floor(cols / 2)] : [cols / 2, cols / 2 - 1];
        const middleRows = rows % 2 > 0 ? [Math.floor(rows / 2)] : [rows / 2, rows / 2 - 1];


        if (middleCols.includes(i)) {
            return true
        }

        if (middleRows.includes(u)) {

            return true
        }
        if (rows <= 4 || cols <= 4) {
            return false
        }

        const rhombusFun = () => {
            if (rows >= cols) {
                if (i < Math.floor(cols / 2) && (Math.ceil((rows / 2) - 1) - Math.round(i * skippingSquare) <= u && Math.floor((rows / 2)) + Math.round(i * skippingSquare) >= u)) {
                    return true;
                }
                if (i > Math.floor(cols / 2) && Math.ceil((rows / 2) - 1) - Math.round((cols - 1 - i) * skippingSquare) <= u && Math.floor((rows / 2)) + Math.round((cols - 1 - i) * skippingSquare) >= u) {
                    return true;
                }
            } else {
                if (u < Math.floor(rows / 2) && (Math.ceil((cols / 2) - 1) - Math.round(u * skippingSquare) <= i && Math.floor((cols / 2)) + Math.round(u * skippingSquare) >= i)) {
                    return true;
                }
                if (u > Math.floor(rows / 2) && Math.ceil((cols / 2) - 1) - Math.round((rows - 1 - u) * skippingSquare) <= i && Math.floor((cols / 2)) + Math.round((rows - 1 - u) * skippingSquare) >= i) {
                    return true;
                }
            }
        }
        return rhombusFun();
    }

    for (let i = 0; i < cols; i++) {
        abc.push((i + 10).toString(36).toUpperCase());
        for (let u = 0; u < rows; u++) {
            boardData.push({ id: u + '-' + abc[i], x: u, y: abc[i], dirty: false, isPushed: false, r: isRhombus ? createRhombusBoard(u, i) : true, islnd: false })
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
                        generageImgSub(arr, item, i);

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
                        generageImgSub(arr, item, i);

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

function getResults(submarines, level, action,data ,strikesCount) {
    strikesCount = data?.filter(item=>item.dirty);
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
    return {results,strikesCount };
}

function generageImgSub(arr, item, i) {
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
}

function createIslands(amountOfIsland, boardData, shouldBeIslands) {
    if (shouldBeIslands) {
        const totalSquaresForIslands = Math.ceil((amountOfIsland / 100) * boardData.map(item => item.r).length);
        return generateIslands(totalSquaresForIslands, boardData);
    }
}
function generateIslands(totalSquaresForIslands, boardData) {
    let islandsLocations = [];
    while (totalSquaresForIslands > islandsLocations.length) {
        let randomIslandLocation = Math.round(Math.random() * boardData.length);
        if (!boardData[randomIslandLocation].isPushed && boardData[randomIslandLocation].r) {
            boardData[randomIslandLocation].islnd = true;
            islandsLocations.push(boardData[randomIslandLocation])
        }
    }
    return islandsLocations
}


function fireSquareByForm(boardData, dataForm) {
    let squareHasFired = false;
    const showFireResults = document.querySelector('.showShotCordinates');

    boardData.map(squareData => {
        if (squareData.x === dataForm.xAxis && squareData.y === dataForm.yAxis && squareData.r) {
            if (squareData.isSubmarineFound) {
                squareHasFired = false;
            }
            else {
                squareData.isSubmarineFound = true;
                squareData.dirty = true;
                squareHasFired = true;
            }
        }
    });

    if (squareHasFired) {
        showFireResults.style.display = "block";
        setTimeout(() => {
            showFireResults.style.display = "none";
        }, 1000);
        return boardData
    }
    else
        alert('No matchs on board');

    return boardData;

}


function clearBoradfun({boardData}){
    document.querySelectorAll('.gameKey').forEach(el=>el.classList.remove('clicked') | el.classList.remove('isSub'));
    let cleanBoardData = boardData.map(item=>{
        item['dirty'] = false;
        item['isSubmarineFound'] = false
        return item
    });
    return cleanBoardData;
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
            state.resultsData = getResults(state.submarines, state.level).results;
            state.islands = createIslands(10, state.boardData, action.payload.islands);
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
                resultsData: getResults(state.submarines, state.level, action.payload,state.boardData,state.strikesCount).results,
                strikesCount: getResults(state.submarines, state.level, action.payload, state.boardData).strikesCount,
            }

        case 'FIRE':

            return {
                ...state,
                boardData: fireSquareByForm(state.boardData, action.payload),
                resultsData: getResults(state.submarines, state.level, action.payload, state.boardData).results,
                strikesCount: getResults(state.submarines, state.level, action.payload, state.boardData).strikesCount

            }

            case 'CLEAR':
            console.log('clearBoard')
                return {
                    ...state,
                    boardData: clearBoradfun(state),
                    resultsData: getResults(state.submarines, state.level, action.payload, state.boardData).results,
                    strikesCount: []
    
                }

        default:
            return state
    }
};



export { gameReducer };