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
  console.log(selectedItems);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <View>
        <SelectionedMultiSelect
          items={linesTypes}
          uniqueKey="id"
          subKey="children"
          selectText="Select Line Type"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </View>
    </View>
  );
}

export default Home;