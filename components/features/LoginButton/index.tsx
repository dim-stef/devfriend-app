import { useQueryClient, useQuery } from "react-query";
import { Button } from "@chakra-ui/button";

function LoginButton() {
  return (
    <Button m={4} mb={7} colorScheme="blue">
      Login
    </Button>
  );
}

export default LoginButton;
