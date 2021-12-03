import React from "react"
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"
import params from "../params"
import Mine from "./Mine"
import Flag from "./Flag"

export default props => {
    const { mined, opened, nearMines, exploded, flagged } = props //minado   aberto   quantas minas ao redor 
          
    const styleField = [styles.field]  // estilos para o campo
    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded) // no caso se explodir aparecera a bomba
    if (flagged) styleField.push(styles.flagged) 
    if (!opened && !exploded) styleField.push(styles.regular)  // regular so sera aplicado se o nao for aberto e nem explodido 

    let color = null
    if (nearMines > 0){     // se a quantidade de minas for menor que 0 ele entra aq abaixo
        if (nearMines == 2) color = '#2A28D7' // se a quantidade de minas for igual ao nmr correspondente eh tal cor
        if (nearMines == 2) color = '#2B520F'
        if (nearMines > 2 && nearMines < 6) color = '#F9060A'  //se o numero for 3 4 5 eh tal cor
        if (nearMines >= 6) color = '#F221A9'    // se for maior ou igual a 6
    }

    return ( //para renderizar o texto de numeros de minas
        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>
            <View style={styleField}>   
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, { color: color}]}>
                        {nearMines}</Text> : false} 
                {mined && opened ? <Mine /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View> 
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    field: {
        height: params.blockSize,  // o tamanho do bloco vao ser a altura do field
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    }
})