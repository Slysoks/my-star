
import * as Haptics from "expo-haptics";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home as HomeIcon,
  CalendarClock,
  Bell,
  Route,
  CreditCard,
} from "lucide-react-native";

import { Light, Dark, fonts } from "@/consts/themes";
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


const Router = ({ theme }:any) => {
  const Tab = createBottomTabNavigator();
  
  return (
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
  )
}

export default Router;