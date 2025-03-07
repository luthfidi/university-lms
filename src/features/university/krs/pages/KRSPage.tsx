import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Button,
  SimpleGrid,
  Flex,
  HStack,
  Badge,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  useToast,
  Progress,
  Select,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  AddIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import useAuthStore from "@/store/authStore";

// Mock data for KRS
const academicPeriods = [
  { id: "period-1", year: "2024/2025", semester: "Odd", isActive: true },
  { id: "period-2", year: "2023/2024", semester: "Even", isActive: false },
  { id: "period-3", year: "2023/2024", semester: "Odd", isActive: false },
];

const availableCourses = [
  {
    id: "cs201",
    code: "CS201",
    name: "Data Structures",
    credits: 3,
    type: "LEC",
    lecturer: "Dr. Robert Wilson",
    schedule: "Monday, 09:00 - 10:40",
    room: "Room 302",
    capacity: 40,
    enrolled: 28,
    prerequisite: "CS101",
    isSelected: false,
  },
  {
    id: "cs201l",
    code: "CS201L",
    name: "Data Structures Lab",
    credits: 1,
    type: "LAB",
    lecturer: "Michael Chen",
    schedule: "Wednesday, 13:00 - 14:40",
    room: "Lab 201",
    capacity: 30,
    enrolled: 15,
    prerequisite: "CS101L",
    isSelected: false,
  },
  {
    id: "cs301",
    code: "CS301",
    name: "Database Systems",
    credits: 3,
    type: "LEC",
    lecturer: "Dr. Emily Johnson",
    schedule: "Tuesday, 13:00 - 14:40",
    room: "Room 305",
    capacity: 35,
    enrolled: 32,
    prerequisite: "CS201",
    isSelected: false,
  },
  {
    id: "cs301l",
    code: "CS301L",
    name: "Database Systems Lab",
    credits: 1,
    type: "LAB",
    lecturer: "Sarah Williams",
    schedule: "Thursday, 15:00 - 16:40",
    room: "Lab 202",
    capacity: 30,
    enrolled: 27,
    prerequisite: "CS201L",
    isSelected: false,
  },
  {
    id: "math301",
    code: "MATH301",
    name: "Linear Algebra",
    credits: 3,
    type: "LEC",
    lecturer: "Prof. David Brown",
    schedule: "Friday, 09:00 - 10:40",
    room: "Room 401",
    capacity: 45,
    enrolled: 38,
    prerequisite: "MATH201",
    isSelected: false,
  },
  {
    id: "eng201",
    code: "ENG201",
    name: "Technical Writing",
    credits: 2,
    type: "LEC",
    lecturer: "Dr. Maria Garcia",
    schedule: "Wednesday, 09:00 - 10:40",
    room: "Room 203",
    capacity: 30,
    enrolled: 25,
    prerequisite: "ENG102",
    isSelected: false,
  },
];

const selectedCourses = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 3,
    type: "LEC",
    lecturer: "Dr. Jane Smith",
    schedule: "Monday, 13:00 - 14:40",
    room: "Room 301",
    status: "approved",
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    credits: 1,
    type: "LAB",
    lecturer: "Michael Chen",
    schedule: "Wednesday, 15:00 - 16:40",
    room: "Lab 101",
    status: "approved",
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    credits: 4,
    type: "LEC",
    lecturer: "Prof. Robert Johnson",
    schedule: "Tuesday, 09:00 - 10:40",
    room: "Room 402",
    status: "approved",
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    credits: 2,
    type: "LEC",
    lecturer: "Dr. Emily Williams",
    schedule: "Thursday, 13:00 - 14:40",
    room: "Room 205",
    status: "approved",
  },
  {
    id: "phys101",
    code: "PHYS101",
    name: "Physics I",
    credits: 3,
    type: "LEC",
    lecturer: "Dr. Alan Parker",
    schedule: "Friday, 13:00 - 14:40",
    room: "Room 301",
    status: "pending",
  },
  {
    id: "phys101l",
    code: "PHYS101L",
    name: "Physics I Lab",
    credits: 1,
    type: "LAB",
    lecturer: "Sarah Johnson",
    schedule: "Friday, 15:00 - 16:40",
    room: "Lab 102",
    status: "pending",
  },
];

const academicRequirements = {
  totalCreditsRequired: 144,
  completedCredits: 68,
  inProgressCredits: 14,
  selectedCredits: 0,
  maxCreditsPerSemester: 24,
  minCreditsPerSemester: 12,
};

const KRSPage = () => {
  const { user } = useAuthStore();
  const [activePeriod, setActivePeriod] = useState(academicPeriods[0]);
  const [courseSelections, setCourseSelections] = useState<
    typeof availableCourses
  >(availableCourses.map((course) => ({ ...course, isSelected: false })));
  const [krsStatus, setKrsStatus] = useState<
    "draft" | "submitted" | "approved" | "revision-needed"
  >("draft");
  const toast = useToast();

  // Total credits from pending and approved courses
  const currentCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  // Total credits including newly selected courses
  const selectedCreditsCount = courseSelections
    .filter((course) => course.isSelected)
    .reduce((sum, course) => sum + course.credits, 0);

  const totalPlannedCredits = currentCredits + selectedCreditsCount;

  // Check if over max credits
  const isOverCredits =
    totalPlannedCredits > academicRequirements.maxCreditsPerSemester;

  // Check if under min credits
  const isUnderCredits =
    totalPlannedCredits < academicRequirements.minCreditsPerSemester;

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleCourseSelection = (courseId: string) => {
    setCourseSelections((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, isSelected: !course.isSelected }
          : course
      )
    );
  };

  const handleSubmitKRS = () => {
    if (isOverCredits) {
      toast({
        title: "Cannot submit KRS",
        description: `You've selected ${totalPlannedCredits} credits, which exceeds the maximum of ${academicRequirements.maxCreditsPerSemester} credits.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (isUnderCredits) {
      toast({
        title: "Cannot submit KRS",
        description: `You've selected ${totalPlannedCredits} credits, which is below the minimum of ${academicRequirements.minCreditsPerSemester} credits.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setKrsStatus("submitted");
    toast({
      title: "KRS Submitted",
      description: "Your course selections have been submitted for approval.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const confirmSelectedCourses = () => {
    // This would add selected courses to the selectedCourses array in a real app
    toast({
      title: "Courses Added",
      description: "Selected courses have been added to your KRS.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset selections
    setCourseSelections((prev) =>
      prev.map((course) => ({ ...course, isSelected: false }))
    );
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          KRS Management
        </Heading>
        <Text color="gray.500">
          Manage your course registration for the current semester
        </Text>
      </Box>

      {/* Academic Period Selection */}
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
              <Text fontWeight="bold" fontSize="lg">
                {activePeriod.year} - {activePeriod.semester} Semester
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="green">Active</Badge>
                <Text fontSize="sm" color="gray.500">
                  Registration Period: March 1 - March 15, 2025
                </Text>
              </HStack>
            </Box>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                size="sm"
              >
                Select Period
              </MenuButton>
              <MenuList>
                {academicPeriods.map((period) => (
                  <MenuItem
                    key={period.id}
                    onClick={() => setActivePeriod(period)}
                    fontWeight={
                      period.id === activePeriod.id ? "bold" : "normal"
                    }
                  >
                    {period.year} - {period.semester} Semester
                    {period.isActive && (
                      <Badge ml={2} colorScheme="green">
                        Active
                      </Badge>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </CardBody>
      </Card>

      {/* KRS Status */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4}>
            <Box>
              <Text fontSize="sm" color="gray.500">
                Status
              </Text>
              <Badge
                colorScheme={
                  krsStatus === "approved"
                    ? "green"
                    : krsStatus === "submitted"
                      ? "blue"
                      : krsStatus === "revision-needed"
                        ? "orange"
                        : "gray"
                }
                fontSize="sm"
                px={2}
                py={1}
              >
                {krsStatus === "approved" && "Approved"}
                {krsStatus === "submitted" && "Submitted"}
                {krsStatus === "revision-needed" && "Revision Needed"}
                {krsStatus === "draft" && "Draft"}
              </Badge>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Selected Credits
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {totalPlannedCredits}/
                {academicRequirements.maxCreditsPerSemester}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Completed Credits
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {academicRequirements.completedCredits}/
                {academicRequirements.totalCreditsRequired}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Total Progress
              </Text>
              <HStack spacing={2} align="center">
                <Progress
                  value={
                    (academicRequirements.completedCredits /
                      academicRequirements.totalCreditsRequired) *
                    100
                  }
                  size="sm"
                  colorScheme="green"
                  borderRadius="full"
                  flex="1"
                />
                <Text fontWeight="bold" fontSize="sm">
                  {Math.round(
                    (academicRequirements.completedCredits /
                      academicRequirements.totalCreditsRequired) *
                      100
                  )}
                  %
                </Text>
              </HStack>
            </Box>

            <Box textAlign={{ base: "left", md: "right" }}>
              <Button
                colorScheme="blue"
                isDisabled={
                  krsStatus !== "draft" ||
                  isOverCredits ||
                  isUnderCredits ||
                  courseSelections.every((c) => !c.isSelected)
                }
                onClick={handleSubmitKRS}
                size="sm"
              >
                Submit KRS
              </Button>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Alerts based on status */}
      {isOverCredits && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Credit limit exceeded!</AlertTitle>
          <AlertDescription>
            You've selected {totalPlannedCredits} credits, which exceeds the
            maximum of {academicRequirements.maxCreditsPerSemester} credits.
          </AlertDescription>
        </Alert>
      )}

      {isUnderCredits && totalPlannedCredits > 0 && (
        <Alert status="warning" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Insufficient credits!</AlertTitle>
          <AlertDescription>
            You need at least {academicRequirements.minCreditsPerSemester}{" "}
            credits. Currently selected: {totalPlannedCredits} credits.
          </AlertDescription>
        </Alert>
      )}

      {krsStatus === "submitted" && (
        <Alert status="info" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>KRS Review in Progress</AlertTitle>
          <AlertDescription>
            Your KRS is currently being reviewed by your academic advisor.
            You'll be notified once it's approved.
          </AlertDescription>
        </Alert>
      )}

      {krsStatus === "approved" && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>KRS Approved</AlertTitle>
          <AlertDescription>
            Your KRS has been approved for this semester. You're all set for
            classes!
          </AlertDescription>
        </Alert>
      )}

      {krsStatus === "revision-needed" && (
        <Alert status="warning" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Revision Needed</AlertTitle>
          <AlertDescription>
            Your academic advisor has requested revisions to your KRS. Please
            review their comments and resubmit.
          </AlertDescription>
        </Alert>
      )}

      {/* Course Tabs */}
      <Tabs
        variant="enclosed"
        colorScheme="blue"
        borderRadius="lg"
        bg={cardBg}
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <TabList p={4}>
          <Tab>Selected Courses</Tab>
          <Tab>Available Courses</Tab>
        </TabList>

        <TabPanels>
          {/* Selected Courses Tab */}
          <TabPanel px={5} py={4}>
            <Box>
              <Heading size="md" mb={4}>
                Selected Courses
              </Heading>

              {selectedCourses.length === 0 ? (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  No courses selected yet. Please add courses from the Available
                  Courses tab.
                </Alert>
              ) : (
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Code</Th>
                      <Th>Course Name</Th>
                      <Th>Credits</Th>
                      <Th>Schedule</Th>
                      <Th>Room</Th>
                      <Th>Lecturer</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedCourses.map((course) => (
                      <Tr key={course.id}>
                        <Td>
                          <HStack>
                            <Text fontWeight="bold">{course.code}</Text>
                            <Badge
                              colorScheme={
                                course.type === "LEC" ? "blue" : "teal"
                              }
                              fontSize="xs"
                            >
                              {course.type}
                            </Badge>
                          </HStack>
                        </Td>
                        <Td>{course.name}</Td>
                        <Td>{course.credits}</Td>
                        <Td>{course.schedule}</Td>
                        <Td>{course.room}</Td>
                        <Td>{course.lecturer}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              course.status === "approved" ? "green" : "yellow"
                            }
                          >
                            {course.status === "approved"
                              ? "Approved"
                              : "Pending"}
                          </Badge>
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Remove course"
                            icon={<DeleteIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            isDisabled={
                              course.status === "approved" ||
                              krsStatus !== "draft"
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}

              <Divider my={6} />

              <Flex justify="space-between">
                <Box>
                  <Text fontWeight="bold">Total Credits: {currentCredits}</Text>
                </Box>

                <HStack>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    isDisabled={
                      krsStatus !== "draft" ||
                      selectedCourses.every((c) => c.status === "approved")
                    }
                  >
                    Cancel All Pending
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </TabPanel>

          {/* Available Courses Tab */}
          <TabPanel px={5} py={4}>
            <Box>
              <Flex
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
                mb={4}
                direction={{ base: "column", md: "row" }}
                gap={4}
              >
                <Heading size="md">Available Courses</Heading>

                <HStack spacing={4}>
                  <Select placeholder="Filter by Type" size="sm" maxW="200px">
                    <option value="lec">Lecture (LEC)</option>
                    <option value="lab">Laboratory (LAB)</option>
                  </Select>

                  <Select placeholder="Sort by" size="sm" maxW="200px">
                    <option value="code">Course Code</option>
                    <option value="name">Course Name</option>
                    <option value="credits">Credits</option>
                  </Select>
                </HStack>
              </Flex>

              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th width="50px">Select</Th>
                    <Th>Code</Th>
                    <Th>Course Name</Th>
                    <Th>Credits</Th>
                    <Th>Schedule</Th>
                    <Th>Room</Th>
                    <Th>Lecturer</Th>
                    <Th>Availability</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courseSelections.map((course) => (
                    <Tr
                      key={course.id}
                      bg={course.isSelected ? "blue.50" : undefined}
                    >
                      <Td>
                        <Checkbox
                          isChecked={course.isSelected}
                          onChange={() => handleCourseSelection(course.id)}
                          colorScheme="blue"
                          isDisabled={krsStatus !== "draft"}
                        />
                      </Td>
                      <Td>
                        <HStack>
                          <Text fontWeight="bold">{course.code}</Text>
                          <Badge
                            colorScheme={
                              course.type === "LEC" ? "blue" : "teal"
                            }
                            fontSize="xs"
                          >
                            {course.type}
                          </Badge>
                        </HStack>
                      </Td>
                      <Td>{course.name}</Td>
                      <Td>{course.credits}</Td>
                      <Td>{course.schedule}</Td>
                      <Td>{course.room}</Td>
                      <Td>{course.lecturer}</Td>
                      <Td>
                        <HStack>
                          <Text fontSize="sm">
                            {course.enrolled}/{course.capacity}
                          </Text>
                          <Progress
                            value={(course.enrolled / course.capacity) * 100}
                            size="xs"
                            width="60px"
                            colorScheme={
                              course.enrolled / course.capacity > 0.9
                                ? "red"
                                : course.enrolled / course.capacity > 0.7
                                  ? "yellow"
                                  : "green"
                            }
                            borderRadius="full"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Divider my={6} />

              <Flex justify="space-between">
                <Box>
                  <Text fontWeight="bold">
                    Selected:{" "}
                    {courseSelections.filter((c) => c.isSelected).length}{" "}
                    courses ({selectedCreditsCount} credits)
                  </Text>
                </Box>

                <HStack>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    isDisabled={
                      courseSelections.every((c) => !c.isSelected) ||
                      krsStatus !== "draft"
                    }
                    onClick={() => {
                      setCourseSelections((prev) =>
                        prev.map((c) => ({ ...c, isSelected: false }))
                      );
                    }}
                  >
                    Clear Selections
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    isDisabled={
                      courseSelections.every((c) => !c.isSelected) ||
                      krsStatus !== "draft"
                    }
                    onClick={confirmSelectedCourses}
                    leftIcon={<AddIcon />}
                  >
                    Add Selected Courses
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default KRSPage;
