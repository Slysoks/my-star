import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}:any) => {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stop, setStop] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const uri = "https://data.explore.star.fr/";

      setStop(await AsyncStorage.getItem('stop') || "Gares");
      const limit = 10;
      const timezone = "Europe/Paris";
      const short_line_name = await AsyncStorage.getItem('short_line_name') || "C1";
      const destination = await AsyncStorage.getItem('destination') || "Gares";

      const dataset_name = "tco-bus-circulation-passages-tr";

      const parameters = [
        `limit=${limit}`,
        `timezone=${timezone}`,
        `refine=nomcourtligne:"${short_line_name}"`,
        `refine=destination:"${destination}"`,
        `refine=nomarret:"${stop}"`,
      ];

      const url = uri + "api/explore/v2.1/catalog/datasets/" + dataset_name + "/records?" + parameters.join("&");

      try {
        const response = await fetch(url);
        const data = JSON.parse(await response.text());
        const buses = data.results;
        buses.sort((a: any, b: any) => {
          return new Date(a.arrivee).getTime() - new Date(b.arrivee).getTime();
        });
        setBuses(buses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ marginTop: 75, width: '100%', gap:5, }}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Settings');
        }}
      >
        <View>
          <Text>
            { "Settings" }
          </Text>
        </View>
      </TouchableNativeFeedback>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          { stop }
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <ScrollView style={ styles.scroll }>
          { buses.map((bus) => (
            <TouchableNativeFeedback key={bus.idbus}
              style={{ width: '95%' }}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Animated.timing(new Animated.Value(1), {
                    toValue: 0.9,
                    duration: 100,
                    useNativeDriver: true,
                  }).start();
                }
              }}
            >
              <View style={styles.container}>
                <Image
                  style={styles.busImage}
                  source={require('../../assets/bus.png')}
                />
                <Divider orientation="vertical" />
                <View style={{ marginLeft: 5, gap:5}}>
                  <Text>{bus.nomcourtligne}</Text>
                  <Text>
                    { new Date(bus.arrivee).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

interface DividerProps {
  width?: number;
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  dividerStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
  width = 1,
  orientation = 'horizontal',
  color = '#DFE4EA',
  dividerStyle,
}) => {
  const dividerStyles = [
    {width: orientation === 'horizontal' ? '100%' : width},
    {height: orientation === 'vertical' ? '100%' : width},
    {backgroundColor: color},
    {margin: 5},
    dividerStyle,
  ];

  return <View style={dividerStyles} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: '#d0d0d0',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderBottomWidth: 2,
    padding: 10,
    borderRadius: 20,
    width: '95%',
    marginBottom: 10,
  },
  busImage: {
    width: 75,
    height: 75,
    borderRightColor: '#d0d0d0',
    borderRightWidth: 1,
    borderRadius: 10,
  },
  scroll: {
    width: '100%',
    height: '100%',
  }
});

export default Home;