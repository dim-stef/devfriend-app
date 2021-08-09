import "../styles/globals.css";
import "../styles/prism.css";
import "../styles/prismoverrides.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  ChakraProvider,
  Container,
  DarkMode,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { extendTheme } from "@chakra-ui/react";
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
});
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  function onStarClick(){
    router.push('/');
  }

  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <QueryClientProvider client={queryClient}>
          <Flex w="100%" justifyContent="center" alignItems="center" h="60px" position="fixed" top="0"
          bg="#1b1924">
            <Flex w="800" maxW="800">
              <IconButton
                onClick={onStarClick}
                icon={<StarIcon />}
                colorScheme="teal"
                aria-label="Home"
                variant="transparent"
              />
                
            </Flex>
          </Flex>

          <Container w="800" maxW="1200" mt="63px">
            <Component {...pageProps} />
          </Container>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DarkMode>
    </ChakraProvider>
  );
}
export default MyApp;
