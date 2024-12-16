import {
  Appearance,
  Platform,
  SafeAreaView, useColorScheme,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  Text
} from "react-native";
import { useEffect, useState } from "react";

import * as NavigationBar from "expo-navigation-bar";
import { Light, Dark } from "@/consts/themes";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import Router from "@/router";

const App = () => {
  // Get the device color scheme (light or dark)
  let scheme = useColorScheme();
  if (scheme === null || scheme === undefined) scheme = "light";
  const [theme, setTheme] = useState(scheme === "dark" ? Dark : Light);

  // Load custom fonts
  const [fontsLoaded, fontsError] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Italic": require("./assets/fonts/DMSans-Italic.ttf"),
  });

  // Change navigaiton bar color (Android only)
  NavigationBar.setPositionAsync("absolute");
  Platform.OS === "android" && setNavigationBarTheme();

  async function setNavigationBarTheme() {
    await NavigationBar.setBackgroundColorAsync(theme.colors.secondary);
    if (scheme === "dark") await NavigationBar.setButtonStyleAsync("light");
    else await NavigationBar.setButtonStyleAsync("dark");
  }

  // Listen to system theme changes
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      console.log("Theme changed to", colorScheme);
      setTheme(colorScheme === "dark" ? Dark : Light);
      setNavigationBarTheme();
    });
  }, []);

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
      <Router theme={theme} />
    </SafeAreaView>
  );
};

export default App;
