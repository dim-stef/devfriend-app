import { useRouter } from "next/router";
import { Container, Button, DarkMode } from "@chakra-ui/react"

function CreateSnippetButton(){
  const router = useRouter();

  function onClick(){
    router.push('/create');
  }

  return(
    <Container>
      <Button onClick={onClick} colorScheme="blue">Create snippet</Button>
    </Container>
  )
}

export default CreateSnippetButton;
