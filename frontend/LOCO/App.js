import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hook } from 'cavy';
import AppNavigator from './navigation/AppNavigator';

import { Tester, TestHookStore } from 'cavy';
import LoginScreenSpec from './specs/LoginScreenSpec';
import SignupScreenSpec from './specs/SignupScreenSpec';
import SearchingSpec from './specs/SearchingSpec';
import UserScreenSpec from './specs/UserScreenSpec';
import EditBusinessSpec from './specs/EditBusinessSpec';
import AddBusinessSpec from './specs/AddBusinessSpec';
import BusinessScreenSpec from './specs/BusinessScreenSpec';
import SignoutScreenSpec from './specs/SignoutScreenSpec';
import CreateUserSpec from './specs/CreateUserSpec'

const testHookStore = new TestHookStore();

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Tester specs={[
        // SignupScreenSpec,
        // LoginScreenSpec,
        // SearchingSpec,
        // UserScreenSpec,
        // EditBusinessSpec,
        // AddBusinessSpec,
        // BusinessScreenSpec,
        // SignoutScreenSpec,
        // CreateUserSpec,
      ]} store={testHookStore}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Tester>
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
