import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryBtn from '../components/ui/PrimaryBtn';

const generateRandomNumBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomNumBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNum, onGameOver }) => {
    const initialGuess = generateRandomNumBetween(1, 100, userNum)
    const [currGuess, setCurrGuess] = useState(initialGuess)

    useEffect(() => {
        if (currGuess === userNum) {
            onGameOver
        }
    }, [currGuess, userNum, onGameOver])


    const nextGuestHandler = (direction) => {

        if ((direction === 'lower' && currGuess < userNum) || (direction === 'greater' && currGuess > userNum)) {
            Alert.alert(
                "Don't lie",
                "You know that this wrong...",
                [{ text: 'Sorry', style: 'cancel' }]
            )
            return
        }

        if (direction === 'lower') {
            maxBoundary = currGuess
        } else {
            minBoundary = currGuess + 1
        }
        const newRandNum = generateRandomNumBetween(minBoundary, maxBoundary, currGuess)
        setCurrGuess(newRandNum)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currGuess}</NumberContainer>
            <View>
                <Text>Higher or Lower</Text>
                <View>
                    <PrimaryBtn onPress={nextGuestHandler.bind(this, 'lower')}>-</PrimaryBtn>
                    <PrimaryBtn onPress={nextGuestHandler.bind(this, 'greater')}>+</PrimaryBtn>
                </View>
            </View>
            {/* <View>Log Rounds</View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
})

export default GameScreen