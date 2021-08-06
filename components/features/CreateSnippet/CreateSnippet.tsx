import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  RadioGroup,
  Stack,
  Textarea,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  DarkMode,
  Select,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import ogs from 'open-graph-scraper-lite'
import { LanguageListInterface } from "./types";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import languageOptions from "./languageOptions";
import { useCreateSnippet } from "./queries/useCreateSnippet";

function validURL(str: string): boolean {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function LanguageList({
  selectedItem,
  setSelectedItem,
}: LanguageListInterface) {
  return (
    <Stack spacing={3}>
      <Select
        size="lg"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        {languageOptions.map((option)=>{
          return <option key={option.value} value={option.value}>{option.title}</option>
        })}
      </Select>
    </Stack>
  );
}

function CreateSnippet() {
  const toast = useToast()
  const [option, setOption] = useState("code");
  const [selectedLanguage, setSelectedLanguage] = useState<string | any>("js");
  const [body, setBody] = useState("");
  const [isGistValid, setGistValid] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const mutation = useCreateSnippet();

  async function handleCreateClick(){
    mutation.mutate({type: option, body: body, language: selectedLanguage})
    if(mutation.isSuccess){
      toast({
        title: "Snippet created.",
        description: "This snippet was created for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
  
    if(mutation.isError){
      toast({
        title: "Snippet was not created.",
        description: "There was an error while creating your snippet.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  function handleCodeEditorTextChange(code: string){
    if(code){
      setButtonDisabled(false);
      setBody(code)
    }else{
      setButtonDisabled(true);
    }
  }

  function handleTextAreaTextChange(e: any){
    if(e.target.value){
      setButtonDisabled(false);
      setBody(e.target.value)
    }else{
      setButtonDisabled(true);
    }
  }

  function onGistTextChange(e: any){
    if(!e.target.value.startsWith('https://gist.github.com/')){
      setGistValid(false);
      setInvalid(true);

      setButtonDisabled(true);
    }else{
      setGistValid(true);
      setInvalid(false);

      setButtonDisabled(false);
      setBody(e.target.value);
    }
  }

  async function onLinkTextChange(e: any){ 
    if(e.target.value){
      if(validURL(e.target.value)){
        setInvalid(false);
        // const options = { url: e.target.value }
        // setButtonDisabled(false);
        // const response = await ogs(options);
        // console.log("response", response.result);
      }else{
        setInvalid(true);
      }
    }else{
      setInvalid(true);
      setButtonDisabled(true);
    }
  }

  console.log("isGistValid", isGistValid)
  return (
    <Box>
      <RadioGroup mb={6} onChange={setOption} value={option}>
        <Stack direction="row" spacing={5}>
          <Radio value="code">Code</Radio>
          <Radio value="gist">Gist</Radio>
          <Radio value="link">Link</Radio>
          <Radio value="text">Text</Radio>
        </Stack>
      </RadioGroup>
      {option == "code" && (
        <Stack>
          <LanguageList
            selectedItem={selectedLanguage}
            setSelectedItem={setSelectedLanguage}
          />
          <Editor
            placeholder="Add your code here"
            value={body}
            onValueChange={handleCodeEditorTextChange}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </Stack>
      )}
      {option == "text" && (
        <DarkMode>
          <Textarea onChange={handleTextAreaTextChange} placeholder="Stuff" size="sm" resize="vertical" />
        </DarkMode>
      )}
      {option == "gist" && (
        <Input isInvalid={isInvalid} onChange={onGistTextChange} placeholder="Add your gist link here" size="lg" />
      )}
      {option == "link" && (
        <Input isInvalid={isInvalid} onChange={onLinkTextChange} placeholder="Add your link here" size="lg" />
      )}
      <Flex w="100%" mt="10" justifyContent="center" alignItems="center">
        <Button onClick={handleCreateClick} colorScheme="blue" isDisabled={isButtonDisabled} isLoading={mutation.isLoading}>Create</Button>
      </Flex>
    </Box>
  );
}

export default CreateSnippet;
