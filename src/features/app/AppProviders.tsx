import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ReactNode, StrictMode } from "react";
import { MathlerProvider } from "~/context/MathlerContext";
import { theme } from "./theme";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <MathlerProvider>{children}</MathlerProvider>
      </ChakraProvider>
    </StrictMode>
  );
};
