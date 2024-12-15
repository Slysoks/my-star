import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { NextBus } from 'star';

const Horaires = () => {
  const [nextBus, setNextBus] = useState<any>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await NextBus({ lineId: '0003', stopName: 'République', destinationId: 0, limit: 5 });
      console.log(data.results[0]);
      setNextBus(data.results[0]);
    };

    fetchData();
  }, []);

  return (
    <View>
      <ScrollView>
        <Text>
          Prochain bus { JSON.stringify(nextBus.nomcourtligne) }
        </Text>
      </ScrollView>
    </View>
  );
}

export default Horaires;