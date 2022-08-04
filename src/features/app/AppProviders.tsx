import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, StrictMode } from "react";
import { MathlerProvider } from "~/context/MathlerContext";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StrictMode>
      <ChakraProvider>
        <MathlerProvider>{children}</MathlerProvider>
      </ChakraProvider>
    </StrictMode>
  );
};
