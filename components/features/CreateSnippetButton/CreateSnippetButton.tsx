import { useRouter } from "next/router";
import { Container, Button, DarkMode } from "@chakra-ui/react"
import BigButton from '../../flat/BigButton';

function CreateSnippetButton(){
  const router = useRouter();

  function onClick(){
    router.push('/create');
  }

  return(
    <Container>
      <BigButton onClick={onClick} colorScheme="blue">Create snippet</BigButton>
    </Container>
  )
}

export default CreateSnippetButton;
