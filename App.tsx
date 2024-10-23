import { Text, Platform, SafeAreaView, StyleSheet, View, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Horaires } from '@/views';
import { Colors } from 'consts';
import { NextBus } from '@/providers/star';

const App = () => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await NextBus({ lineId: '0003' });
      console.log(data);
      setImage(JSON.stringify(data));
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <NavigationContainer>
        <TabGroup />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={Home} />
      <Tab.Screen name="Horaires" component={Horaires} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    width: '100%',
    height: 150,
    bottom: 0,
  },
});

export default App;