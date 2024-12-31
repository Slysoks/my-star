import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { NextBus } from "@/providers/star";
import { useTheme } from "@react-navigation/native";

const Horaires = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [stopName, setStopName] = useState<string>("Loges");
  const [line, setLine] = useState<string>("C1");
  const [destination, setDestination] = useState<string>("Saint-Grégoire");
  const [buses, setBuses] = useState<any[]>([]);

  function search() {
    NextBus({
      stopName: stopName,
      lineName: line,
      destinationName: destination,
    })
      .then((data) => {
        setBuses(data.results || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
            }}
          >
            Rechercher
          </Text>
        </Pressable>
      </View>
      <View>
        {buses.length > 0 &&
          buses.map((bus, index) => (
            <Pressable
              key={index}
              style={{
                padding: 10,
                borderColor: colors.border,
                borderWidth: 1,
                margin: 5,
              }}
              android_ripple={{ color: "grey" }}
            >
              <Text style={{ color: colors.text }}>
                {bus.nomcourtligne} - {bus.destination}
              </Text>
              <Text style={{ color: colors.text }}>
                {new Date(bus.arrivee).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).replace(":", "h")}
              </Text>
            </Pressable>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userInput: {},
});

export default Horaires;
