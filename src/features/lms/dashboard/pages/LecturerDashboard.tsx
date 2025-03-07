import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";

const LecturerDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Lecturer Dashboard
      </Heading>
      <Text mb={4}>
        Welcome, {user?.firstName}! This is the lecturer dashboard for the LMS
        module.
      </Text>
      <Text>This page will display:</Text>
      <Box pl={5} mt={2}>
        <Text>• Overview statistics for classes taught</Text>
        <Text>• Today's upcoming classes</Text>
        <Text>• Recent submissions that need grading</Text>
        <Text>• Quick links to assignments that need grading</Text>
        <Text>• Calendar view for teaching schedule</Text>
      </Box>
    </Box>
  );
};

export default LecturerDashboard;
