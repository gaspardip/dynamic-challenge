import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config = {
  config: { intialColorMode: "dark", useSystemColorMode: false },
} as ThemeConfig;

export const theme = extendTheme(config);
