const keys = ['x', 'o'];

var match = [];
var jogadas = [];
var playerCircle = [];
var playerX = [];

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function victory(combinations, playerCircle, playerX) {

    var winner = 'empate';
    var bool = false;
    var i = 0;

    while (i < combinations.length) {

        var equalCircle = coletaIguais(combinations[i], playerCircle);
        var equalX = coletaIguais(combinations[i], playerX);

        if (equalCircle.length == 3) {
            winner = "Circle";
            bool = true;
            break;
        } else if (equalX.length == 3) {
            winner = "X"
            bool = false;
            break;

        } else {
            winner = "empate";
        }

        i++;
    }

    if(winner != "empate"){
        alert(`${winner} Venceu.`);
        return bool;
    } else {
        return bool;
    }
    
}



function coletaIguais(arr1, arr2) {
    var arrAux = [];

    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                arrAux.push(arr1[i]);
            }
        }
    }

    return arrAux;
}

const areaMove = document.querySelectorAll('.block');

function addClass(container) {
    container.classList.add('active');
}

function clearBoard(board){
    board.forEach( (element )=>{
        element.removeChild(element.firstChild);
    })
}

function addMove(el) {
    el.forEach((element, index) => {

        element.addEventListener('click', () => {
            addClass(element);
            game(match, index, keys, jogadas, playerCircle, playerX);
            
            if(element.childElementCount < 1){
                createTextMove(element, keys, match);
            }
            
            victory(combinations, playerCircle, playerX);

            if(victory(combinations, playerCircle, playerX)){
                document.location.reload(1);
            }
        })
    });
}

addMove(areaMove);

function game(arr, index, key, jogadas, playerCircle, playerX) {

    if (arr.length % 2 == 0) {
        arr.push(key[0]);
        playerCircle.push(index);
    } else {
        arr.push(key[1]);
        playerX.push(index);
    }

    if (arr.length == 9) {
        jogadas.push(playerCircle);
        jogadas.push(playerX);
    }

}


function createTextMove(element, keys, arr) {
    var p = document.createElement('p');

    if (arr.length % 2 == 0) {
        var txtP = document.createTextNode(keys[0]);
    } else {
        var txtP = document.createTextNode(keys[1]);
    }

    p.appendChild(txtP);
    element.appendChild(p)
}

