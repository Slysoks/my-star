import { useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LocalSvg } from "react-native-svg/css";
import {
  Home as HomeIcon,
  CalendarClock,
  Bell,
  Route,
  CreditCard,
} from "lucide-react-native";
import { type Theme } from "@react-navigation/native";
import React, { useEffect } from "react";

import { STARLight, STARDark, fonts } from "@/consts/themes";
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

const Router = () => {
  // Get the device color scheme (light or dark)
  const scheme = useColorScheme();
  const [theme, setTheme] = React.useState<Theme>(
    scheme === "dark" ? STARDark : STARLight
  );

  // Get the current theme
  useEffect(() => {
    setTheme(scheme === "dark" ? STARDark : STARLight);
  }, [scheme]);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer
      onStateChange={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      theme={theme}
    >
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        {Tabs.map((tab, index) =>
          tab.name !== "KorriGo" ? (
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
                tabBarStyle: {
                  height: 100,
                },
              }}
            />
          ) : (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <LocalSvg
                    asset={
                      focused
                        ? require("../assets/icons/korrigo.svg")
                        : require("../assets/icons/korrigoOutline.svg")
                    }
                    width={size + 10}
                    height={size + 10}
                    color={color}
                  />
                ),
                tabBarLabelStyle: {
                  fontFamily: fonts.regular,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarStyle: {
                  height: 100,
                },
              }}
            />
          )
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
