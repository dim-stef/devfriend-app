import "../styles/globals.css";
import "../styles/prism.css";
import "../styles/prismoverrides.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider, Container, DarkMode } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#1b1924",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
})
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <QueryClientProvider client={queryClient}>
          <Container w="800" maxW="800" mt="10">
            <Component {...pageProps} />
          </Container>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DarkMode>
    </ChakraProvider>
  );
}
export default MyApp;
