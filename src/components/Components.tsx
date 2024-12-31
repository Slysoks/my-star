import { View, Text } from "react-native";
import { ReactNode } from "react";
import Reanimated, {
  type AnimatedProps,
  LinearTransition,
} from "react-native-reanimated";
import { type Theme } from "@react-navigation/native";

type EntryLayoutType = NonNullable<AnimatedProps<{}>["entering"]>;

interface BusListProps {
  theme: Theme;
  icon?: ReactNode;
  nomArret: string;
  destination: string;
  arrivalTime: Date;
  animated?: boolean;
  entering?: EntryLayoutType;
}

export const BusList: React.FC<BusListProps> = ({
  theme,
  icon,
  nomArret,
  arrivalTime,
  destination,
  animated,
  entering,
}) => {
  return (
    <Reanimated.View>
      <View>
        {icon}
        <Text style={{ color: theme.colors.text }}>{nomArret}</Text>
        <Text style={{ color: theme.colors.text }}>{destination}</Text>
        <Text style={{ color: theme.colors.text }}>
          {arrivalTime.toLocaleTimeString("fr-FR")}
        </Text>
      </View>
    </Reanimated.View>
  );
};
