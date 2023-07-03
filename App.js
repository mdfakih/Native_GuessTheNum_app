import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNum, setUserNum] = useState(null)
  const [gameIsOver, setGameIsOver] = useState(true)

  const pickedNumHandler = (pickedNum) => {
    setUserNum(pickedNum)
    setGameIsOver(false)
  }

  const gmaeOverHandler = () => {
    setGameIsOver(true)
  }

  let screen = <StartGameScreen onPickNum={pickedNumHandler} />

  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={gmaeOverHandler} />
  }

  if (gameIsOver && userNum) {
    screen = <GameOverScreen />
  }

  return (
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
