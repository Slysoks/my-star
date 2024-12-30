import { ReactNode } from "react";
import Reanimated, {
  type AnimatedProps,
  LinearTransition,
} from "react-native-reanimated";

type EntryOrExitLayoutType = NonNullable<AnimatedProps<{}>["entering"]>;

interface NativeListProps {
  theme: any;
  icon?: ReactNode;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  animated?: boolean;
  entering?: EntryOrExitLayoutType;
}

const NativeList: React.FC<NativeListProps> = ({
  theme,
  icon,
  label,
  leading,
  trailing,
  animated,
  entering,
}) => {
  
  return (
    <Reanimated.View>

    </Reanimated.View>
  );
};
