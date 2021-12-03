import { Dimensions } from "react-native"

const params ={
    blockSize: 30,   //tamanho do bloco que representa a mina
    borderSize: 5,    //largura da borda
    fontSize: 15,
    headerRatio: 0.15,  //Proporcao do painel superior da tela 
    difficultLevel: 0.1,   //numero porcentual da quantida de mina na tela ou seja 10%
    getColumnsAmount() {    // quantidade de colunas
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)  //largura dividida pela tamanho do bloco   floor colocado pra arrendondar a quantidade para baixo para nao transbordar 
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)  // isso fara que ocupara 85% da altura do tabuleiro
        return Math.floor(boardHeight / this.blockSize)   // altura dividida pelo tamanho do bloco
    }
}

export default params