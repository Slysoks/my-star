import { Text, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Horaires } from '@/views';
import { Colors } from 'consts';

const App = () => {
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS == 'android' ? 25 : 0,
      flex: 1,
      backgroundColor: Colors.light,
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
      <Tab.Screen name="Accueil" options={{ headerTitle: "T" }} component={Home} />
      <Tab.Screen name="Horaires" component={Horaires} />
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