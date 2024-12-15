import {
  Appearance,
  Platform,
  SafeAreaView,
  View,
  useColorScheme,
  StatusBar as RNStatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as NavigationBar from "expo-navigation-bar";
import { Light, Dark, fonts } from "@/consts/themes";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";

import {
  Home as HomeIcon,
  CalendarClock,
  Bell,
  Route,
  CreditCard,
} from "lucide-react-native";

import { Home, Horaires } from "@/views";

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
  {
    name: "KorriGo",
    component: Home,
    icon: CreditCard,
  },
  {
    name: "Itinéraire",
    component: Home,
    icon: Route,
  },
  {
    name: "Alertes",
    component: Home,
    icon: Bell,
  },
];

const App = () => {
  const Tab = createBottomTabNavigator();

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
  useEffect(() => {
    async function setNavigationBar() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync(theme.colors.secondary);
      if (scheme === "dark") await NavigationBar.setButtonStyleAsync("light");
      else await NavigationBar.setButtonStyleAsync("dark");
    }

    Platform.OS === "android" && setNavigationBar();
  }, []);

  async function setBtnTheme() {
    scheme === "dark"
      ? await NavigationBar.setButtonStyleAsync("light")
      : await NavigationBar.setButtonStyleAsync("dark");
  }

  // Listen to system theme changes
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? Dark : Light);
      setBtnTheme()
    });
  }, []);

  // If fonts are not loaded, return null
  if (!fontsLoaded && !fontsError) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={"auto"} />
      <View
        style={{
          height: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
          backgroundColor: theme.colors.auto,
        }}
      />
      <NavigationContainer
        onStateChange={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          sceneContainerStyle={{ backgroundColor: theme.colors.background }}
        >
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
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.contrast,
                tabBarStyle: {
                  backgroundColor: theme.colors.secondary,
                  height: 100,
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
