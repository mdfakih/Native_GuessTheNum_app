import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'
import { Dimensions } from 'react-native'

const Card = ({ children }) => {
    return (
        <View style={styles.card}>{children}</View>
    )
}

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, //**  only android specific for shadow style*/
        //!! only for IOS specific !/
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
        //!! only for IOS specific !/
    },
})

export default Card