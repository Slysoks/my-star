import { View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BusItem } from "@/components/Components";
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
      <BusItem
        theme={theme}
        icon={
          <Image
            source={require("@assets/icons/C1.png")}
            style={{
              width: 60,
              height: 60,
            }}
          />
        }
        arrivalTime={time}
        nomArret="Loges"
        destination="Chantepie"
      />
    </View>
  );
};

export default Itineraire;
