import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg={bgColor}
      p={4}
    >
      <VStack
        spacing={6}
        bg={borderColor}
        p={8}
        borderRadius="lg"
        boxShadow="md"
        maxW="md"
        textAlign="center"
      >
        <Heading size="xl">404</Heading>
        <Text fontSize="2xl" fontWeight="bold">
          Page Not Found
        </Text>
        <Text color="gray.500">
          The page you are looking for doesn't exist or has been moved.
        </Text>

        <Image
          src="https://via.placeholder.com/300x200?text=Not+Found"
          alt="Page not found"
          borderRadius="md"
        />

        <Button
          colorScheme="blue"
          onClick={() => navigate("/university")}
          size="lg"
          width="full"
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
