import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'
import PrimaryBtn from '../components/ui/PrimaryBtn'
import Colors from '../constants/colors'

const StartGameScreen = ({ onPickNum }) => {

    const [enteredNum, setEnteredNum] = useState('')

    const numInputHandler = (enteredText) => {
        setEnteredNum(enteredText)
    }

    const reserInputHandler = () => setEnteredNum('')

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNum)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //show alert
            Alert.alert(
                'Invalid Number!',
                'Number has to be a number between 1 and 99',
                [{ text: 'ok', style: 'destructive', onPress: reserInputHandler }]
            )
            return
        } else {
            onPickNum(chosenNumber)
        }
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.numberInput}
                keyboardType='number-pad'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={2}
                value={enteredNum}
                onChangeText={numInputHandler}
            />
            <View style={styles.btnsContainer}>
                <View style={styles.btnContainer}>
                    <PrimaryBtn onPress={reserInputHandler}>Reset</PrimaryBtn>
                </View>
                <View style={styles.btnContainer}>
                    <PrimaryBtn onPress={confirmInputHandler}>Confirm</PrimaryBtn>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
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
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnsContainer: {
        flexDirection: 'row'
    },
    btnContainer: {
        flex: 1
    }
})

export default StartGameScreen