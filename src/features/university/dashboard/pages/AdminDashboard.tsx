import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";

const AdminUniversityDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={4}>
        University Admin Dashboard
      </Heading>
      <Text mb={4}>
        Welcome, {user?.firstName}! This is the admin dashboard for the
        University module.
      </Text>
      <Text>This page will display:</Text>
      <Box pl={5} mt={2}>
        <Text>• KRS Period Status</Text>
        <Text>• Payment Statistics</Text>
        <Text>• Academic Calendar</Text>
        <Text>• Program Enrollment Statistics</Text>
        <Text>• Faculty and Staff Management</Text>
        <Text>• Financial Reports</Text>
      </Box>
    </Box>
  );
};

export default AdminUniversityDashboard;
