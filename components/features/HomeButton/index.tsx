import { useRouter } from "next/router";
import { Container, Button, DarkMode, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import BigButton from "../../flat/BigButton";

function HomeButton() {
  const router = useRouter();

  function onStarClick() {
    router.push("/");
  }

  return (
    <Container>
      <BigButton onClick={onStarClick} colorScheme="blue">
        <IconButton
          icon={<StarIcon />}
          colorScheme="teal"
          aria-label="Home"
          variant="transparent"
        />
      </BigButton>
    </Container>
  );
}

export default HomeButton;
