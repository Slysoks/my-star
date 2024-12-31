import { View, Text, type Image, Pressable } from "react-native";
import { ReactNode } from "react";
import Reanimated, {
  type AnimatedProps,
} from "react-native-reanimated";
import { type Theme } from "@react-navigation/native";

type EntryLayoutType = NonNullable<AnimatedProps<{}>["entering"]>;

interface BusItemProps {
  theme: Theme;
  icon?: ReactNode;
  nomArret: string;
  destination: string;
  arrivalTime: Date;
  pressable?: boolean;
  onPress?: () => void;
  animated?: boolean;
  entering?: EntryLayoutType;
}

export const BusItem: React.FC<BusItemProps> = ({
  theme,
  icon,
  nomArret,
  arrivalTime,
  destination,
  pressable=true,
  onPress,
  animated,
  entering,
}) => {
  return (
    <Pressable android_ripple={{color: "grey"}} onPress={onPress}>
      <Reanimated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <View>
          <Text style={{ color: theme.colors.text }}>{nomArret}</Text>
          <Text style={{ color: theme.colors.text }}>{destination}</Text>
          <Text style={{ color: theme.colors.text }}>
            {arrivalTime.toLocaleTimeString("fr-FR")}
          </Text>
        </View>
      </Reanimated.View>
    </Pressable>
  );
};

interface BusListProps {
  theme: Theme;
  buses: Array<{
    icon?: ReactNode;
    nomcourtligne: string;
    destination: string;
    arrivee: Date;
  }>;
}
