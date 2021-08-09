import { Button, ButtonProps } from "@chakra-ui/button";


function BigButton(props: ButtonProps){
  return(
    <Button colorScheme="blue"  h="100px" w="100px" {...props} >
      Button
    </Button>
  )
}

export default BigButton;
