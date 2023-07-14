import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function App() {

  const [userNum, setUserNum] = useState(null)
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'fast-hand': require('./assets/fonts/Fasthand-Regular.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const pickedNumHandler = (pickedNum) => {
    setUserNum(pickedNum)
    setGameIsOver(false)
  }

  const gameOverHandler = (numOfRounds) => {
    setGameIsOver(true)
    setGuessRounds(numOfRounds)
  }

  const startNewGameHandler = () => {
    setUserNum(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNum={pickedNumHandler} />

  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNum) {
    screen = <GameOverScreen roundsNum={guessRounds} userNum={userNum} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
