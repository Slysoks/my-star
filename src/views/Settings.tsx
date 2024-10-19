import { View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation, route}: any) => {
  const [shortLineName, setShortLineName] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [stop, setStop] = useState<string>();

  AsyncStorage.getItem('short_line_name').then(value => {
    if (value !== null) {
      setShortLineName(value);
    }
  });

  AsyncStorage.getItem('destination').then(value => {
    if (value !== null) {
      setDestination(value);
    }
  });

  AsyncStorage.getItem('stop').then(value => {
    if (value !== null) {
      setStop(value);
    }
  });

  return (
    <View>
      <Text>Settings</Text>
      <TextInput
      placeholder="Short line name"
      onChangeText={async (text) => {
        setShortLineName(text);
        await AsyncStorage.setItem('short_line_name', text);
      }}
      value={shortLineName}
      />
      <TextInput
      placeholder="Destination"
      onChangeText={async (text) => {
        setDestination(text);
        await AsyncStorage.setItem('destination', text);
      }}
      value={destination}
      />
      <TextInput
      placeholder="Stop"
      onChangeText={async (text) => {
        setStop(text);
        await AsyncStorage.setItem('stop', text);
      }}
      value={stop}
      />
    </View>
  );
};

export default Settings;