import { DefaultTheme, DarkTheme, type Theme } from "@react-navigation/native";

export const fonts = {
  regular: "DMSans-Regular",
  italic: "DMSans-Italic",
}

export const Light: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#29947A",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    border: "#d5d5d5",
    notification: "#29947A",
  },
};

export const Dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#29947A",
    background: "#0a0a0a",
    card: "#111111",
    text: "#FFFFFF",
    border: "#252525",
    notification: "#29947A",
  },
};