import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Badge,
  Heading
} from "@chakra-ui/react";

function LoginCard() {
  return (
    <Box
      maxW="md"
      borderWidth="2px"
      borderColor="black"
      borderRadius="lg"
      p="50"
    >
      <Heading fontSize='35px'className="font-bold pb-6">Login Page</Heading>
      <FormControl id="email" mb="4">
        <FormLabel>Email address</FormLabel>
        <Input type="email" colorScheme="grey.500" size="md" style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }} />
      </FormControl>
      <FormControl id="password" mt='20' mb="20">
        <FormLabel>Password</FormLabel>
        <Input type="email" colorScheme="grey.500" size="md" style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }} />
      </FormControl>
      <Button colorScheme="blue">Login</Button>
    </Box>
  );
}

export default LoginCard;
