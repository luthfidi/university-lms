import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";

const StudentUniversityDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={4}>
        My University Dashboard
      </Heading>
      <Text mb={4}>
        Welcome, {user?.firstName}! This is the student dashboard for the
        University module.
      </Text>
      <Text>This page will display:</Text>
      <Box pl={5} mt={2}>
        <Text>• KRS Status</Text>
        <Text>• Tuition Fee Information</Text>
        <Text>• Academic Progress</Text>
        <Text>• Study Plan</Text>
        <Text>• Semester GPA</Text>
        <Text>• Important academic dates</Text>
      </Box>
    </Box>
  );
};

export default StudentUniversityDashboard;
