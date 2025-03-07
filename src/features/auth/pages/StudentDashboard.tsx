import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  HStack,
  VStack,
  Badge,
  Progress,
  Flex,
  Avatar,
  Divider,
  List,
  ListItem,
  ListIcon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  TimeIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MdAssignment, MdBook, MdEvent, MdForum } from "react-icons/md";
import useAuthStore from "@/store/authStore";

// Mock data for dashboard
const upcomingClasses = [
  {
    id: "cls-001",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    startTime: "09:00",
    endTime: "10:40",
    room: "Room 301",
    deliveryMode: "F2F",
    lecturer: "Dr. Jane Smith",
  },
  {
    id: "cls-002",
    courseName: "Calculus I",
    courseCode: "MATH201",
    startTime: "13:00",
    endTime: "14:40",
    room: "Zoom Meeting",
    deliveryMode: "VC",
    lecturer: "Prof. Robert Johnson",
  },
];

const assignments = [
  {
    id: "asg-001",
    title: "Programming Assignment #3",
    courseCode: "CS101",
    dueDate: "2025-03-10T23:59:00",
    status: "pending",
  },
  {
    id: "asg-002",
    title: "Linear Algebra Problem Set",
    courseCode: "MATH201",
    dueDate: "2025-03-12T23:59:00",
    status: "pending",
  },
  {
    id: "asg-003",
    title: "Research Paper Draft",
    courseCode: "ENG102",
    dueDate: "2025-03-15T23:59:00",
    status: "pending",
  },
];

const announcements = [
  {
    id: "ann-001",
    title: "Exam Schedule Posted",
    content:
      "The final exam schedule has been posted. Please check the calendar.",
    date: "2025-03-05T10:30:00",
    author: "Academic Office",
  },
  {
    id: "ann-002",
    title: "Library Hours Extended",
    content: "The library will be open extended hours during finals week.",
    date: "2025-03-04T14:15:00",
    author: "Library Services",
  },
];

const courseProgress = [
  {
    id: "crs-001",
    name: "Introduction to Computer Science",
    code: "CS101",
    progress: 65,
    tasks: { completed: 13, total: 20 },
  },
  {
    id: "crs-002",
    name: "Calculus I",
    code: "MATH201",
    progress: 45,
    tasks: { completed: 9, total: 20 },
  },
  {
    id: "crs-003",
    name: "English Composition",
    code: "ENG102",
    progress: 80,
    tasks: { completed: 16, total: 20 },
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDueStatus = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Overdue", color: "red" };
  if (diffDays === 0) return { label: "Due Today", color: "orange" };
  if (diffDays === 1) return { label: "Due Tomorrow", color: "yellow" };
  return { label: `Due in ${diffDays} days`, color: "green" };
};

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Dashboard
        </Heading>
        <Text color="gray.500">
          Welcome back, {user?.firstName}! Here's what's happening today.
        </Text>
      </Box>

      {/* Main Dashboard Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={6}>
        {/* Left Column - Main Content */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* Today's Classes */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <HStack justify="space-between">
                  <Heading size="md">Today's Classes</Heading>
                  <Button
                    variant="ghost"
                    rightIcon={<ChevronRightIcon />}
                    size="sm"
                    onClick={() => navigate("/lms/schedule")}
                  >
                    View Schedule
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                {upcomingClasses.length > 0 ? (
                  <VStack spacing={4} align="stretch">
                    {upcomingClasses.map((classItem) => (
                      <HStack
                        key={classItem.id}
                        bg="gray.50"
                        p={3}
                        borderRadius="md"
                        spacing={4}
                      >
                        <Flex
                          bg="brand.primary.100"
                          color="brand.primary.700"
                          p={3}
                          borderRadius="md"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {classItem.deliveryMode === "F2F" ? (
                            <MdEvent size={24} />
                          ) : (
                            <MdBook size={24} />
                          )}
                        </Flex>
                        <Box flex={1}>
                          <HStack justify="space-between">
                            <Text fontWeight="bold">
                              {classItem.courseCode}
                            </Text>
                            <Badge
                              colorScheme={
                                classItem.deliveryMode === "F2F"
                                  ? "green"
                                  : "blue"
                              }
                            >
                              {classItem.deliveryMode}
                            </Badge>
                          </HStack>
                          <Text>{classItem.courseName}</Text>
                          <HStack
                            fontSize="sm"
                            color="gray.500"
                            spacing={4}
                            mt={1}
                          >
                            <Text>
                              <TimeIcon mr={1} />
                              {classItem.startTime} - {classItem.endTime}
                            </Text>
                            <Text>{classItem.room}</Text>
                            <Text>{classItem.lecturer}</Text>
                          </HStack>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Text color="gray.500">
                      No classes scheduled for today.
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>

            {/* Upcoming Assignments */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <HStack justify="space-between">
                  <Heading size="md">Upcoming Assignments</Heading>
                  <Button
                    variant="ghost"
                    rightIcon={<ChevronRightIcon />}
                    size="sm"
                    onClick={() => navigate("/lms/assessment")}
                  >
                    View All
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <List spacing={3}>
                  {assignments.map((assignment) => {
                    const dueStatus = getDueStatus(assignment.dueDate);
                    return (
                      <ListItem
                        key={assignment.id}
                        p={3}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                        _hover={{ bg: "gray.50" }}
                      >
                        <HStack spacing={4}>
                          <ListIcon
                            as={MdAssignment}
                            color="brand.secondary.500"
                            boxSize={5}
                          />
                          <Box flex={1}>
                            <HStack justify="space-between" mb={1}>
                              <Text fontWeight="bold">{assignment.title}</Text>
                              <Badge colorScheme={dueStatus.color}>
                                {dueStatus.label}
                              </Badge>
                            </HStack>
                            <HStack fontSize="sm" color="gray.500">
                              <Text>{assignment.courseCode}</Text>
                              <Text>•</Text>
                              <Text>
                                Due {formatDate(assignment.dueDate)}{" "}
                                {formatTime(assignment.dueDate)}
                              </Text>
                            </HStack>
                          </Box>
                        </HStack>
                      </ListItem>
                    );
                  })}
                </List>
              </CardBody>
            </Card>

            {/* Course Progress */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <HStack justify="space-between">
                  <Heading size="md">My Progress</Heading>
                  <Button
                    variant="ghost"
                    rightIcon={<ChevronRightIcon />}
                    size="sm"
                    onClick={() => navigate("/lms/courses")}
                  >
                    All Courses
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={5} align="stretch">
                  {courseProgress.map((course) => (
                    <Box key={course.id}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontWeight="bold">{course.name}</Text>
                        <Text color="gray.500" fontSize="sm">
                          {course.tasks.completed}/{course.tasks.total} tasks
                        </Text>
                      </HStack>
                      <Progress
                        value={course.progress}
                        size="sm"
                        colorScheme={
                          course.progress > 75
                            ? "green"
                            : course.progress > 50
                              ? "blue"
                              : "orange"
                        }
                        borderRadius="full"
                        hasStripe
                      />
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>

        {/* Right Column - Sidebar */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* Announcements */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <Heading size="md">Announcements</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {announcements.map((announcement) => (
                    <Box key={announcement.id}>
                      <Text fontWeight="bold">{announcement.title}</Text>
                      <Text fontSize="sm" color="gray.500" mb={1}>
                        {formatDate(announcement.date)}
                      </Text>
                      <Text noOfLines={2} fontSize="sm">
                        {announcement.content}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
              <CardFooter pt={0}>
                <Button size="sm" width="full" variant="ghost">
                  View All Announcements
                </Button>
              </CardFooter>
            </Card>

            {/* Latest Forum Posts */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <Heading size="md">Latest Forum Posts</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3}>
                    <Avatar size="sm" name="John Doe" />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Question about Assignment #3
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        CS101 • 2 hours ago
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      name="Jane Smith"
                      bg="brand.secondary.500"
                    />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Study Group for Midterm
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        MATH201 • 5 hours ago
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </CardBody>
              <CardFooter pt={0}>
                <Button
                  size="sm"
                  width="full"
                  variant="ghost"
                  onClick={() => navigate("/lms/forum")}
                >
                  Go to Forum
                </Button>
              </CardFooter>
            </Card>

            {/* To-Do List */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader pb={2}>
                <Heading size="md">To-Do List</Heading>
              </CardHeader>
              <CardBody>
                <List spacing={2}>
                  <ListItem>
                    <HStack>
                      <ListIcon as={WarningIcon} color="orange.500" />
                      <Text fontSize="sm">Complete Programming Assignment</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon as={WarningIcon} color="orange.500" />
                      <Text fontSize="sm">Study for Math Quiz</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <Text
                        fontSize="sm"
                        textDecoration="line-through"
                        color="gray.500"
                      >
                        Read Chapter 5
                      </Text>
                    </HStack>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
