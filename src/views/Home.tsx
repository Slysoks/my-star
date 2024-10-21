import { View, Text } from 'react-native';
import SelectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useEffect, useState } from 'react';

const linesTypes = [
  { name: "Chronostar", id: 1 },
  { name: "Regular", id: 2 },
  { name: "Regional", id: 3 }
]

const Home = ({navigation}:any) => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <View>
      </View>
    </View>
  );
}

export default Home;