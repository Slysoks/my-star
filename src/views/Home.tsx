import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stop, setStop] = useState("Loges");

  useEffect(() => {
    const fetchData = async () => {
      const uri = "https://data.explore.star.fr/";

      const limit = 10;
      const timezone = "Europe/Paris";
      const short_line_name = "C1";
      const destination = "Chantepie";

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
        const data = await response.json();
        const buses = data.results;
        console.log(buses);
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
    <View style={{ marginTop: 75, width: '100%' }}>
      <Text style={{ fontSize: 28 }}>
        { stop }
      </Text>
      <ScrollView>
      <View style={{ gap: 8, marginTop: 10, width: '100%' }}>
        {buses.map((bus, index) => (
          <View key={index} style={{ width: '80%', borderRadius: 20, overflow: 'hidden' }}>
            <TouchableNativeFeedback>
              <View style={[styles.container, { flexDirection: 'row', zIndex: 100 }]}>
                <Image
                  source={require('../../assets/bus.png')}
                  style={styles.busImage}
                />
                <Divider orientation="vertical" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: '600' }}>
                      { new Date(bus.arrivee).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', 'hour12':false }) }
                  </Text>
                  <Text>
                    { bus.nomcourtligne }
                  </Text>
                  <Text>
                    {bus.destination}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    </ScrollView>
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
  container: {
    flexDirection: 'row',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderBottomWidth: 2,
    padding: 10,
    borderRadius: 20,
    width: 400,
  },
  busImage: {
    width: 75,
    height: 75,
    borderRightColor: '#d0d0d0',
    borderRightWidth: 1,
  },
});

export default Home;