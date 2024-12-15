import { Platform, SafeAreaView, View, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Horaires } from "@/views";
import { Home as HomeIcon, CalendarClock } from "lucide-react-native";
import * as NavigationBar from "expo-navigation-bar";
import { Light, Dark, fonts } from "@/consts/themes";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";

const Tabs = [
  {
    name: "Accueil",
    component: Home,
    icon: HomeIcon,
  },
  {
    name: "Horaires",
    component: Horaires,
    icon: CalendarClock,
  },
];

const App = () => {
  // Get the device color scheme (light or dark)
  const scheme = useColorScheme();
  const Tab = createBottomTabNavigator();

  // Load custom fonts
  const [fontsLoaded, fontsError] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Italic": require("./assets/fonts/DMSans-Italic.ttf"),
  });

  // Change navigaiton bar color (Android only)
  useEffect(() => {
    async function setNavigationBar() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#ffffff00");
    }

    Platform.OS === "android" && setNavigationBar();
  }, []);

  const theme: Theme = scheme === "dark" ? Dark : Light;

  // If fonts are not loaded, return null
  if (!fontsLoaded && !fontsError) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={Platform.OS === "android" ? { height: 40 } : { height: 0 }}
      />
      <NavigationContainer
        theme={theme}
        onStateChange={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          {Tabs.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <tab.icon size={size} color={color} />
                ),
                tabBarLabelStyle: {
                  fontFamily: fonts.regular,
                },
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
