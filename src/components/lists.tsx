import React, { ReactNode } from "react";
import { Text, Pressable } from "react-native";
import Reanimated, {
  type AnimatedProps,
  EntryExitTransition,
  LinearTransition,
} from "react-native-reanimated";
import { CircleHelp } from "lucide-react-native";

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
    <Reanimated.View>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
      <Reanimated.View
        style={{
          backgroundColor: theme.colors.card,
          marginHorizontal: 5,
          borderRadius: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
          overflow: "hidden",
        }}
      >
        {React.Children.map(children, (child, index) => (
          <>
            <Reanimated.View style={{ overflow: "hidden" }}>
              {child}
            </Reanimated.View>
            {index < React.Children.count(children) - 1 && (
              <Reanimated.View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.border,
                  marginVertical: 8,
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
  theme: any;
  icon?: ReactNode;
  iconColor?: string;
  label: string;
  sub: string;
  trailing?: ReactNode;
  animated?: boolean;
  entering?: EntryOrExitLayoutType;
}

const NativeListItem: React.FC<NativeListItemProps> = ({
  theme,
  icon = <CircleHelp color={"#000000"} />,
  iconColor = "#ffffff",
  label,
  sub,
  trailing,
  animated = false,
  entering = EntryExitTransition,
}) => {
  return (
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
        }}
      >
        {icon}
      </Reanimated.View>
      <Reanimated.View
        style={{
          marginLeft: 5,
        }}
      >
        <Text>{label}</Text>
        <Text>{sub}</Text>
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
        <Text>Test</Text>
      </Reanimated.View>
    </Reanimated.View>
  );
};

export { NativeList, NativeListItem };
