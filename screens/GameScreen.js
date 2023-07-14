import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryBtn from '../components/ui/PrimaryBtn';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';

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
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    const { width, height } = useWindowDimensions()

    useEffect(() => {
        if (currGuess === userNum) {
            onGameOver(guessRounds.length)
        }
    }, [currGuess, userNum, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

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
        setGuessRounds(prevGuessRounds => [...prevGuessRounds, newRandNum])
    }

    const guessRoundListLength = guessRounds.length

    let content = (
        <>
            <NumberContainer>{currGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
                <View style={styles.btnsContainer}>
                    <View style={styles.btnContainer}>
                        <PrimaryBtn onPress={nextGuestHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryBtn>
                    </View>
                    <View style={styles.btnContainer}>
                        <PrimaryBtn onPress={nextGuestHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryBtn>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
                <View style={styles.btnContainerWide}>
                    <View style={styles.btnContainer}>
                        <PrimaryBtn onPress={nextGuestHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryBtn>
                    </View>
                    <NumberContainer>{currGuess}</NumberContainer>
                    <View style={styles.btnContainer}>
                        <PrimaryBtn onPress={nextGuestHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryBtn>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {
                    guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)
                } */}
                <FlatList
                    data={guessRounds}
                    renderItem={itemData => {
                        return (
                            <GuessLogItem
                                roundNum={guessRoundListLength - itemData.index}
                                guess={itemData.item}
                            />
                        )
                    }}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    btnsContainer: {
        flexDirection: 'row'
    },
    btnContainer: {
        flex: 1
    },
    btnContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})

export default GameScreen