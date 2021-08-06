import { useEffect, useRef } from "react";
import { ChakraProvider, Box, DarkMode } from "@chakra-ui/react"
import CreateSnippet from "../components/features/CreateSnippet";

function CreateSnippetPage(){
  return(
    <Box>
      <CreateSnippet />
    </Box>
  )
}

export default CreateSnippetPage;
