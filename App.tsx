import { Text, Platform, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Horaires } from '@/views';
import { Colors } from 'consts';
import { LinePicture } from '@/providers/star';

const App = () => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await LinePicture({ lineId: '0003', resolution: 1 });
      setImage(data.image.url ? data.image.url : undefined);
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS == 'android' ? 25 : 0,
      flex: 1,
      backgroundColor: Colors.light,
    }}>
      <Image
        source={{ uri: image }}
        style={{ width: 100, height: 100 }}
      />
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
      <Tab.Screen name="Accueil" component={Home} />
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