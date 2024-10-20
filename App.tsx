import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NextBus } from 'star'

const Stack = createNativeStackNavigator();

export default function App() {
  const [nextBus, setNextBus] = useState<any>(undefined);

  useEffect(() => {
    setNextBus(NextBus);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text>
        { nextBus ? 'NextBus is defined' : 'NextBus is not defined' }
      </Text>
    </SafeAreaView>
  );
}