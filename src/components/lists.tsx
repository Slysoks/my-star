import React, { ReactNode } from "react";
import { Text, Pressable } from "react-native";
import Reanimated, {
  type AnimatedProps,
  EntryExitTransition,
  LinearTransition,
} from "react-native-reanimated";
import { CircleHelp } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { type Theme } from "@react-navigation/native";

type EntryOrExitLayoutType = NonNullable<AnimatedProps<{}>["entering"]>;

interface NativeListProps {
  theme: any;
  icon?: ReactNode;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  animated?: boolean;
  entering?: EntryOrExitLayoutType;
  children?: ReactNode;
}

const NativeList: React.FC<NativeListProps> = ({
  theme,
  label,
  animated,
  entering,
  children,
}) => {
  return (
    <Reanimated.View
      style={{
        marginHorizontal: 5,
        gap: 5,
      }}
    >
      <Text
        style={{
          color: theme.colors.text + "80",
          textTransform: "uppercase",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
      <Reanimated.View
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 2,
          borderColor: theme.colors.border,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <>
            {child}
            {index < React.Children.count(children) - 1 && (
              <Reanimated.View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.border,
                }}
              />
            )}
          </>
        ))}
      </Reanimated.View>
    </Reanimated.View>
  );
};

interface NativeListItemProps {
  theme: Theme;
  icon?: ReactNode;
  iconColor?: string;
  label: string;
  sub: string;
  trailing?: ReactNode;
  animated?: boolean;
  entering?: EntryOrExitLayoutType;
  onPress?: () => void;
  vibrate?: boolean;
}

const NativeListItem: React.FC<NativeListItemProps> = ({
  theme,
  icon = <CircleHelp color={"#000000"} />,
  iconColor = "#ffffff",
  label,
  sub,
  trailing,
  entering = EntryExitTransition,
  onPress,
  vibrate = false,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "grey" }}
      onPress={() => {
        vibrate && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress;
      }}
      style={{
        padding: 10,
      }}
    >
      <Reanimated.View
        entering={entering}
        style={{ flexDirection: "row", position: "relative" }}
      >
        <Reanimated.View
          style={{
            backgroundColor: iconColor,
            borderRadius: 10,
            padding: 10,
            borderColor: theme.colors.border,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Reanimated.View>
        <Reanimated.View
          style={{
            marginLeft: 5,
          }}
        >
          <Text style={{ color: theme.colors.text }}>{label}</Text>
          <Text style={{ color: theme.colors.text }}>{sub}</Text>
        </Reanimated.View>
        <Reanimated.View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {trailing}
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            Test
          </Text>
        </Reanimated.View>
      </Reanimated.View>
    </Pressable>
  );
};

export { NativeList, NativeListItem };
