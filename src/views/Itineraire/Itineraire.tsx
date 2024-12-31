import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BusList } from "@/components/Components";
import React from "react";

const Itineraire = ({ navigation }: any) => {
  const theme = useTheme();
  const { colors } = theme;
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <BusList
        theme={theme}
        arrivalTime={time}
        nomArret="Loges"
        destination="Chantepie"
      />
    </View>
  );
};

export default Itineraire;
