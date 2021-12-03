import React, { Component } from "react"
import { StyleSheet, Text, View, Alert } from "react-native"
import params from "./src/params"
import MineField from "./src/components/MineField"
import Header from "./src/components/Header"
import LevelSelect from "./src/screens/LevelSelect"
import {
  createMinedBoard, 
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions'

export default class App extends Component{

  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {    // funcao de calcular minas
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)  
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),  // funcao diretamente da pasta function
      won: false,    //inicialmente aparece false
      lost: false,
      showLevelSelect: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que buuuurro!')
    }

    if (won) {
      Alert.alert('Parabens!', 'Você ganhou')
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) => {             //selecionar campo
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)      //verificar se o usuario ganhou
    
    if (won) {
      Alert.alert('Parabéns', 'Você Venceu')
    }

    this.setState({board, won}) // mudar o estado componente idependente se ele ganhou ou nao
  }

  onLevelSelected = level => {   // funçao para selecionar o nivel
    params.difficultLevel = level   // nivel de dificuldade vai ser passado em cima do level setado
    this.setState(this.createState())  // ira gerar outro jogo com outro nivel de habilidade
  }

  render() {
    return(
      <View style={styles.container}>
        <LevelSelect isVisible={this.state.showLevelSelect}
          onLevelSelected={this.onLevelSelected}
          onCance={() => this.setState({ showLevelSelect: false })} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())} 
          onFlagPress={() => this.setState({ showLevelSelect: true })} />
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})