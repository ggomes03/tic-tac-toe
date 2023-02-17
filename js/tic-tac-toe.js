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
    var win = {
        "winner": "empty",
        "haveWinner": false
    };
    var i = 0;

    while (i < combinations.length) { //Compara se o tamanho de cada comparação é igual a 3, se for ele retorna um vencedor.

        var equalCircle = coletaIguais(combinations[i], playerCircle);
        var equalX = coletaIguais(combinations[i], playerX);

        if (equalCircle.length == 3) {
            winner = "Circle";
            win.winner = winner;
            win.haveWinner = true;
            break;
        } else if (equalX.length == 3) {
            winner = "X"
            win.winner = winner;
            win.haveWinner = true;
            break;

        }

        i++;
    }

    return win;
}

function showWinner() { // mostra um vencedor na tela

    aux = victory(combinations, playerCircle, playerX);

    if (aux.haveWinner) {
        alert(`${aux.winner} Venceu!`);
    }
}


function coletaIguais(arr1, arr2) { // compara se os arrays individuais dos players possuem as 
                                    // posições ocupadas iguais a cada combinação de vitoria possível
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


function addMove(el) { //Adiciona a função de click a cada quadro do jogo
    el.forEach((element, index) => {

        element.addEventListener('click', () => {
            addClass(element);
            game(match, index, keys, jogadas, playerCircle, playerX);

            if (element.childElementCount < 1) {
                createTextMove(element, keys, match);
            }

            if (victory(combinations, playerCircle, playerX).haveWinner) {
                document.location.reload(1);
            }

            showWinner();
        })
    });
}

addMove(areaMove);

function game(arr, index, key, jogadas, playerCircle, playerX) { // Adiciona todos os movimentos em um array global, 
                                                                 // Adiciona os lugares ocupados por x e circle em arrays separados.
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

function createTextMove(element, keys, arr) { //adiciona os movimentos no quadro
    var p = document.createElement('p');

    if (arr.length % 2 == 0) {
        var txtP = document.createTextNode(keys[0]);
    } else {
        var txtP = document.createTextNode(keys[1]);
    }

    p.appendChild(txtP);
    element.appendChild(p)
}
