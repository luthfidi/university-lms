import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Admin Dashboard
      </Heading>
      <Text mb={4}>
        Welcome, {user?.firstName}! This is the admin dashboard for the LMS
        module.
      </Text>
      <Text>This page will display:</Text>
      <Box pl={5} mt={2}>
        <Text>• System overview statistics</Text>
        <Text>• Active users metrics</Text>
        <Text>• System usage analytics</Text>
        <Text>• Error logs and system health</Text>
        <Text>• Quick action buttons for common admin tasks</Text>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
