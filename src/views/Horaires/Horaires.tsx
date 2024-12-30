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

const Horaires = ({ navigation }: any) => {
  const [stopName, setStopName] = useState<string>("Loges");
  const [line, setLine] = useState<string>("C1");
  const [destination, setDestination] = useState<string>("Saint-Grégoire");
  const [buses, setBuses] = useState<any[]>([]);

  function search() {
    NextBus({
      stopName: stopName,
      lineName: line,
      destinationName: destination,
      limit: -1,
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
          style={styles.userInput}
          value={stopName}
          onChangeText={(text) => setStopName(text)}
        />
        <TextInput
          placeholder="Rechercher une ligne"
          style={styles.userInput}
          value={line}
          onChangeText={(text) => setLine(text)}
        />
        <TextInput
          placeholder="Rechercher une destination"
          style={styles.userInput}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <Pressable android_ripple={{ color: "grey" }} onPress={search}>
          <Text
            style={{
              padding: 10,
              borderColor: "#000",
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
            <Pressable key={index} style={styles.card} android_ripple={{ color: "grey" }}>
              <Text>
                {bus.nomcourtligne} - {bus.destination}
              </Text>
              <Text>
                {new Date(bus.arrivee).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </Text>
            </Pressable>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    width: "auto",
  },
  card: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 5,
  },
});

export default Horaires;
