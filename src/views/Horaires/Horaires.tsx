import {
  View,
  Text,
  TextInput,
  ScrollView, Pressable, Platform,
  ActivityIndicator
} from "react-native";
import Reanimated from "react-native-reanimated";
import { useEffect, useState } from "react";
import { FadeInDown, Easing } from "react-native-reanimated";
import { LineList, NextBus } from "@/providers/star";
import { NativeList, NativeListItem } from "@/components/lists";
import { BusFront, CircleAlert } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";

const Horaires = ({ navigation }: any) => {
  const theme = useTheme();
  const { colors } = theme;

  const [stopName, setStopName] = useState<string>("Loges");
  const [line, setLine] = useState<string>("C1");
  const [destination, setDestination] = useState<string>("Saint-Grégoire");
  const [buses, setBuses] = useState<any>([]);
  const [lineColor, setLineColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemLimit, setItemLimit] = useState<number>(5);

  function search() {
    setIsLoading(true);
    NextBus({
      stopName: stopName,
      lineName: line,
      destinationName: destination,
    })
      .then((data) => {
        setIsLoading(false);
        setBuses(data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function fetchLineColor() {
      try {
        const data = await LineList({ lineName: line });
        setLineColor(data.results[0].couleur);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLineColor();
  }, [line]);

  return (
    <ScrollView>
      <View style={{ gap: 5 }}>
        <TextInput
          placeholder="Rechercher un arrêt"
          style={{
            padding: 10,
            borderColor: "#2C2C2C",
            borderWidth: 1,
            width: "auto",
            color: colors.text,
          }}
          value={stopName}
          onChangeText={(text) => setStopName(text)}
        />
        <TextInput
          placeholder="Rechercher une ligne"
          style={{
            padding: 10,
            borderColor: "#2C2C2C",
            borderWidth: 1,
            width: "auto",
            color: colors.text,
          }}
          value={line}
          onChangeText={(text) => setLine(text)}
        />
        <TextInput
          placeholder="Rechercher une destination"
          style={{
            padding: 10,
            borderColor: "#2C2C2C",
            borderWidth: 1,
            width: "auto",
            color: colors.text,
          }}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <Pressable android_ripple={{ color: "grey" }} onPress={search}>
          <Text
            style={{
              padding: 10,
              borderColor: colors.border,
              borderWidth: 1,
              textAlign: "center",
              color: colors.text,
            }}
          >
            Rechercher
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 5 }}>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : buses?.results?.length > 0 ? (
          <Reanimated.View>
            <NativeList theme={theme} label="Liste des arrêts">
              {buses.results.map((bus: any, index: number) => (
                <NativeListItem
                  icon={<BusFront color={"#000"} />}
                  iconColor={"#95c11e"}
                  key={index}
                  theme={theme}
                  label={new Date(bus.arrivee).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  sub={bus.destination}
                  entering={FadeInDown.springify()
                    .easing(Easing.elastic(1))
                    .delay(50 * index)}
                  {...(Platform.OS === "ios" ? { vibrate: true } : {})}
                />
              ))}
            </NativeList>
          </Reanimated.View>
        ) : (
          <Reanimated.View
            style={{
              display: buses?.results?.length > 0 ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              marginHorizontal: 10,
              padding: 10,
              borderWidth: 1,
              borderBottomWidth: 2,
              borderColor: colors.border,
              borderRadius: 30,
            }}
            entering={FadeInDown.springify().easing(Easing.elastic(1))}
          >
            <CircleAlert color={colors.text} />
            <Text style={{ color: colors.text }}>Aucun bus trouvé</Text>
          </Reanimated.View>
        )}
      </View>
    </ScrollView>
  );
};

export default Horaires;
