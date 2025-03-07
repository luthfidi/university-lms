import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";

const LecturerUniversityDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={4}>
        My University Dashboard
      </Heading>
      <Text mb={4}>
        Welcome, {user?.firstName}! This is the lecturer dashboard for the
        University module.
      </Text>
      <Text>This page will display:</Text>
      <Box pl={5} mt={2}>
        <Text>• Salary Information</Text>
        <Text>• Teaching Hours</Text>
        <Text>• Tax Information</Text>
        <Text>• Benefits and Allowances</Text>
        <Text>• Teaching Load Statistics</Text>
      </Box>
    </Box>
  );
};

export default LecturerUniversityDashboard;
