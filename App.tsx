import { Text, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@/views';

const App = () => {
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS == 'android' ? 25 : 0,
      flex: 1,
    }}>
      <Text>App</Text>
      <View style={styles.navigationContainer}>
        <NavigationContainer>
          <TabGroup />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default App;