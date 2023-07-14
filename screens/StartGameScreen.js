import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import PrimaryBtn from '../components/ui/PrimaryBtn'
import Colors from '../constants/colors'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

const StartGameScreen = ({ onPickNum }) => {

    const [enteredNum, setEnteredNum] = useState('')

    const { width, height } = useWindowDimensions()

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

    const marginTopDistance = height < 380 ? 30 : 100

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainre, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
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
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

// const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainre: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 100,
        alignItems: 'center'
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