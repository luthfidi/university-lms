import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Select,
  Center,
  Image,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuthStore from "@/store/authStore";
import { User, UserRole } from "@/types/global";

// University Logo placeholder (replace with actual logo)
const UNIVERSITY_LOGO =
  "https://via.placeholder.com/150x80?text=University.com";

// Login form validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["student", "lecturer", "admin"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login with mock data
      const mockUserData: Record<UserRole, User> = {
        student: {
          id: "std-001",
          username: data.username,
          email: "student@university.com",
          role: "student",
          firstName: "John",
          lastName: "Doe",
          isActive: true,
        },
        lecturer: {
          id: "lec-001",
          username: data.username,
          email: "lecturer@university.com",
          role: "lecturer",
          firstName: "Jane",
          lastName: "Smith",
          isActive: true,
        },
        admin: {
          id: "adm-001",
          username: data.username,
          email: "admin@university.com",
          role: "admin",
          firstName: "Admin",
          lastName: "User",
          isActive: true,
        },
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Select user based on role
      const user = mockUserData[data.role];

      // Simulate JWT token
      const token = `mock-jwt-token-${Date.now()}`;

      // Update auth store
      login(user, token);

      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to dashboard based on role
      navigate(`/lms/dashboard`);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg={borderColor}
      py={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md">
        <Box
          bg={bgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            {/* Logo */}
            <Center mb={4}>
              <Image src={UNIVERSITY_LOGO} alt="University Logo" />
            </Center>

            {/* Heading */}
            <VStack spacing={1}>
              <Heading size="lg" textAlign="center">
                Welcome Back
              </Heading>
              <Text color="gray.500" fontSize="sm" textAlign="center">
                Sign in to your account
              </Text>
            </VStack>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="sm"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.role}>
                  <FormLabel htmlFor="role">Login As</FormLabel>
                  <Select
                    id="role"
                    placeholder="Select role"
                    {...register("role")}
                  >
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="admin">Administrator</option>
                  </Select>
                  <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isSubmitting}
                  loadingText="Signing in..."
                  mt={4}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            {/* Footer */}
            <Text fontSize="xs" color="gray.500" textAlign="center" mt={4}>
              &copy; {new Date().getFullYear()} University.com. All rights
              reserved.
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
