import { Button, ButtonProps } from "@chakra-ui/button";


function BigButton(props: ButtonProps){
  const {children} = props;

  return(
    <Button colorScheme="blue" h="100px" w="100px" whiteSpace="pre-wrap" {...props} >
      {children}
    </Button>
  )
}

export default BigButton;
