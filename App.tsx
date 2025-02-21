import {
  Platform,
  SafeAreaView, StatusBar as RNStatusBar
} from "react-native";
import React from "react";

import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import Router from "@/router";

const App = () => {

  // Load custom fonts
  const [fontsLoaded, fontsError] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Italic": require("./assets/fonts/DMSans-Italic.ttf"),
  });

  // Change navigaiton bar color (Android only)
  NavigationBar.setPositionAsync("absolute");

  // If fonts are not loaded, return null
  if (!fontsLoaded && !fontsError) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
    >
      <StatusBar style={"auto"} />
      <Router />
    </SafeAreaView>
  );
};

export default App;
