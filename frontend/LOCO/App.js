import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hook } from 'cavy';

import AppNavigator from './navigation/AppNavigator';
import PopUpUI from './screens/PopUpUI';

import { Tester, TestHookStore } from 'cavy';
import UserScreenSpec from './specs/UserScreenSpec';

const testHookStore = new TestHookStore();

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      //<Tester specs={[UserScreenSpec]} store={testHookStore}>
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
      //</Tester>
    );
  } else {
    return (
      //<Tester specs={[UserScreenSpec]} store={testHookStore}>
        <View style={styles.container}>
          <AppNavigator />
          {/* <PopUpUI/> */}
        </View>
      //</Tester>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'prompt-semibold': require('./assets/fonts/Prompt-SemiBold.ttf'),
      'prompt-bold': require('./assets/fonts/Prompt-Bold.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
