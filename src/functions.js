const createBoard = (rows, columns) => {  //ira criar um array de arrays
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => { //espalhar as minas no tabuleiro
    const rows = board.length  // para pegar a quatidade de linhas
    const columns = board[0].length //para pegar a quatidade de colunas
    let minesPlanted = 0
    
    while (minesPlanted < minesAmount) {  // so ira sair do while se a quatidade de minas for maior ou igual do a quantidade de minas passadas no parametro 
        const rowSel = parseInt(Math.random() * rows, 10)  // onde eu quero plantar a mina
        const columnSel = parseInt(Math.random() * columns, 10)

        // sortear novas minas para nao cair no msm lugar
        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++ // esta minado ent vai para a prox
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => { // criando o tabuleiro
    const board = createBoard(rows, columns)  //acrescentando as linhas e as colunas no tabuleiro
    spreadMines(board, minesAmount)   // passar o tabuleiro e quantidade de minas passadas por parametro
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {  //pegar vizinhos 
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {   //validaçoes
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length  // metodo para ve se a linha e a coluna eh valida, e se eu tenho os dois 
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => {   //para saber se a vizinhança eh segura
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => { //funcao de abrir um field 'campo'
    const field = board[row][column]
    if (!field.opened) { //se o campo n estiver aberto ele ira abrir
        field.opened = true
        if (field.mined) {  //indicar q o usuario perdeu por conta que abriu a mina
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {   //caso contrario se os vizinhos for seguro ira poder abrir
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else {      // caso nao seja seguro ira abrir o campo e mostrar o numero de minas na proximidade
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)   //juntar todos arrays de forma linear
const hadExplosion = board => fields(board)  //saber o campo explodido
    .filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged)  //se estiver minado e nao estiver com a bandeira ele esta pendente
    || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0 //se todos os campos forem resolvidos o usuario ganhou o 
const showMines = board => fields(board).filter(field => field.mined)  //mostrar todos os campos minados apos perder ou ganhar
    .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {  //iverter bandeira
    const field = board[row][column]  
    field.flagged = !field.flagged  //se estiver marcado ele desmarca e se estiver desmarcado ele marca
}

const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length  //quantas flags foram usadas no jogo

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}
    