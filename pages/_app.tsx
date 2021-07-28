import "../styles/globals.css";
import "../styles/prism.css";
import "../styles/prismoverrides.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider, DarkMode } from "@chakra-ui/react"

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DarkMode>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DarkMode>
    </ChakraProvider>
  );
}
export default MyApp;
