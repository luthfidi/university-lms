import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  Divider,
  SimpleGrid, 
  Flex,
  HStack,
  VStack,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  useColorModeValue,
  Avatar,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tooltip,
} from "@chakra-ui/react";
import { DownloadIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  MdSchool,
  MdHistory,
  MdBarChart,
  MdTimeline,
  MdCheck,
  MdAssignment,
  MdGrade,
  MdPrint,
} from "react-icons/md";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuthStore from "@/store/authStore";

// Mock data for academic history
interface Course {
  id: string;
  code: string;
  name: string;
  type: string;
  credits: number;
  grade: string;
  score: number | null;
  gradePoint: number | null;
}

interface Semester {
  id: string;
  period: string;
  status: string;
  credits: number;
  gpa: number | null;
  courses: Course[];
}

const academicData = {
  student: {
    id: "STD123456",
    name: "John Doe",
    program: "Computer Science",
    faculty: "Faculty of Computer Science",
    entryYear: 2022,
    graduationYear: 2026,
    status: "Active",
    totalCredits: 144,
    completedCredits: 68,
    currentGPA: 3.7,
  },
  semesters: [
    {
      id: "SEM1",
      period: "2022/2023 - Odd",
      status: "Completed",
      credits: 21,
      gpa: 3.65,
      courses: [
        {
          id: "CS101",
          code: "CS101",
          name: "Introduction to Computer Science",
          type: "LEC",
          credits: 3,
          grade: "A",
          score: 90,
          gradePoint: 4.0,
        },
        {
          id: "CS101L",
          code: "CS101L",
          name: "Introduction to Computer Science Lab",
          type: "LAB",
          credits: 1,
          grade: "A",
          score: 95,
          gradePoint: 4.0,
        },
        {
          id: "MATH101",
          code: "MATH101",
          name: "Calculus I",
          type: "LEC",
          credits: 4,
          grade: "A-",
          score: 85,
          gradePoint: 3.7,
        },
        {
          id: "ENG101",
          code: "ENG101",
          name: "English Composition",
          type: "LEC",
          credits: 3,
          grade: "B+",
          score: 82,
          gradePoint: 3.3,
        },
        {
          id: "PHYS101",
          code: "PHYS101",
          name: "Physics I",
          type: "LEC",
          credits: 3,
          grade: "B+",
          score: 83,
          gradePoint: 3.3,
        },
        {
          id: "PHYS101L",
          code: "PHYS101L",
          name: "Physics I Lab",
          type: "LAB",
          credits: 1,
          grade: "A-",
          score: 87,
          gradePoint: 3.7,
        },
        {
          id: "PE101",
          code: "PE101",
          name: "Physical Education I",
          type: "LEC",
          credits: 2,
          grade: "A",
          score: 92,
          gradePoint: 4.0,
        },
        {
          id: "UNIV101",
          code: "UNIV101",
          name: "University Life and Study Skills",
          type: "LEC",
          credits: 2,
          grade: "A",
          score: 95,
          gradePoint: 4.0,
        },
      ],
    },
    {
      id: "SEM2",
      period: "2022/2023 - Even",
      status: "Completed",
      credits: 22,
      gpa: 3.72,
      courses: [
        {
          id: "CS102",
          code: "CS102",
          name: "Object Oriented Programming",
          type: "LEC",
          credits: 3,
          grade: "A",
          score: 92,
          gradePoint: 4.0,
        },
        {
          id: "CS102L",
          code: "CS102L",
          name: "Object Oriented Programming Lab",
          type: "LAB",
          credits: 1,
          grade: "A",
          score: 90,
          gradePoint: 4.0,
        },
        {
          id: "MATH102",
          code: "MATH102",
          name: "Calculus II",
          type: "LEC",
          credits: 4,
          grade: "B+",
          score: 84,
          gradePoint: 3.3,
        },
        {
          id: "ENG102",
          code: "ENG102",
          name: "English for Academic Purposes",
          type: "LEC",
          credits: 3,
          grade: "A-",
          score: 88,
          gradePoint: 3.7,
        },
        {
          id: "PHYS102",
          code: "PHYS102",
          name: "Physics II",
          type: "LEC",
          credits: 3,
          grade: "A-",
          score: 87,
          gradePoint: 3.7,
        },
        {
          id: "PHYS102L",
          code: "PHYS102L",
          name: "Physics II Lab",
          type: "LAB",
          credits: 1,
          grade: "A",
          score: 93,
          gradePoint: 4.0,
        },
        {
          id: "PE102",
          code: "PE102",
          name: "Physical Education II",
          type: "LEC",
          credits: 2,
          grade: "A",
          score: 94,
          gradePoint: 4.0,
        },
        {
          id: "DS101",
          code: "DS101",
          name: "Discrete Mathematics",
          type: "LEC",
          credits: 3,
          grade: "B+",
          score: 83,
          gradePoint: 3.3,
        },
      ],
    },
    {
      id: "SEM3",
      period: "2023/2024 - Odd",
      status: "Completed",
      credits: 21,
      gpa: 3.81,
      courses: [
        {
          id: "CS201",
          code: "CS201",
          name: "Data Structures",
          type: "LEC",
          credits: 3,
          grade: "A",
          score: 94,
          gradePoint: 4.0,
        },
        {
          id: "CS201L",
          code: "CS201L",
          name: "Data Structures Lab",
          type: "LAB",
          credits: 1,
          grade: "A",
          score: 95,
          gradePoint: 4.0,
        },
        {
          id: "CS205",
          code: "CS205",
          name: "Web Programming",
          type: "LEC",
          credits: 3,
          grade: "A-",
          score: 88,
          gradePoint: 3.7,
        },
        {
          id: "CS215",
          code: "CS215",
          name: "Algorithm Analysis",
          type: "LEC",
          credits: 3,
          grade: "B+",
          score: 84,
          gradePoint: 3.3,
        },
        {
          id: "MATH201",
          code: "MATH201",
          name: "Linear Algebra",
          type: "LEC",
          credits: 3,
          grade: "A-",
          score: 87,
          gradePoint: 3.7,
        },
        {
          id: "CS210",
          code: "CS210",
          name: "Computer Architecture",
          type: "LEC",
          credits: 3,
          grade: "A",
          score: 92,
          gradePoint: 4.0,
        },
        {
          id: "HUM201",
          code: "HUM201",
          name: "Ethics and Professionalism",
          type: "LEC",
          credits: 2,
          grade: "A",
          score: 95,
          gradePoint: 4.0,
        },
        {
          id: "REL201",
          code: "REL201",
          name: "Religion and Society",
          type: "LEC",
          credits: 2,
          grade: "A",
          score: 90,
          gradePoint: 4.0,
        },
      ],
    },
    {
      id: "SEM4",
      period: "2023/2024 - Even",
      status: "In Progress",
      credits: 21,
      gpa: null,
      courses: [
        {
          id: "CS301",
          code: "CS301",
          name: "Database Systems",
          type: "LEC",
          credits: 3,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "CS301L",
          code: "CS301L",
          name: "Database Systems Lab",
          type: "LAB",
          credits: 1,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "CS305",
          code: "CS305",
          name: "Software Engineering",
          type: "LEC",
          credits: 3,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "CS310",
          code: "CS310",
          name: "Operating Systems",
          type: "LEC",
          credits: 3,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "CS320",
          code: "CS320",
          name: "Computer Networks",
          type: "LEC",
          credits: 3,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "MATH301",
          code: "MATH301",
          name: "Statistics and Probability",
          type: "LEC",
          credits: 3,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "ENG301",
          code: "ENG301",
          name: "Technical Writing",
          type: "LEC",
          credits: 2,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
        {
          id: "HUM301",
          code: "HUM301",
          name: "Ethics in Computing",
          type: "LEC",
          credits: 2,
          grade: "IP",
          score: null,
          gradePoint: null,
        },
      ],
    },
  ],
  gpaProgression: [
    { semester: "2022/2023 - Odd", gpa: 3.65, cumulative: 3.65 },
    { semester: "2022/2023 - Even", gpa: 3.72, cumulative: 3.68 },
    { semester: "2023/2024 - Odd", gpa: 3.81, cumulative: 3.7 },
  ],
  creditDistribution: [
    { category: "Core Courses", completed: 40, required: 90 },
    { category: "Electives", completed: 12, required: 24 },
    { category: "General Education", completed: 16, required: 30 },
  ],
  courseCategories: [
    { name: "Core Courses", percentage: 44.4 },
    { name: "Electives", percentage: 50.0 },
    { name: "General Education", percentage: 53.3 },
  ],
};

// Prepared data for the Grade Distribution chart
const gradeDistributionData = [
  { grade: "A", count: 11 },
  { grade: "A-", count: 5 },
  { grade: "B+", count: 5 },
  { grade: "B", count: 0 },
  { grade: "B-", count: 0 },
  { grade: "C+", count: 0 },
  { grade: "C", count: 0 },
  { grade: "D", count: 0 },
  { grade: "F", count: 0 },
];

// Function to determine grade color
const getGradeColor = (grade: string) => {
  if (grade === "IP") return "gray";
  if (grade === "A" || grade === "A-") return "green";
  if (grade === "B+" || grade === "B" || grade === "B-") return "blue";
  if (grade === "C+" || grade === "C" || grade === "C-") return "yellow";
  if (grade === "D" || grade === "D-") return "orange";
  return "red";
};

// Function to format number with 2 decimals
const formatNumber = (num: number | null) => {
  if (num === null) return "-";
  return num.toFixed(2);
};

// Colors for the charts
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'
];

const AcademicHistoryPage = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const { user } = useAuthStore();

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const chartGridColor = useColorModeValue("#e0e0e0", "#4a5568");
  const chartTextColor = useColorModeValue("#666", "#ddd");

  // Filter semesters based on selection
  const filteredSemesters =
    selectedSemester === "all"
      ? academicData.semesters
      : academicData.semesters.filter(
          (semester) => semester.id === selectedSemester
        );

  // Calculate total credits
  const totalCredits = academicData.semesters
    .filter((semester) => semester.status === "Completed")
    .reduce((total, semester) => total + semester.credits, 0);

  // Calculate weighted grade points (credits * grade for each course)
  const weightedGradePoints = academicData.semesters
    .filter((semester) => semester.status === "Completed")
    .reduce((semesterTotal, semester) => {
      const coursesTotal = semester.courses.reduce(
        (courseTotal, course) =>
          courseTotal + course.credits * (course.gradePoint || 0),
        0
      );
      return semesterTotal + coursesTotal;
    }, 0);

  // Calculate CGPA
  const cgpa = totalCredits > 0 ? weightedGradePoints / totalCredits : 0;

  // Grade distribution data based on completed courses from all semesters
  const gradesCount = academicData.semesters
    .filter((s) => s.status === "Completed")
    .flatMap((s) => s.courses)
    .reduce(
      (acc, course) => {
        if (course.grade in acc) {
          acc[course.grade] += 1;
        }
        return acc;
      },
      { A: 0, "A-": 0, "B+": 0, B: 0, "B-": 0, "C+": 0, C: 0, "C-": 0, D: 0, F: 0 } as Record<string, number>
    );

  // Transform credit distribution data for the pie chart
  const creditDistributionChartData = academicData.creditDistribution.map(item => ({
    name: item.category,
    value: item.completed,
    required: item.required,
    percentage: Math.round((item.completed / item.required) * 100)
  }));

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2} color={headingColor}>
          Academic History
        </Heading>
        <Text color={textColor}>
          View your transcript, academic history, and study progress
        </Text>
      </Box>

      {/* Student Information */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <VStack align="stretch" spacing={1}>
                <HStack>
                  <Text fontWeight="bold" color={headingColor}>Name:</Text>
                  <Text color={textColor}>{academicData.student.name}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color={headingColor}>Student ID:</Text>
                  <Text color={textColor}>{academicData.student.id}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color={headingColor}>Program:</Text>
                  <Text color={textColor}>{academicData.student.program}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color={headingColor}>Faculty:</Text>
                  <Text color={textColor}>{academicData.student.faculty}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color={headingColor}>Entry Year:</Text>
                  <Text color={textColor}>{academicData.student.entryYear}</Text>
                </HStack>
              </VStack>
            </Box>
            <Box>
              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
                <Stat>
                  <StatLabel color={textColor}>GPA</StatLabel>
                  <StatNumber color="green.500">{cgpa.toFixed(2)}</StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="green">Excellent</Badge>
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color={textColor}>Total Credits</StatLabel>
                  <StatNumber color={headingColor}>{academicData.student.completedCredits}</StatNumber>
                  <StatHelpText>
                    {Math.round(
                      (academicData.student.completedCredits /
                        academicData.student.totalCredits) *
                        100
                    )}
                    % completed
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color={textColor}>Status</StatLabel>
                  <StatNumber fontSize="xl">
                    <Badge
                      colorScheme={
                        academicData.student.status === "Active"
                          ? "green"
                          : "red"
                      }
                      fontSize="md"
                      p={1}
                    >
                      {academicData.student.status}
                    </Badge>
                  </StatNumber>
                  <StatHelpText>Semester 4</StatHelpText>
                </Stat>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Action buttons */}
      <Flex justify="space-between" mb={6} flexWrap="wrap" gap={2}>
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="blue"
          variant="outline"
        >
          Download Transcript
        </Button>
        <HStack spacing={2} flexWrap="wrap">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
            >
              Select Semester
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSelectedSemester("all")}>
                All Semesters
              </MenuItem>
              <MenuDivider />
              {academicData.semesters.map((semester) => (
                <MenuItem
                  key={semester.id}
                  onClick={() => setSelectedSemester(semester.id)}
                >
                  {semester.period}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Print transcript"
            icon={<MdPrint />}
            variant="outline"
          />
        </HStack>
      </Flex>

      {/* Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Transcript</Tab>
          <Tab>Academic Analysis</Tab>
          <Tab>Study Progress</Tab>
        </TabList>

        <TabPanels>
          {/* Transcript Tab */}
          <TabPanel px={0} pt={5}>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color={headingColor}>Code</Th>
                    <Th color={headingColor}>Course</Th>
                    <Th color={headingColor}>Type</Th>
                    <Th color={headingColor}>Credits</Th>
                    <Th color={headingColor}>Grade</Th>
                    <Th color={headingColor}>Points</Th>
                    <Th color={headingColor}>Semester</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredSemesters.map((semester) => (
                    <>
                      <Tr key={semester.id} bg={useColorModeValue("gray.50", "gray.700")}>
                        <Td colSpan={7} fontWeight="bold" color={headingColor}>
                          {semester.period}{" "}
                          <Badge
                            colorScheme={
                              semester.status === "Completed" ? "green" : "blue"
                            }
                            ml={2}
                          >
                            {semester.status}
                          </Badge>
                        </Td>
                      </Tr>
                      {semester.courses.map((course) => (
                        <Tr key={course.id}>
                          <Td fontWeight="medium" color={headingColor}>{course.code}</Td>
                          <Td color={textColor}>{course.name}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                course.type === "LEC" ? "blue" : "purple"
                              }
                            >
                              {course.type}
                            </Badge>
                          </Td>
                          <Td color={textColor}>{course.credits}</Td>
                          <Td>
                            <Badge colorScheme={getGradeColor(course.grade)}>
                              {course.grade}
                            </Badge>
                          </Td>
                          <Td color={textColor}>{formatNumber(course.gradePoint)}</Td>
                          <Td color={textColor}>{semester.period}</Td>
                        </Tr>
                      ))}
                      <Tr>
                        <Td colSpan={3} fontWeight="bold" textAlign="right" color={headingColor}>
                          Semester GPA:
                        </Td>
                        <Td colSpan={4} fontWeight="bold" color={headingColor}>
                          {semester.gpa !== null
                            ? semester.gpa.toFixed(2)
                            : "Not completed"}
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Box mt={6} p={4} borderWidth="1px" borderColor={borderColor} borderRadius="lg" bg={cardBg}>
              <Heading size="sm" mb={4} color={headingColor}>
                Academic Summary
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Stat>
                  <StatLabel color={textColor}>Completed Courses</StatLabel>
                  <StatNumber color={headingColor}>
                    {academicData.semesters
                      .filter((s) => s.status === "Completed")
                      .reduce(
                        (count, semester) => count + semester.courses.length,
                        0
                      )}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel color={textColor}>Total Credits</StatLabel>
                  <StatNumber color={headingColor}>{totalCredits}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel color={textColor}>CGPA</StatLabel>
                  <StatNumber color={headingColor}>{cgpa.toFixed(2)}</StatNumber>
                </Stat>
              </SimpleGrid>
            </Box>
          </TabPanel>

          {/* Academic Analysis Tab */}
          <TabPanel px={0} pt={5}>
            <Flex
              align="center"
              mb={6}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={4}
              borderRadius="md"
              borderLeftWidth="4px"
              borderLeftColor="blue.500"
            >
              <Icon
                as={MdBarChart}
                boxSize={6}
                color={useColorModeValue("blue.600", "blue.200")}
                mr={3}
              />
              <Box>
                <Heading
                  size="lg"
                  mb={2}
                  color={useColorModeValue("gray.800", "white")}
                >
                  Academic Performance Analysis
                </Heading>
                <Text color={useColorModeValue("blue.600", "blue.200")}>
                  Comprehensive view of your academic achievements and progress
                </Text>
              </Box>
            </Flex>

            {/* GPA Summary Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardBody textAlign="center">
                  <Text fontSize="sm" color={textColor} mb={2}>
                    Current GPA
                  </Text>
                  <Heading
                    size="3xl"
                    color={
                      cgpa >= 3.5
                        ? "green.500"
                        : cgpa >= 3.0
                          ? "blue.500"
                          : cgpa >= 2.5
                            ? "yellow.500"
                            : "red.500"
                    }
                  >
                    {cgpa.toFixed(2)}
                  </Heading>
                  <Text mt={2} color={textColor}>Scale 0.00 - 4.00</Text>
                </CardBody>
              </Card>

              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardBody textAlign="center">
                  <Text fontSize="sm" color={textColor} mb={2}>
                    Credits Completed
                  </Text>
                  <Heading size="3xl" color={headingColor}>
                    {academicData.student.completedCredits}
                  </Heading>
                  <Text mt={2} color={textColor}>
                    of {academicData.student.totalCredits} required
                  </Text>
                </CardBody>
              </Card>

              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardBody textAlign="center">
                  <Text fontSize="sm" color={textColor} mb={2}>
                    Academic Standing
                  </Text>
                  <Heading size="xl" mt={2} color={headingColor}>
                    <Badge 
                      colorScheme="green" 
                      p={2} 
                      borderRadius="md"
                      fontSize="xl"
                    >
                      Excellent
                    </Badge>
                  </Heading>
                  <Text mt={2} color={textColor}>Dean's List Eligible</Text>
                </CardBody>
              </Card>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* GPA Progression Chart */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardHeader pb={0} pt={5} px={5}>
                  <Heading size="md" color={headingColor}>
                    GPA Progression
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={academicData.gpaProgression} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                        <XAxis 
                          dataKey="semester" 
                          tick={{ fill: chartTextColor }} 
                          tickMargin={10}
                          angle={-20}
                          textAnchor="end"
                        />
                        <YAxis 
                          domain={[0, 4]} 
                          tick={{ fill: chartTextColor }} 
                          tickMargin={10}
                        />
                        <RechartsTooltip 
                          formatter={(value: number) => [value.toFixed(2), "GPA"]}
                          labelFormatter={(label) => `Semester: ${label}`}
                          contentStyle={{
                            backgroundColor: useColorModeValue(
                              "#fff",
                              "#2D3748"
                            ),
                            borderColor: useColorModeValue("#ccc", "#4A5568"),
                            color: useColorModeValue("#333", "#fff"),
                          }}
                          itemStyle={{
                            color: useColorModeValue("#3182CE", "#3182CE"),
                          }}
                          labelStyle={{
                            color: useColorModeValue("#333", "#fff"),
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: useColorModeValue("#333", "#fff"),
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="gpa" 
                          stroke="#4299E1" 
                          name="Semester GPA"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cumulative" 
                          stroke="#48BB78" 
                          name="Cumulative GPA"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              {/* Grade Distribution */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardHeader pb={0} pt={5} px={5}>
                  <Heading size="md" color={headingColor}>
                    Grade Distribution
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gradeDistributionData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                        <XAxis 
                          dataKey="grade" 
                          tick={{ fill: chartTextColor }}
                        />
                        <YAxis 
                          tick={{ fill: chartTextColor }}
                          tickMargin={10}
                        />
                        <RechartsTooltip
                          formatter={(value: number) => [value, "Courses"]}
                          labelFormatter={(label) => `Grade: ${label}`}
                          contentStyle={{
                            backgroundColor: useColorModeValue(
                              "#fff",
                              "#2D3748"
                            ),
                            borderColor: useColorModeValue("#ccc", "#4A5568"),
                            color: useColorModeValue("#333", "#fff"),
                          }}
                          itemStyle={{
                            color: useColorModeValue("#3182CE", "#3182CE"),
                          }}
                          labelStyle={{
                            color: useColorModeValue("#333", "#fff"),
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          name="Number of Courses"
                        >
                          {gradeDistributionData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.grade === 'A' || entry.grade === 'A-' 
                                  ? '#48BB78' // green
                                  : entry.grade === 'B+' || entry.grade === 'B' || entry.grade === 'B-'
                                    ? '#4299E1' // blue
                                    : entry.grade === 'C+' || entry.grade === 'C' || entry.grade === 'C-'
                                      ? '#ECC94B' // yellow
                                      : entry.grade === 'D' || entry.grade === 'D-'
                                        ? '#ED8936' // orange
                                        : '#F56565' // red for F
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={6}>
              {/* Course Category Completion */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardHeader pb={0} pt={5} px={5}>
                  <Heading size="md" color={headingColor}>
                    Course Category Completion
                  </Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {academicData.courseCategories.map((category) => (
                      <Box key={category.name}>
                        <Flex justify="space-between" mb={1}>
                          <Text fontWeight="medium" color={headingColor}>{category.name}</Text>
                          <Text color={textColor}>{category.percentage.toFixed(1)}%</Text>
                        </Flex>
                        <Progress
                          value={category.percentage}
                          size="sm"
                          colorScheme={
                            category.percentage > 75
                              ? "green"
                              : category.percentage > 50
                                ? "blue"
                                : category.percentage > 25
                                  ? "yellow"
                                  : "red"
                          }
                          borderRadius="full"
                        />
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>

              {/* Credit Distribution */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardHeader pb={0} pt={5} px={5}>
                  <Heading size="md" color={headingColor}>
                    Credit Distribution
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box height="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={creditDistributionChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          labelLine={true}
                        >
                          {creditDistributionChartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: number, name: string, props: any) => {
                            const item = props.payload;
                            return [`${value}/${item.required} credits (${item.percentage}%)`, name];
                          }}
                          contentStyle={{
                            backgroundColor: useColorModeValue(
                              "#fff",
                              "#2D3748"
                            ),
                            borderColor: useColorModeValue("#ccc", "#4A5568"),
                            color: useColorModeValue("#333", "#fff"),
                          }}
                          itemStyle={{
                            color: useColorModeValue("#3182CE", "#3182CE"),
                          }}
                          labelStyle={{
                            color: useColorModeValue("#333", "#fff"),
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Academic Summary */}
            <Card variant="outline" borderColor={borderColor} bg={cardBg} mt={6}>
              <CardHeader pb={0} pt={5} px={5}>
                <Heading size="md" color={headingColor}>
                  Academic Summary
                </Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box>
                    <Text fontWeight="bold" mb={3} color={headingColor}>Time-Based Performance</Text>
                    <VStack align="stretch" spacing={2}>
                      <Flex justify="space-between">
                        <Text color={textColor}>Current Semester:</Text>
                        <HStack>
                          <Text fontWeight="medium" color={headingColor}>In Progress</Text>
                          <Badge colorScheme="blue">21 Credits</Badge>
                        </HStack>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Best Semester GPA:</Text>
                        <HStack>
                          <Text fontWeight="medium" color={headingColor}>3.81</Text>
                          <Badge colorScheme="green">2023/2024 - Odd</Badge>
                        </HStack>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Cumulative GPA Trend:</Text>
                        <Badge colorScheme="green">Improving</Badge>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Academic Standing:</Text>
                        <Badge colorScheme="green">Good Standing</Badge>
                      </Flex>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={3} color={headingColor}>Graduation Projection</Text>
                    <VStack align="stretch" spacing={2}>
                      <Flex justify="space-between">
                        <Text color={textColor}>Current Progress:</Text>
                        <Text fontWeight="medium" color={headingColor}>
                          {Math.round((academicData.student.completedCredits / academicData.student.totalCredits) * 100)}%
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Credits Remaining:</Text>
                        <Text fontWeight="medium" color={headingColor}>
                          {academicData.student.totalCredits - academicData.student.completedCredits} credits
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Expected Graduation:</Text>
                        <Badge colorScheme="blue">
                          {academicData.student.graduationYear}
                        </Badge>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color={textColor}>Honors Track:</Text>
                        <Badge colorScheme="purple">
                          Cum Laude Eligible
                        </Badge>
                      </Flex>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Study Progress Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Degree Progress */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardBody>
                  <Heading size="md" mb={4} color={headingColor}>
                    Degree Progress
                  </Heading>
                  <Box bg={useColorModeValue("gray.50", "gray.700")} p={6} borderRadius="md">
                    <VStack spacing={6} align="stretch">
                      <Box>
                        <Flex justify="space-between" mb={2}>
                          <Text fontWeight="bold" color={headingColor}>Total Progress</Text>
                          <Text fontWeight="bold" color={headingColor}>
                            {Math.round(
                              (academicData.student.completedCredits /
                                academicData.student.totalCredits) *
                                100
                            )}
                            %
                          </Text>
                        </Flex>
                        <Progress
                          value={Math.round(
                            (academicData.student.completedCredits /
                              academicData.student.totalCredits) *
                              100
                          )}
                          size="lg"
                          colorScheme="green"
                          borderRadius="full"
                        />
                      </Box>

                      <Box>
                        <HStack mb={2}>
                          <Icon as={MdSchool} color="blue.500" />
                          <Text fontWeight="bold" color={headingColor}>Graduation Expectation</Text>
                        </HStack>
                        <VStack align="stretch" pl={6} spacing={2}>
                          <Flex justify="space-between">
                            <Text color={textColor}>Graduation Year</Text>
                            <Text fontWeight="medium" color={headingColor}>
                              {academicData.student.graduationYear}
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text color={textColor}>Remaining Semesters</Text>
                            <Text fontWeight="medium" color={headingColor}>4</Text>
                          </Flex>
                        </VStack>
                      </Box>

                      <Divider borderColor={borderColor} />

                      <Box>
                        <HStack mb={2}>
                          <Icon as={MdTimeline} color="purple.500" />
                          <Text fontWeight="bold" color={headingColor}>Academic Journey Status</Text>
                        </HStack>
                        <VStack align="start" pl={6} spacing={3}>
                          <HStack>
                            <Icon
                              as={MdCheck}
                              color="green.500"
                              bg="green.100"
                              borderRadius="full"
                              p={1}
                              boxSize={6}
                            />
                            <Text color={textColor}>First Year Completed</Text>
                          </HStack>
                          <HStack>
                            <Icon
                              as={MdCheck}
                              color="green.500"
                              bg="green.100"
                              borderRadius="full"
                              p={1}
                              boxSize={6}
                            />
                            <Text color={textColor}>Core Foundation Courses Passed</Text>
                          </HStack>
                          <HStack>
                            <Icon
                              as={MdBarChart}
                              color="blue.500"
                              bg="blue.100"
                              borderRadius="full"
                              p={1}
                              boxSize={6}
                            />
                            <Text color={textColor}>Completing Intermediate Level Courses</Text>
                          </HStack>
                          <HStack opacity={0.5}>
                            <Icon
                              as={MdAssignment}
                              color="gray.500"
                              bg="gray.100"
                              borderRadius="full"
                              p={1}
                              boxSize={6}
                            />
                            <Text color={textColor}>Final Project/Thesis</Text>
                          </HStack>
                          <HStack opacity={0.5}>
                            <Icon
                              as={MdGrade}
                              color="gray.500"
                              bg="gray.100"
                              borderRadius="full"
                              p={1}
                              boxSize={6}
                            />
                            <Text color={textColor}>Graduation</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </VStack>
                  </Box>
                </CardBody>
              </Card>

              {/* Study Plan */}
              <Card variant="outline" borderColor={borderColor} bg={cardBg}>
                <CardBody>
                  <Heading size="md" mb={4} color={headingColor}>
                    Upcoming Study Plan
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <HStack bg={useColorModeValue("blue.50", "blue.900")} p={3} borderRadius="md">
                      <Icon as={MdHistory} color="blue.500" boxSize={6} />
                      <Box>
                        <Text fontWeight="bold" color={headingColor}>Next Semester</Text>
                        <Text color={textColor}>2024/2025 - Odd</Text>
                      </Box>
                    </HStack>

                    <Box>
                      <Text fontWeight="bold" mb={2} color={headingColor}>
                        Recommended Courses:
                      </Text>
                      <VStack align="stretch" spacing={2}>
                        <HStack
                          justify="space-between"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={cardBg}
                        >
                          <Text fontWeight="medium" color={headingColor}>
                            CS401 - Artificial Intelligence
                          </Text>
                          <Badge>3 Credits</Badge>
                        </HStack>
                        <HStack
                          justify="space-between"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={cardBg}
                        >
                          <Text fontWeight="medium" color={headingColor}>
                            CS405 - Mobile Programming
                          </Text>
                          <Badge>3 Credits</Badge>
                        </HStack>
                        <HStack
                          justify="space-between"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={cardBg}
                        >
                          <Text fontWeight="medium" color={headingColor}>
                            CS410 - Information Security
                          </Text>
                          <Badge>3 Credits</Badge>
                        </HStack>
                        <HStack
                          justify="space-between"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={cardBg}
                        >
                          <Text fontWeight="medium" color={headingColor}>
                            CS412 - Cloud Computing
                          </Text>
                          <Badge>3 Credits</Badge>
                        </HStack>
                        <HStack
                          justify="space-between"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                          bg={cardBg}
                        >
                          <Text fontWeight="medium" color={headingColor}>
                            MGMT301 - Technology Management
                          </Text>
                          <Badge>2 Credits</Badge>
                        </HStack>
                      </VStack>
                    </Box>

                    <Divider borderColor={borderColor} />

                    <Box>
                      <Text fontWeight="bold" mb={2} color={headingColor}>
                        Requirements to Fulfill:
                      </Text>
                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between">
                          <Text color={textColor}>Minimum GPA</Text>
                          <Badge colorScheme="green">Met (3.70/2.00)</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color={textColor}>Course Prerequisites</Text>
                          <Badge colorScheme="green">Met</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color={textColor}>Tuition Payment</Text>
                          <Badge colorScheme="yellow">
                            Verification Needed
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>

                    <Button colorScheme="blue" leftIcon={<MdHistory />} mt={2}>
                      Create Study Plan
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* Academic Achievements */}
              <Card variant="outline" gridColumn={{ lg: "span 2" }} borderColor={borderColor} bg={cardBg}>
                <CardBody>
                  <Heading size="md" mb={4} color={headingColor}>
                    Academic Achievements
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Box
                      bg={useColorModeValue("green.50", "green.900")}
                      p={4}
                      borderRadius="md"
                      borderLeftWidth="4px"
                      borderLeftColor="green.500"
                    >
                      <Heading size="sm" mb={2} color={useColorModeValue("green.700", "green.200")}>
                        Dean's List
                      </Heading>
                      <Text fontSize="sm" color={textColor}>
                        Made the Dean's List in Semester 3 for achieving a GPA
                        above 3.80
                      </Text>
                    </Box>

                    <Box
                      bg={useColorModeValue("blue.50", "blue.900")}
                      p={4}
                      borderRadius="md"
                      borderLeftWidth="4px"
                      borderLeftColor="blue.500"
                    >
                      <Heading size="sm" mb={2} color={useColorModeValue("blue.700", "blue.200")}>
                        Consistent Performance
                      </Heading>
                      <Text fontSize="sm" color={textColor}>
                        Maintained a GPA above 3.5 for 3 consecutive semesters
                      </Text>
                    </Box>

                    <Box
                      bg={useColorModeValue("purple.50", "purple.900")}
                      p={4}
                      borderRadius="md"
                      borderLeftWidth="4px"
                      borderLeftColor="purple.500"
                    >
                      <Heading size="sm" mb={2} color={useColorModeValue("purple.700", "purple.200")}>
                        Fast Learner
                      </Heading>
                      <Text fontSize="sm" color={textColor}>
                        Completed 30% of total credits in first year
                      </Text>
                    </Box>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AcademicHistoryPage;