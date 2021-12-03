import React from "react"
import { View, StyleSheet } from "react-native"
import Field from "./Field"

export default props => {
    const rows = props.board.map((row, r) => {       // vou esperar receber o resultado do createMineBoard que sera passado como componente  
        const columns = row.map((field, c) => {       // cada uma das linhas eu vou fazer uma map
            return <Field {...field} key={c}   // o key eh por conta que gera uma advertencia e para identificar de forma mais unica os componentes
                onOpen={() => props.onOpenField(r, c)} // retornar a linha e a coluna que foi clicado
                onSelect={e => props.onSelectField(r, c)}/>         
        })
        return <View key={r}
            style={{flexDirection: 'row'}}>{columns}</View>
    }) 
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
})