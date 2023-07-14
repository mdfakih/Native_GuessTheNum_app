import React, { Children } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/colors'

const NumberContainer = ({ children }) => {



    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 450 ? 12 : 24,
        borderRadius: 8,
        margin: deviceWidth < 450 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth < 450 ? 28 : 36,
        fontFamily: 'open-sans-bold'
        // fontWeight: 'bold'
    }
})