import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'
import { Text } from 'react-native'

const GuessLogItem = ({ roundNum, guess }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.textStyle}>#{roundNum}</Text>
            <Text style={styles.textStyle}>Opponents Guess: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary800,
        borderRadius: 40,
        borderWidth: 1,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    textStyle: {
        fontFamily: 'open-sans'
    }
})

export default GuessLogItem