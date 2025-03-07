import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  HStack,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Select,
  VStack,
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
  Divider,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  MdAssignment,
  MdQuiz,
  MdArticle,
  MdSchool,
  MdCheck,
  MdPending,
  MdWarning,
} from "react-icons/md";

// Mock data for assessments
const assessmentData = {
  upcoming: [
    {
      id: "midterm-cs101",
      title: "Midterm Exam",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      type: "exam",
      dueDate: "2025-03-15T09:00:00",
      duration: 120, // minutes
      totalQuestions: 30,
      totalPoints: 100,
      status: "upcoming",
      description:
        "Covers all topics from Week 1 to Week 7. Closed book examination.",
    },
    {
      id: "quiz-math201-3",
      title: "Quiz 3: Integration",
      courseCode: "MATH201",
      courseName: "Calculus I",
      type: "quiz",
      dueDate: "2025-03-10T13:00:00",
      duration: 30, // minutes
      totalQuestions: 10,
      totalPoints: 20,
      status: "upcoming",
      description:
        "Quiz on basic integration techniques including substitution and integration by parts.",
    },
  ],
  active: [
    {
      id: "assignment-cs101-3",
      title: "Programming Assignment #3",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      type: "assignment",
      dueDate: "2025-03-10T23:59:00",
      totalPoints: 100,
      status: "active",
      description:
        "Implement data structures including linked lists and binary trees in Python.",
      progress: 25,
    },
    {
      id: "assignment-math201-ps4",
      title: "Problem Set 4",
      courseCode: "MATH201",
      courseName: "Calculus I",
      type: "assignment",
      dueDate: "2025-03-12T23:59:00",
      totalPoints: 50,
      status: "active",
      description: "Problems on applications of integration.",
      progress: 50,
    },
  ],
  completed: [
    {
      id: "assignment-cs101-2",
      title: "Programming Assignment #2",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      type: "assignment",
      dueDate: "2025-02-24T23:59:00",
      submittedDate: "2025-02-24T22:30:00",
      totalPoints: 100,
      earnedPoints: 90,
      status: "completed",
      description:
        "Build programs that utilize control structures and functions.",
      feedback:
        "Excellent work! Your solution was well-structured and efficient.",
    },
    {
      id: "quiz-cs101-2",
      title: "Quiz 2: Control Structures",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      type: "quiz",
      dueDate: "2025-02-20T10:00:00",
      submittedDate: "2025-02-20T09:45:00",
      duration: 30,
      totalQuestions: 10,
      totalPoints: 20,
      earnedPoints: 18,
      status: "completed",
      description: "Quiz on loops, conditionals, and basic control flow.",
    },
    {
      id: "assignment-math201-ps3",
      title: "Problem Set 3",
      courseCode: "MATH201",
      courseName: "Calculus I",
      type: "assignment",
      dueDate: "2025-02-27T23:59:00",
      submittedDate: "2025-02-27T20:15:00",
      totalPoints: 50,
      earnedPoints: 42,
      status: "completed",
      description: "Problems on differentiation and its applications.",
    },
  ],
};

// Helper function to get assessment icon
const getAssessmentIcon = (type: string) => {
  switch (type) {
    case "assignment":
      return MdAssignment;
    case "quiz":
      return MdQuiz;
    case "exam":
      return MdSchool;
    default:
      return MdArticle;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Calculate time remaining
const getTimeRemaining = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  } else {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  }
};

const AssessmentListPage = () => {
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Assessments
        </Heading>
        <Text color="gray.500">
          View and manage your assignments, quizzes, and exams
        </Text>
      </Box>

      {/* Search and Filters */}
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
          <Input placeholder="Search assessments" />
        </InputGroup>

        <Flex
          flex={{ md: 1 }}
          gap={4}
          direction={{ base: "column", sm: "row" }}
        >
          <Select placeholder="All Courses" defaultValue="">
            <option value="">All Courses</option>
            <option value="cs101">
              CS101 - Introduction to Computer Science
            </option>
            <option value="math201">MATH201 - Calculus I</option>
            <option value="eng102">ENG102 - English Composition</option>
          </Select>

          <Select placeholder="All Types" defaultValue="">
            <option value="">All Types</option>
            <option value="assignment">Assignments</option>
            <option value="quiz">Quizzes</option>
            <option value="exam">Exams</option>
          </Select>
        </Flex>
      </Flex>

      {/* Assessment Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Active ({assessmentData.active.length})</Tab>
          <Tab>Upcoming ({assessmentData.upcoming.length})</Tab>
          <Tab>Completed ({assessmentData.completed.length})</Tab>
        </TabList>

        <TabPanels>
          {/* Active Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {assessmentData.active.map((assessment) => (
                <Card
                  key={assessment.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={cardBg}
                  boxShadow="sm"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{
                    boxShadow: "md",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/lms/assessment/${assessment.id}`)}
                >
                  <CardBody p={0}>
                    <Box
                      p={4}
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box>
                          <HStack mb={1}>
                            <Badge colorScheme="blue">
                              {assessment.courseCode}
                            </Badge>
                            <Badge
                              colorScheme={
                                assessment.type === "assignment"
                                  ? "purple"
                                  : assessment.type === "quiz"
                                    ? "orange"
                                    : "red"
                              }
                            >
                              {assessment.type.charAt(0).toUpperCase() +
                                assessment.type.slice(1)}
                            </Badge>
                          </HStack>
                          <Heading size="md">{assessment.title}</Heading>
                        </Box>
                        <Icon
                          as={getAssessmentIcon(assessment.type)}
                          boxSize={6}
                          color="gray.400"
                        />
                      </Flex>
                      <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                        {assessment.description}
                      </Text>
                    </Box>

                    <Box p={4}>
                      <HStack spacing={6} mb={4}>
                        <Stat size="sm">
                          <StatLabel fontSize="xs">Due Date</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {formatDate(assessment.dueDate)}
                          </StatHelpText>
                        </Stat>

                        <Stat size="sm">
                          <StatLabel fontSize="xs">Time Remaining</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {getTimeRemaining(assessment.dueDate)}
                          </StatHelpText>
                        </Stat>

                        <Stat size="sm">
                          <StatLabel fontSize="xs">Points</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {assessment.totalPoints} pts
                          </StatHelpText>
                        </Stat>
                      </HStack>

                      <VStack spacing={1} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="sm" fontWeight="medium">
                            Progress
                          </Text>
                          <Text fontSize="sm">{assessment.progress}%</Text>
                        </HStack>
                        <Progress
                          value={assessment.progress}
                          size="sm"
                          colorScheme="green"
                          borderRadius="full"
                        />
                      </VStack>

                      <Flex justify="flex-end" mt={4}>
                        <Button
                          rightIcon={<ChevronRightIcon />}
                          colorScheme="blue"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/lms/assessment/${assessment.id}`);
                          }}
                        >
                          Continue
                        </Button>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            {assessmentData.active.length === 0 && (
              <Box textAlign="center" py={10}>
                <Icon as={MdCheck} boxSize={12} color="green.500" mb={4} />
                <Heading size="md" mb={2}>
                  No Active Assessments
                </Heading>
                <Text color="gray.500">
                  You're all caught up! Check the upcoming tab for future
                  assessments.
                </Text>
              </Box>
            )}
          </TabPanel>

          {/* Upcoming Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {assessmentData.upcoming.map((assessment) => (
                <Card
                  key={assessment.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={cardBg}
                  boxShadow="sm"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <CardBody p={0}>
                    <Box
                      p={4}
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box>
                          <HStack mb={1}>
                            <Badge colorScheme="blue">
                              {assessment.courseCode}
                            </Badge>
                            <Badge
                              colorScheme={
                                assessment.type === "assignment"
                                  ? "purple"
                                  : assessment.type === "quiz"
                                    ? "orange"
                                    : "red"
                              }
                            >
                              {assessment.type.charAt(0).toUpperCase() +
                                assessment.type.slice(1)}
                            </Badge>
                          </HStack>
                          <Heading size="md">{assessment.title}</Heading>
                        </Box>
                        <Icon
                          as={getAssessmentIcon(assessment.type)}
                          boxSize={6}
                          color="gray.400"
                        />
                      </Flex>
                      <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                        {assessment.description}
                      </Text>
                    </Box>

                    <Box p={4}>
                      <HStack spacing={6} mb={2}>
                        <Stat size="sm">
                          <StatLabel fontSize="xs">Opens On</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {formatDate(assessment.dueDate)}
                          </StatHelpText>
                        </Stat>

                        {assessment.type !== "assignment" && (
                          <Stat size="sm">
                            <StatLabel fontSize="xs">Duration</StatLabel>
                            <StatHelpText
                              mb={0}
                              fontWeight="bold"
                              fontSize="sm"
                            >
                              {assessment.duration} min
                            </StatHelpText>
                          </Stat>
                        )}

                        <Stat size="sm">
                          <StatLabel fontSize="xs">Points</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {assessment.totalPoints} pts
                          </StatHelpText>
                        </Stat>
                      </HStack>

                      {assessment.type !== "assignment" && (
                        <HStack spacing={4} mt={2} mb={2}>
                          <Text fontSize="sm" fontWeight="medium">
                            Questions:{" "}
                          </Text>
                          <Text fontSize="sm">{assessment.totalQuestions}</Text>
                        </HStack>
                      )}

                      <Divider my={3} />

                      <Flex justify="flex-end">
                        <Button colorScheme="gray" size="sm" isDisabled>
                          Not Yet Available
                        </Button>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            {assessmentData.upcoming.length === 0 && (
              <Box textAlign="center" py={10}>
                <Icon as={MdPending} boxSize={12} color="orange.500" mb={4} />
                <Heading size="md" mb={2}>
                  No Upcoming Assessments
                </Heading>
                <Text color="gray.500">
                  There are no scheduled assessments at this time.
                </Text>
              </Box>
            )}
          </TabPanel>

          {/* Completed Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {assessmentData.completed.map((assessment) => (
                <Card
                  key={assessment.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={cardBg}
                  boxShadow="sm"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{
                    boxShadow: "md",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/lms/assessment/${assessment.id}/result`)
                  }
                >
                  <CardBody p={0}>
                    <Box
                      p={4}
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box>
                          <HStack mb={1}>
                            <Badge colorScheme="blue">
                              {assessment.courseCode}
                            </Badge>
                            <Badge
                              colorScheme={
                                assessment.type === "assignment"
                                  ? "purple"
                                  : assessment.type === "quiz"
                                    ? "orange"
                                    : "red"
                              }
                            >
                              {assessment.type.charAt(0).toUpperCase() +
                                assessment.type.slice(1)}
                            </Badge>
                          </HStack>
                          <Heading size="md">{assessment.title}</Heading>
                        </Box>
                        <Icon
                          as={getAssessmentIcon(assessment.type)}
                          boxSize={6}
                          color="gray.400"
                        />
                      </Flex>
                      <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                        {assessment.description}
                      </Text>
                    </Box>

                    <Box p={4}>
                      <HStack spacing={6} mb={4}>
                        <Stat size="sm">
                          <StatLabel fontSize="xs">Submitted</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {formatDate(assessment.submittedDate!)}
                          </StatHelpText>
                        </Stat>

                        <Stat size="sm">
                          <StatLabel fontSize="xs">Due Date</StatLabel>
                          <StatHelpText mb={0} fontWeight="bold" fontSize="sm">
                            {formatDate(assessment.dueDate)}
                          </StatHelpText>
                        </Stat>

                        <Stat size="sm">
                          <StatLabel fontSize="xs">Score</StatLabel>
                          <StatHelpText mb={0}>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">
                                {assessment.earnedPoints}/
                                {assessment.totalPoints}
                              </Text>
                              <Badge
                                colorScheme={
                                  assessment.earnedPoints! /
                                    assessment.totalPoints >=
                                  0.9
                                    ? "green"
                                    : assessment.earnedPoints! /
                                          assessment.totalPoints >=
                                        0.7
                                      ? "blue"
                                      : assessment.earnedPoints! /
                                            assessment.totalPoints >=
                                          0.6
                                        ? "yellow"
                                        : "red"
                                }
                              >
                                {Math.round(
                                  (assessment.earnedPoints! /
                                    assessment.totalPoints) *
                                    100
                                )}
                                %
                              </Badge>
                            </HStack>
                          </StatHelpText>
                        </Stat>
                      </HStack>

                      {assessment.feedback && (
                        <Box mb={3}>
                          <Text fontSize="sm" fontWeight="medium">
                            Feedback:
                          </Text>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {assessment.feedback}
                          </Text>
                        </Box>
                      )}

                      <Flex justify="flex-end" mt={4}>
                        <Button
                          rightIcon={<ChevronRightIcon />}
                          colorScheme="blue"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/lms/assessment/${assessment.id}/result`);
                          }}
                        >
                          View Results
                        </Button>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            {assessmentData.completed.length === 0 && (
              <Box textAlign="center" py={10}>
                <Icon as={MdWarning} boxSize={12} color="yellow.500" mb={4} />
                <Heading size="md" mb={2}>
                  No Completed Assessments
                </Heading>
                <Text color="gray.500">
                  You haven't completed any assessments yet.
                </Text>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AssessmentListPage;
