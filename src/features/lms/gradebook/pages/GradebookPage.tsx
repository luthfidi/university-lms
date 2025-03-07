import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Badge,
  Select,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Grid,
  GridItem,
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdTrendingUp,
  MdBook,
  MdBarChart,
  MdList,
} from "react-icons/md";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// Mock data for gradebook
const coursesData = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    finalGrade: {
      score: 87.5,
      grade: "A-",
      status: "excellent",
    },
    components: [
      {
        name: "Assignments",
        weight: 40,
        earnedScore: 35,
        items: [
          { name: "Assignment 1", score: 85, weight: 10, maxScore: 100 },
          { name: "Assignment 2", score: 90, weight: 15, maxScore: 100 },
          { name: "Assignment 3", score: 84, weight: 15, maxScore: 100 },
        ],
      },
      {
        name: "Mid-term Exam",
        weight: 30,
        earnedScore: 25.5,
        items: [
          { name: "Mid-term Exam", score: 85, weight: 30, maxScore: 100 },
        ],
      },
      {
        name: "Final Exam",
        weight: 30,
        earnedScore: 27,
        items: [{ name: "Final Exam", score: 90, weight: 30, maxScore: 100 }],
      },
    ],
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    finalGrade: {
      score: 92.8,
      grade: "A",
      status: "excellent",
    },
    components: [
      {
        name: "Lab Assignments",
        weight: 60,
        earnedScore: 54,
        items: [
          { name: "Lab 1", score: 88, weight: 15, maxScore: 100 },
          { name: "Lab 2", score: 92, weight: 15, maxScore: 100 },
          { name: "Lab 3", score: 95, weight: 15, maxScore: 100 },
          { name: "Lab 4", score: 88, weight: 15, maxScore: 100 },
        ],
      },
      {
        name: "Lab Exam",
        weight: 40,
        earnedScore: 38.8,
        items: [
          { name: "Lab Final Exam", score: 97, weight: 40, maxScore: 100 },
        ],
      },
    ],
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    type: "LEC",
    credits: 4,
    semester: "Odd 2024/2025",
    finalGrade: {
      score: 80.2,
      grade: "B+",
      status: "good",
    },
    components: [
      {
        name: "Homework",
        weight: 20,
        earnedScore: 18,
        items: [
          { name: "Homework 1", score: 95, weight: 5, maxScore: 100 },
          { name: "Homework 2", score: 88, weight: 5, maxScore: 100 },
          { name: "Homework 3", score: 92, weight: 5, maxScore: 100 },
          { name: "Homework 4", score: 85, weight: 5, maxScore: 100 },
        ],
      },
      {
        name: "Quizzes",
        weight: 20,
        earnedScore: 17,
        items: [
          { name: "Quiz 1", score: 80, weight: 10, maxScore: 100 },
          { name: "Quiz 2", score: 90, weight: 10, maxScore: 100 },
        ],
      },
      {
        name: "Mid-term Exam",
        weight: 30,
        earnedScore: 22.5,
        items: [
          { name: "Mid-term Exam", score: 75, weight: 30, maxScore: 100 },
        ],
      },
      {
        name: "Final Exam",
        weight: 30,
        earnedScore: 22.8,
        items: [{ name: "Final Exam", score: 76, weight: 30, maxScore: 100 }],
      },
    ],
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    type: "LEC",
    credits: 2,
    semester: "Odd 2024/2025",
    finalGrade: {
      score: 85.4,
      grade: "B+",
      status: "good",
    },
    components: [
      {
        name: "Essays",
        weight: 60,
        earnedScore: 51,
        items: [
          { name: "Essay 1", score: 82, weight: 15, maxScore: 100 },
          { name: "Essay 2", score: 88, weight: 20, maxScore: 100 },
          { name: "Essay 3", score: 85, weight: 25, maxScore: 100 },
        ],
      },
      {
        name: "Participation",
        weight: 10,
        earnedScore: 9.5,
        items: [
          { name: "Class Participation", score: 95, weight: 10, maxScore: 100 },
        ],
      },
      {
        name: "Final Project",
        weight: 30,
        earnedScore: 24.9,
        items: [
          { name: "Research Paper", score: 83, weight: 30, maxScore: 100 },
        ],
      },
    ],
  },
];

// Semester performance data for charts
const semesterPerformance = [
  { semester: "2023/1", gpa: 3.5 },
  { semester: "2023/2", gpa: 3.6 },
  { semester: "2024/1", gpa: 3.7 },
  { semester: "2024/2", gpa: 3.8 },
];

// Subject performance data for radar chart
const subjectPerformance = [
  { subject: "Computer Science", score: 90 },
  { subject: "Mathematics", score: 80 },
  { subject: "English", score: 85 },
  { subject: "Physics", score: 75 },
  { subject: "Humanities", score: 88 },
];

// Grade distribution for bar chart
const gradeDistribution = [
  { grade: "A", count: 2 },
  { grade: "A-", count: 1 },
  { grade: "B+", count: 2 },
  { grade: "B", count: 3 },
  { grade: "B-", count: 1 },
  { grade: "C+", count: 0 },
  { grade: "C", count: 0 },
  { grade: "D", count: 0 },
  { grade: "F", count: 0 },
];

// Helper function to determine grade color
const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "green";
  if (grade.startsWith("B")) return "blue";
  if (grade.startsWith("C")) return "yellow";
  if (grade.startsWith("D")) return "orange";
  return "red";
};

// Helper function to determine progress color
const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "green";
  if (percentage >= 80) return "blue";
  if (percentage >= 70) return "yellow";
  if (percentage >= 60) return "orange";
  return "red";
};

// Calculate GPA from grades
const calculateGPA = (courses: typeof coursesData) => {
  const gradePoints: Record<string, number> = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const points = gradePoints[course.finalGrade.grade] || 0;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
};

const GradebookPage = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0].id);
  const [selectedSemester, setSelectedSemester] = useState("Odd 2024/2025");

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Get current course data
  const currentCourse =
    coursesData.find((course) => course.id === selectedCourse) ||
    coursesData[0];

  // Filter courses by semester
  const semesterCourses = coursesData.filter(
    (course) => course.semester === selectedSemester
  );

  // Calculate semester GPA
  const semesterGPA = calculateGPA(semesterCourses);

  // Calculate semester credits
  const semesterCredits = semesterCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Gradebook
        </Heading>
        <Text color="gray.500">
          View your academic performance and track your grades
        </Text>
      </Box>

      {/* Semester Selector */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            gap={4}
          >
            <Box>
              <Text fontWeight="bold" mb={2}>
                Academic Period
              </Text>
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                maxW="400px"
              >
                <option value="Odd 2024/2025">Odd Semester 2024/2025</option>
                <option value="Even 2023/2024">Even Semester 2023/2024</option>
                <option value="Odd 2023/2024">Odd Semester 2023/2024</option>
              </Select>
            </Box>

            <HStack spacing={4}>
              <Button
                leftIcon={<Icon as={MdBarChart} />}
                colorScheme="blue"
                variant="outline"
                onClick={() => navigate("/university/academic-history")}
              >
                Academic History
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Semester Summary */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Stat>
              <StatLabel>Semester GPA</StatLabel>
              <StatNumber>{semesterGPA}</StatNumber>
              <StatHelpText>
                <HStack>
                  <Icon as={MdTrendingUp} color="green.500" />
                  <Text>+0.1 from last semester</Text>
                </HStack>
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Credits Taken</StatLabel>
              <StatNumber>{semesterCredits}</StatNumber>
              <StatHelpText>This semester</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Credits Completed</StatLabel>
              <StatNumber>68</StatNumber>
              <StatHelpText>Out of 144 required</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Cumulative GPA</StatLabel>
              <StatNumber>3.70</StatNumber>
              <StatHelpText>Overall performance</StatHelpText>
            </Stat>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Grades</Tab>
          <Tab>Course Details</Tab>
          <Tab>Performance</Tab>
        </TabList>

        <TabPanels>
          {/* Grades Tab */}
          <TabPanel px={0} pt={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Course</Th>
                  <Th>Code</Th>
                  <Th>Type</Th>
                  <Th>Credits</Th>
                  <Th>Score</Th>
                  <Th>Grade</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {semesterCourses.map((course) => (
                  <Tr
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    bg={course.id === selectedCourse ? "blue.50" : undefined}
                  >
                    <Td fontWeight="medium">{course.name}</Td>
                    <Td>{course.code}</Td>
                    <Td>
                      <Badge
                        colorScheme={course.type === "LEC" ? "blue" : "teal"}
                      >
                        {course.type}
                      </Badge>
                    </Td>
                    <Td>{course.credits}</Td>
                    <Td>
                      <HStack>
                        <Text>{course.finalGrade.score.toFixed(1)}</Text>
                        <Progress
                          value={course.finalGrade.score}
                          size="xs"
                          width="60px"
                          colorScheme={getProgressColor(
                            course.finalGrade.score
                          )}
                          borderRadius="full"
                        />
                      </HStack>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={getGradeColor(course.finalGrade.grade)}
                        fontSize="md"
                        px={2}
                        py={0.5}
                      >
                        {course.finalGrade.grade}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          course.finalGrade.status === "excellent"
                            ? "green"
                            : course.finalGrade.status === "good"
                              ? "blue"
                              : course.finalGrade.status === "average"
                                ? "yellow"
                                : "red"
                        }
                      >
                        {course.finalGrade.status.charAt(0).toUpperCase() +
                          course.finalGrade.status.slice(1)}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          {/* Course Details Tab */}
          <TabPanel px={0} pt={5}>
            <Flex
              mb={6}
              bg="blue.50"
              p={4}
              borderRadius="md"
              borderLeftWidth="4px"
              borderLeftColor="blue.500"
            >
              <Icon as={MdBook} boxSize={6} color="blue.600" mr={3} />
              <Box>
                <HStack mb={1}>
                  <Heading size="md" color="blue.700">
                    {currentCourse.code}
                  </Heading>
                  <Badge
                    colorScheme={currentCourse.type === "LEC" ? "blue" : "teal"}
                  >
                    {currentCourse.type}
                  </Badge>
                  <Text color="blue.600">{currentCourse.credits} Credits</Text>
                </HStack>
                <Heading size="lg" mb={2}>
                  {currentCourse.name}
                </Heading>
              </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
              <Card variant="outline">
                <CardBody textAlign="center">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Final Score
                  </Text>
                  <Heading
                    size="3xl"
                    color={getProgressColor(currentCourse.finalGrade.score)}
                  >
                    {currentCourse.finalGrade.score.toFixed(1)}
                  </Heading>
                  <Text mt={2}>out of 100</Text>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardBody textAlign="center">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Grade
                  </Text>
                  <Heading
                    size="3xl"
                    color={getGradeColor(currentCourse.finalGrade.grade)}
                  >
                    {currentCourse.finalGrade.grade}
                  </Heading>
                  <Text mt={2} textTransform="capitalize">
                    {currentCourse.finalGrade.status}
                  </Text>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardBody textAlign="center">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Grade Points
                  </Text>
                  <Heading size="3xl">
                    {currentCourse.finalGrade.grade === "A"
                      ? "4.0"
                      : currentCourse.finalGrade.grade === "A-"
                        ? "3.7"
                        : currentCourse.finalGrade.grade === "B+"
                          ? "3.3"
                          : currentCourse.finalGrade.grade === "B"
                            ? "3.0"
                            : currentCourse.finalGrade.grade === "B-"
                              ? "2.7"
                              : "0.0"}
                  </Heading>
                  <Text mt={2}>{currentCourse.credits} credit(s)</Text>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Box mb={6}>
              <Heading size="md" mb={4}>
                Grade Breakdown
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Component</Th>
                    <Th>Weight</Th>
                    <Th>Your Score</Th>
                    <Th>Weighted Score</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentCourse.components.map((component, index) => (
                    <Tr key={index}>
                      <Td fontWeight="medium">{component.name}</Td>
                      <Td>{component.weight}%</Td>
                      <Td>
                        {(
                          (component.earnedScore / component.weight) *
                          100
                        ).toFixed(1)}
                        %
                      </Td>
                      <Td>
                        <HStack>
                          <Text>{component.earnedScore.toFixed(1)}</Text>
                          <Text color="gray.500">/ {component.weight}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <Popover trigger="hover" placement="left">
                          <PopoverTrigger>
                            <Button
                              size="xs"
                              leftIcon={<MdList />}
                              variant="ghost"
                            >
                              View Items
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader fontWeight="bold">
                              {component.name} Details
                            </PopoverHeader>
                            <PopoverBody>
                              <Table size="sm" variant="simple">
                                <Thead>
                                  <Tr>
                                    <Th>Item</Th>
                                    <Th>Score</Th>
                                    <Th>Weight</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {component.items.map((item, idx) => (
                                    <Tr key={idx}>
                                      <Td>{item.name}</Td>
                                      <Td>{item.score}%</Td>
                                      <Td>{item.weight}%</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Table>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                    </Tr>
                  ))}
                  <Tr fontWeight="bold">
                    <Td>Total</Td>
                    <Td>100%</Td>
                    <Td>-</Td>
                    <Td>{currentCourse.finalGrade.score.toFixed(1)}</Td>
                    <Td>-</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Score Distribution
              </Heading>
              <Card variant="outline">
                <CardBody>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={currentCourse.components.map((comp) => ({
                          name: comp.name,
                          score: (comp.earnedScore / comp.weight) * 100,
                          weight: comp.weight,
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar
                          name="Score (%)"
                          dataKey="score"
                          fill="#3182CE"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </TabPanel>

          {/* Performance Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    GPA Trend
                  </Heading>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={semesterPerformance}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 4]} />
                        <RechartsTooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="gpa"
                          stroke="#3182CE"
                          activeDot={{ r: 8 }}
                          name="Semester GPA"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Subject Performance
                  </Heading>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={subjectPerformance}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name="Score"
                          dataKey="score"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Grade Distribution
                  </Heading>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={gradeDistribution}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar
                          name="Courses"
                          dataKey="count"
                          fill="#4299E1"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Academic Summary
                  </Heading>
                  <VStack align="stretch" spacing={6}>
                    <Box>
                      <Text fontWeight="bold" mb={2}>
                        Credits
                      </Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Completed
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              68
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Required
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              144
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              This Semester
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              {semesterCredits}
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Remaining
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              76
                            </Text>
                          </VStack>
                        </GridItem>
                      </Grid>
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb={2}>
                        GPA
                      </Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              This Semester
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              {semesterGPA}
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Cumulative
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              3.70
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Highest Semester
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              3.80
                            </Text>
                          </VStack>
                        </GridItem>
                        <GridItem>
                          <VStack align="stretch" spacing={1}>
                            <Text fontSize="sm" color="gray.500">
                              Target GPA
                            </Text>
                            <Text fontSize="xl" fontWeight="bold">
                              3.75
                            </Text>
                          </VStack>
                        </GridItem>
                      </Grid>
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb={2}>
                        Graduation Projection
                      </Text>
                      <HStack spacing={4} align="center">
                        <Text fontWeight="medium">Remaining Semesters:</Text>
                        <Badge colorScheme="blue" fontSize="md" px={2}>
                          4
                        </Badge>
                      </HStack>
                      <HStack spacing={4} align="center" mt={2}>
                        <Text fontWeight="medium">Expected Graduation:</Text>
                        <Badge colorScheme="green" fontSize="md" px={2}>
                          June 2026
                        </Badge>
                      </HStack>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default GradebookPage;
