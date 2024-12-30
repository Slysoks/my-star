import { DefaultTheme, DarkTheme, type Theme } from "@react-navigation/native";

export const fonts = {
  regular: "DMSans-Regular",
  italic: "DMSans-Italic",
}


export const STARLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#45B06B",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    border: "#E6E6E6",
    notification: "#F00",
  },
}

export const STARDark: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#63FD9A",
    background: "#000000",
    card: "#000000",
    text: "#F0F0F0",
    border: "#2C2C2C",
    notification: "#F00",
  },
}
