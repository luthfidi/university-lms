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
  Button,
  Icon,
  VStack,
  Circle,
  Divider,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  MdQrCode,
  MdWifi,
  MdLocationOn,
  MdEvent,
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
  MdWarning,
} from "react-icons/md";

// Mock data for attendance
const coursesData = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    type: "LEC",
    sessions: 13,
    attended: 11,
    percentage: 84.6,
    lecturer: "Dr. Jane Smith",
    nextSession: {
      date: "2025-03-12T09:00:00",
      room: "Room 301",
      delivery: "F2F",
    },
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    type: "LAB",
    sessions: 13,
    attended: 10,
    percentage: 76.9,
    lecturer: "Michael Chen",
    nextSession: {
      date: "2025-03-14T13:00:00",
      room: "Lab 201",
      delivery: "F2F",
    },
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    type: "LEC",
    sessions: 13,
    attended: 12,
    percentage: 92.3,
    lecturer: "Prof. Robert Johnson",
    nextSession: {
      date: "2025-03-11T13:00:00",
      room: "Room 401",
      delivery: "F2F",
    },
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    type: "LEC",
    sessions: 13,
    attended: 12,
    percentage: 92.3,
    lecturer: "Dr. Emily Williams",
    nextSession: {
      date: "2025-03-13T09:00:00",
      room: "Zoom Meeting",
      delivery: "VC",
    },
  },
];

const sessionDetailsData = {
  cs101: [
    {
      id: "cs101-s1",
      number: 1,
      date: "2025-02-01T09:00:00",
      room: "Room 301",
      topic: "Introduction to Computing Concepts",
      status: "present",
      delivery: "F2F",
      method: "wifi",
      checkInTime: "2025-02-01T08:55:00",
    },
    {
      id: "cs101-s2",
      number: 2,
      date: "2025-02-08T09:00:00",
      room: "Room 301",
      topic: "Problem Solving Strategies",
      status: "present",
      delivery: "F2F",
      method: "qrcode",
      checkInTime: "2025-02-08T08:50:00",
    },
    {
      id: "cs101-s3",
      number: 3,
      date: "2025-02-15T09:00:00",
      room: "Zoom Meeting",
      topic: "Introduction to Python",
      status: "present",
      delivery: "VC",
      method: "zoom",
      checkInTime: "2025-02-15T08:58:00",
    },
    {
      id: "cs101-s4",
      number: 4,
      date: "2025-02-22T09:00:00",
      room: "Room 301",
      topic: "Control Structures",
      status: "absent",
      delivery: "F2F",
      method: "-",
      checkInTime: "-",
    },
    {
      id: "cs101-s5",
      number: 5,
      date: "2025-03-01T09:00:00",
      room: "Room 301",
      topic: "Functions and Modules",
      status: "present",
      delivery: "F2F",
      method: "qrcode",
      checkInTime: "2025-03-01T09:02:00",
    },
  ],
};

// Attendance requirements data
const attendanceRequirements = {
  cs101: {
    minimumPercentage: 80,
    maxAbsences: 3,
    presentMethod: ["QR Code", "Wifi Authentication", "Zoom Attendance"],
    policy:
      "Students must attend at least 80% of the sessions to be eligible for the final exam. Late arrival (>15 minutes) counts as half an absence.",
  },
};

// Helper function to format date
const formatDate = (dateString: string) => {
  if (dateString === "-") return "-";

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Helper function to determine progress color
const getProgressColor = (percentage: number, minimumRequired: number = 80) => {
  if (percentage >= minimumRequired) return "green";
  if (percentage >= minimumRequired - 10) return "yellow";
  return "red";
};

// Helper function to determine status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return MdCheckCircle;
    case "absent":
      return MdCancel;
    case "late":
      return MdAccessTime;
    default:
      return MdWarning;
  }
};

// Helper function to determine method icon
const getMethodIcon = (method: string) => {
  switch (method) {
    case "qrcode":
      return MdQrCode;
    case "wifi":
      return MdWifi;
    case "zoom":
      return MdLocationOn;
    default:
      return MdEvent;
  }
};

const AttendanceListPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0].id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Fix: Specify the FocusableElement type for the ref
  const cancelRef = useRef(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Get current course data
  const currentCourse =
    coursesData.find((course) => course.id === selectedCourse) ||
    coursesData[0];

  // Get session details for the selected course
  const sessionDetails =
    sessionDetailsData[selectedCourse as keyof typeof sessionDetailsData] || [];

  // Get attendance requirements for the selected course
  const requirements =
    attendanceRequirements[
      selectedCourse as keyof typeof attendanceRequirements
    ];

  // Calculate attendance status
  const attendanceStatus =
    currentCourse.percentage >= (requirements?.minimumPercentage || 80)
      ? "good"
      : currentCourse.percentage >= (requirements?.minimumPercentage || 80) - 10
        ? "warning"
        : "danger";

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Attendance
        </Heading>
        <Text color="gray.500">
          Track your class attendance and check-in for ongoing sessions
        </Text>
      </Box>

      {/* Course Selector */}
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
                Select Course
              </Text>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                maxW="400px"
              >
                {coursesData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name} ({course.type})
                  </option>
                ))}
              </Select>
            </Box>

            <HStack spacing={4}>
              <Button
                leftIcon={<Icon as={MdQrCode} />}
                colorScheme="blue"
                onClick={onOpen}
              >
                Check-in to Class
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Attendance Summary */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={3}>
                {currentCourse.code} - {currentCourse.name}
              </Text>
              <HStack spacing={2} mb={1}>
                <Badge
                  colorScheme={currentCourse.type === "LEC" ? "blue" : "teal"}
                >
                  {currentCourse.type}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  Lecturer: {currentCourse.lecturer}
                </Text>
              </HStack>
              <HStack spacing={2} mb={4}>
                <Badge
                  colorScheme={
                    attendanceStatus === "good"
                      ? "green"
                      : attendanceStatus === "warning"
                        ? "yellow"
                        : "red"
                  }
                >
                  {attendanceStatus === "good"
                    ? "Good Standing"
                    : attendanceStatus === "warning"
                      ? "At Risk"
                      : "Attendance Issue"}
                </Badge>
              </HStack>

              <HStack justify="space-between" mb={1}>
                <Text>Attendance Rate:</Text>
                <Text fontWeight="bold">
                  {currentCourse.percentage.toFixed(1)}%
                </Text>
              </HStack>
              <Progress
                value={currentCourse.percentage}
                size="sm"
                colorScheme={getProgressColor(
                  currentCourse.percentage,
                  requirements?.minimumPercentage
                )}
                borderRadius="full"
                mb={2}
              />
              <Text fontSize="sm" color="gray.500">
                Attended {currentCourse.attended} of {currentCourse.sessions}{" "}
                sessions
              </Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={3}>
                Next Session
              </Text>
              <VStack align="stretch" spacing={2}>
                <HStack>
                  <Icon as={MdEvent} color="gray.500" />
                  <Text fontWeight="medium">Date: </Text>
                  <Text>{formatDate(currentCourse.nextSession.date)}</Text>
                </HStack>
                <HStack>
                  <Icon
                    as={
                      currentCourse.nextSession.delivery === "F2F"
                        ? MdLocationOn
                        : MdLocationOn
                    }
                    color="gray.500"
                  />
                  <Text fontWeight="medium">Location: </Text>
                  <Text>{currentCourse.nextSession.room}</Text>
                </HStack>
                <HStack>
                  <Badge
                    colorScheme={
                      currentCourse.nextSession.delivery === "F2F"
                        ? "green"
                        : "blue"
                    }
                  >
                    {currentCourse.nextSession.delivery === "F2F"
                      ? "Face to Face"
                      : "Virtual Class"}
                  </Badge>
                </HStack>
              </VStack>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={3}>
                Attendance Requirements
              </Text>
              <VStack align="stretch" spacing={2}>
                <HStack>
                  <Icon as={MdCheckCircle} color="green.500" />
                  <Text>
                    Minimum attendance: {requirements?.minimumPercentage || 80}%
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={MdCancel} color="red.500" />
                  <Text>
                    Maximum absences: {requirements?.maxAbsences || 3}
                  </Text>
                </HStack>
                <HStack alignItems="flex-start">
                  <Icon as={MdWarning} color="yellow.500" mt={1} />
                  <Text fontSize="sm" color="gray.600">
                    {requirements?.policy ||
                      "Students must attend at least 80% of sessions to be eligible for the final exam."}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Attendance Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Session History</Tab>
          <Tab>Statistics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} pt={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Session</Th>
                  <Th>Date</Th>
                  <Th>Topic</Th>
                  <Th>Location</Th>
                  <Th>Status</Th>
                  <Th>Check-in Method</Th>
                  <Th>Check-in Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sessionDetails.map((session) => (
                  <Tr key={session.id}>
                    <Td>{session.number}</Td>
                    <Td>{formatDate(session.date)}</Td>
                    <Td>{session.topic}</Td>
                    <Td>
                      <HStack>
                        <Text>{session.room}</Text>
                        <Badge
                          colorScheme={
                            session.delivery === "F2F" ? "green" : "blue"
                          }
                          fontSize="xs"
                        >
                          {session.delivery}
                        </Badge>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <Icon
                          as={getStatusIcon(session.status)}
                          color={
                            session.status === "present"
                              ? "green.500"
                              : session.status === "late"
                                ? "yellow.500"
                                : "red.500"
                          }
                        />
                        <Text>
                          {session.status.charAt(0).toUpperCase() +
                            session.status.slice(1)}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>
                      {session.method !== "-" && (
                        <HStack>
                          <Icon as={getMethodIcon(session.method)} />
                          <Text>
                            {session.method.charAt(0).toUpperCase() +
                              session.method.slice(1)}
                          </Text>
                        </HStack>
                      )}
                      {session.method === "-" && <Text>-</Text>}
                    </Td>
                    <Td>{formatDate(session.checkInTime)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card variant="outline">
                <CardBody>
                  <Text fontWeight="bold" fontSize="lg" mb={4}>
                    Attendance Summary
                  </Text>
                  <HStack spacing={6} mb={6}>
                    <Stat>
                      <StatLabel>Present</StatLabel>
                      <StatNumber>{currentCourse.attended}</StatNumber>
                      <StatHelpText>
                        {currentCourse.percentage.toFixed(1)}%
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Absent</StatLabel>
                      <StatNumber>
                        {currentCourse.sessions - currentCourse.attended}
                      </StatNumber>
                      <StatHelpText>
                        {(100 - currentCourse.percentage).toFixed(1)}%
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Total</StatLabel>
                      <StatNumber>{currentCourse.sessions}</StatNumber>
                      <StatHelpText>Sessions</StatHelpText>
                    </Stat>
                  </HStack>

                  <Text fontWeight="bold" mb={2}>
                    Attendance by Week
                  </Text>
                  <Box mb={4}>
                    <Flex wrap="wrap" gap={2}>
                      {Array.from({ length: 13 }).map((_, i) => {
                        const isAttended =
                          i < 5
                            ? sessionDetails.find((s) => s.number === i + 1)
                                ?.status === "present"
                            : i % 4 !== 3; // Just for mock data

                        return (
                          <Tooltip
                            key={i}
                            label={
                              i < sessionDetails.length
                                ? `Session ${i + 1}: ${isAttended ? "Present" : "Absent"}`
                                : `Session ${i + 1}: Upcoming`
                            }
                          >
                            <Circle
                              size="30px"
                              bg={
                                i >= currentCourse.sessions
                                  ? "gray.100"
                                  : isAttended
                                    ? "green.500"
                                    : "red.500"
                              }
                              color="white"
                              fontWeight="bold"
                              fontSize="xs"
                              cursor="pointer"
                            >
                              {i + 1}
                            </Circle>
                          </Tooltip>
                        );
                      })}
                    </Flex>
                  </Box>

                  <Divider mb={4} />

                  <Text fontWeight="bold" mb={2}>
                    Attendance Projection
                  </Text>
                  <Text fontSize="sm" mb={4}>
                    If you attend all remaining sessions, your final attendance
                    will be:{" "}
                    <Text as="span" fontWeight="bold" color="green.500">
                      {(
                        ((currentCourse.attended +
                          (13 - currentCourse.sessions)) /
                          13) *
                        100
                      ).toFixed(1)}
                      %
                    </Text>
                  </Text>
                  <Text fontSize="sm" mb={1}>
                    Maximum possible absences to maintain required{" "}
                    {requirements?.minimumPercentage || 80}%:{" "}
                    <Text as="span" fontWeight="bold">
                      {Math.floor(
                        13 * (1 - (requirements?.minimumPercentage || 80) / 100)
                      ) -
                        (currentCourse.sessions - currentCourse.attended)}
                    </Text>
                  </Text>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardBody>
                  <Text fontWeight="bold" fontSize="lg" mb={4}>
                    Attendance by Delivery Mode
                  </Text>
                  <SimpleGrid columns={2} spacing={8} mb={6}>
                    <VStack>
                      <Circle size="100px" bg="green.100">
                        <VStack spacing={0}>
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="green.500"
                          >
                            {
                              sessionDetails.filter(
                                (s) =>
                                  s.delivery === "F2F" && s.status === "present"
                              ).length
                            }
                          </Text>
                          <Text fontSize="xs" color="green.700">
                            of
                          </Text>
                          <Text fontSize="md" color="green.500">
                            {
                              sessionDetails.filter((s) => s.delivery === "F2F")
                                .length
                            }
                          </Text>
                        </VStack>
                      </Circle>
                      <Text fontWeight="medium">Face to Face</Text>
                    </VStack>

                    <VStack>
                      <Circle size="100px" bg="blue.100">
                        <VStack spacing={0}>
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="blue.500"
                          >
                            {
                              sessionDetails.filter(
                                (s) =>
                                  s.delivery === "VC" && s.status === "present"
                              ).length
                            }
                          </Text>
                          <Text fontSize="xs" color="blue.700">
                            of
                          </Text>
                          <Text fontSize="md" color="blue.500">
                            {
                              sessionDetails.filter((s) => s.delivery === "VC")
                                .length
                            }
                          </Text>
                        </VStack>
                      </Circle>
                      <Text fontWeight="medium">Virtual Class</Text>
                    </VStack>
                  </SimpleGrid>

                  <Divider mb={4} />

                  <Text fontWeight="bold" fontSize="lg" mb={4}>
                    Check-in Methods Used
                  </Text>
                  <HStack spacing={4} justify="space-around">
                    <VStack>
                      <Icon as={MdQrCode} boxSize={8} color="purple.500" />
                      <Text>QR Code</Text>
                      <Badge colorScheme="purple">
                        {
                          sessionDetails.filter((s) => s.method === "qrcode")
                            .length
                        }
                      </Badge>
                    </VStack>

                    <VStack>
                      <Icon as={MdWifi} boxSize={8} color="blue.500" />
                      <Text>Wifi</Text>
                      <Badge colorScheme="blue">
                        {
                          sessionDetails.filter((s) => s.method === "wifi")
                            .length
                        }
                      </Badge>
                    </VStack>

                    <VStack>
                      <Icon as={MdLocationOn} boxSize={8} color="green.500" />
                      <Text>Zoom</Text>
                      <Badge colorScheme="green">
                        {
                          sessionDetails.filter((s) => s.method === "zoom")
                            .length
                        }
                      </Badge>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Check-in Modal */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Class Check-in
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack spacing={4} align="center">
                <Text>
                  Scan the QR code or connect to the class Wifi network to check
                  in to your current session.
                </Text>
                <Icon as={MdQrCode} boxSize={24} />
                <Text fontWeight="bold">
                  {currentCourse.code} - Session{" "}
                  {Math.min(currentCourse.sessions + 1, 13)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Check-in will be valid for the next 15 minutes
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onClose} ml={3}>
                I've Scanned the Code
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AttendanceListPage;
