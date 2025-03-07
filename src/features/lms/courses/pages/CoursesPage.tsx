import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  HStack,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// Mock data for courses
const courses = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    lecturer: "Dr. Jane Smith",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 65,
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    lecturer: "Prof. Robert Johnson",
    type: "LEC",
    credits: 4,
    semester: "Odd 2024/2025",
    progress: 45,
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    lecturer: "Dr. Emily Williams",
    type: "LEC",
    credits: 2,
    semester: "Odd 2024/2025",
    progress: 80,
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    lecturer: "Michael Chen",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 70,
  },
  {
    id: "phys101",
    code: "PHYS101",
    name: "Physics I",
    lecturer: "Dr. Alan Parker",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 55,
  },
  {
    id: "phys101l",
    code: "PHYS101L",
    name: "Physics I Lab",
    lecturer: "Sarah Johnson",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 60,
  },
];

const CoursesPage = () => {
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          My Courses
        </Heading>
        <Text color="gray.500">
          View all your current courses and access learning materials
        </Text>
      </Box>

      {/* Filters & Search */}
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={6}
        gap={4}
        align={{ base: "stretch", md: "center" }}
      >
        <InputGroup maxW={{ md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Search courses" />
        </InputGroup>

        <Flex
          flex={{ md: 1 }}
          gap={4}
          direction={{ base: "column", sm: "row" }}
        >
          <Select placeholder="All Semesters" defaultValue="odd-2024">
            <option value="odd-2024">Odd Semester 2024/2025</option>
            <option value="even-2023">Even Semester 2023/2024</option>
            <option value="odd-2023">Odd Semester 2023/2024</option>
          </Select>

          <Select placeholder="All Types">
            <option value="lec">Lecture (LEC)</option>
            <option value="lab">Laboratory (LAB)</option>
          </Select>
        </Flex>
      </Flex>

      {/* Courses Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {courses.map((course) => (
          <Card
            key={course.id}
            bg={cardBg}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/lms/courses/${course.id}`)}
          >
            <Box
              h="8px"
              bg={
                course.type === "LEC"
                  ? "brand.primary.500"
                  : "brand.secondary.500"
              }
            />
            <CardBody p={5}>
              <Stack spacing={4}>
                <Flex justify="space-between" align="start">
                  <HStack spacing={2}>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color="brand.primary.700"
                    >
                      {course.code}
                    </Text>
                    <Badge
                      colorScheme={course.type === "LEC" ? "blue" : "teal"}
                    >
                      {course.type}
                    </Badge>
                  </HStack>
                  <Text fontWeight="medium">{course.credits} Credits</Text>
                </Flex>

                <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                  {course.name}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  Lecturer: {course.lecturer}
                </Text>

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">
                    Progress: {course.progress}%
                  </Text>

                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lms/courses/${course.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CoursesPage;
