import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Flag from "./Flag"

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress}
                    style={styles.flagButton}>
                    <Flag bigger />
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
            </View>
            <TouchableOpacity style={styles.button}
                onPress={props.onNewGame}>
                <Text style={styles.buttonLabel}>Novo Jogo</Text>
            </TouchableOpacity>
        </View>
    )
}
 //na linha 09 TouchableOpacity que quando clica coloca uma flag
 //na linha 13 text quantas flags ainda falta no jogo para eu aplicar no jogo
 //na linha 15 TouchableOpacity o botao que ira iniciar o jogo


 const styles = StyleSheet.create({
     container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
     },
     flagContainer: {
        flexDirection: 'row'
     },
     flagButton: {
        marginTop: 10,
        minWidth: 30
     },
     flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
     },
     button: {
        backgroundColor: 'orange',
        color: 'white',
        padding: 5,
     },
     buttonLabel: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold'
     }
 })