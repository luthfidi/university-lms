import { useState } from "react";
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
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorModeValue,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TableContainer,
  Divider,
} from "@chakra-ui/react";
import {
  SearchIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import {
  MdMessage,
  MdPersonAdd,
  MdPerson,
  MdContactMail,
  MdEdit,
  MdGroups,
  MdSchool,
} from "react-icons/md";

// Mock data for course selection
const coursesData = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    type: "LEC",
    lecturer: "Dr. Jane Smith",
    participants: {
      lecturers: 1,
      assistants: 2,
      students: 32,
    },
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    type: "LAB",
    lecturer: "Michael Chen",
    participants: {
      lecturers: 1,
      assistants: 1,
      students: 20,
    },
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    type: "LEC",
    lecturer: "Prof. Robert Johnson",
    participants: {
      lecturers: 1,
      assistants: 0,
      students: 45,
    },
  },
];

// Mock data for participants
const participantsData = {
  cs101: {
    lecturers: [
      {
        id: "lec-001",
        name: "Dr. Jane Smith",
        email: "jane.smith@university.com",
        role: "Primary Lecturer",
        avatar: "",
        status: "active",
        department: "Computer Science",
      },
    ],
    assistants: [
      {
        id: "ta-001",
        name: "Michael Chen",
        email: "michael.chen@university.com",
        role: "Lab Assistant",
        avatar: "",
        status: "active",
        year: "PhD Student",
      },
      {
        id: "ta-002",
        name: "Sarah Johnson",
        email: "sarah.johnson@university.com",
        role: "Teaching Assistant",
        avatar: "",
        status: "active",
        year: "PhD Student",
      },
    ],
    students: Array.from({ length: 32 }, (_, i) => ({
      id: `std-${(i + 1).toString().padStart(3, "0")}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@university.com`,
      studentId: `20250${(i + 1).toString().padStart(3, "0")}`,
      major:
        i % 3 === 0
          ? "Computer Science"
          : i % 3 === 1
            ? "Information Systems"
            : "Data Science",
      year:
        i % 4 === 0
          ? "Freshman"
          : i % 4 === 1
            ? "Sophomore"
            : i % 4 === 2
              ? "Junior"
              : "Senior",
      avatar: "",
      status: "active",
      group:
        i < 8 ? "Group 1" : i < 16 ? "Group 2" : i < 24 ? "Group 3" : "Group 4",
    })),
  },
  cs101l: {
    lecturers: [
      {
        id: "lec-002",
        name: "Michael Chen",
        email: "michael.chen@university.com",
        role: "Lab Instructor",
        avatar: "",
        status: "active",
        department: "Computer Science",
      },
    ],
    assistants: [
      {
        id: "ta-003",
        name: "Emily Davis",
        email: "emily.davis@university.com",
        role: "Lab Assistant",
        avatar: "",
        status: "active",
        year: "Master Student",
      },
    ],
    students: Array.from({ length: 20 }, (_, i) => ({
      id: `std-${(i + 1).toString().padStart(3, "0")}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@university.com`,
      studentId: `20250${(i + 1).toString().padStart(3, "0")}`,
      major:
        i % 3 === 0
          ? "Computer Science"
          : i % 3 === 1
            ? "Information Systems"
            : "Data Science",
      year:
        i % 4 === 0
          ? "Freshman"
          : i % 4 === 1
            ? "Sophomore"
            : i % 4 === 2
              ? "Junior"
              : "Senior",
      avatar: "",
      status: "active",
      group:
        i < 5
          ? "Lab Group A"
          : i < 10
            ? "Lab Group B"
            : i < 15
              ? "Lab Group C"
              : "Lab Group D",
    })),
  },
};

// Mock data for groups
const groupsData = {
  cs101: [
    {
      id: "grp-001",
      name: "Group 1",
      assignment: "Final Project",
      members: participantsData["cs101"].students.filter(
        (s) => s.group === "Group 1"
      ),
    },
    {
      id: "grp-002",
      name: "Group 2",
      assignment: "Final Project",
      members: participantsData["cs101"].students.filter(
        (s) => s.group === "Group 2"
      ),
    },
    {
      id: "grp-003",
      name: "Group 3",
      assignment: "Final Project",
      members: participantsData["cs101"].students.filter(
        (s) => s.group === "Group 3"
      ),
    },
    {
      id: "grp-004",
      name: "Group 4",
      assignment: "Final Project",
      members: participantsData["cs101"].students.filter(
        (s) => s.group === "Group 4"
      ),
    },
  ],
  cs101l: [
    {
      id: "grp-005",
      name: "Lab Group A",
      assignment: "Lab Project",
      members: participantsData["cs101l"].students.filter(
        (s) => s.group === "Lab Group A"
      ),
    },
    {
      id: "grp-006",
      name: "Lab Group B",
      assignment: "Lab Project",
      members: participantsData["cs101l"].students.filter(
        (s) => s.group === "Lab Group B"
      ),
    },
    {
      id: "grp-007",
      name: "Lab Group C",
      assignment: "Lab Project",
      members: participantsData["cs101l"].students.filter(
        (s) => s.group === "Lab Group C"
      ),
    },
    {
      id: "grp-008",
      name: "Lab Group D",
      assignment: "Lab Project",
      members: participantsData["cs101l"].students.filter(
        (s) => s.group === "Lab Group D"
      ),
    },
  ],
};

const PeoplePage = () => {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Get current course data
  const currentCourse =
    coursesData.find((course) => course.id === selectedCourse) ||
    coursesData[0];

  // Get participants for the selected course
  const participants = participantsData[
    selectedCourse as keyof typeof participantsData
  ] || {
    lecturers: [],
    assistants: [],
    students: [],
  };

  // Get groups for the selected course
  const groups = groupsData[selectedCourse as keyof typeof groupsData] || [];

  // Filter students based on search term
  const filteredStudents = participants.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle participant click
  const handleParticipantClick = (participant: any) => {
    setSelectedParticipant(participant);
    onOpen();
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          People
        </Heading>
        <Text color="gray.500">
          View course participants and group information
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

            <HStack>
              <Badge colorScheme="blue" p={2} borderRadius="md">
                {currentCourse.participants.students} Students
              </Badge>
              <Badge colorScheme="green" p={2} borderRadius="md">
                {currentCourse.participants.lecturers} Lecturer(s)
              </Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md">
                {currentCourse.participants.assistants} Assistant(s)
              </Badge>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Students</Tab>
          <Tab>Teaching Staff</Tab>
          <Tab>Groups</Tab>
        </TabList>

        <TabPanels>
          {/* Students Tab */}
          <TabPanel px={0} pt={5}>
            <Card variant="outline" mb={6}>
              <CardBody>
                <Flex
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                  mb={4}
                >
                  <InputGroup maxW={{ md: "320px" }}>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search students"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>

                  <HStack>
                    <Button
                      leftIcon={<MdPersonAdd />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                    >
                      Export
                    </Button>
                    <Select placeholder="Group Filter" size="sm" maxW="150px">
                      <option value="all">All Groups</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </Flex>

                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Student ID</Th>
                        <Th>Major</Th>
                        <Th>Year</Th>
                        <Th>Group</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredStudents.map((student) => (
                        <Tr
                          key={student.id}
                          _hover={{ bg: "gray.50", cursor: "pointer" }}
                          onClick={() => handleParticipantClick(student)}
                        >
                          <Td>
                            <HStack>
                              <Avatar
                                size="sm"
                                name={student.name}
                                src={student.avatar}
                              />
                              <Text>{student.name}</Text>
                            </HStack>
                          </Td>
                          <Td>{student.studentId}</Td>
                          <Td>{student.major}</Td>
                          <Td>{student.year}</Td>
                          <Td>
                            <Badge colorScheme="blue">{student.group}</Badge>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <Tooltip label="Send message">
                                <IconButton
                                  aria-label="Send message"
                                  icon={<MdMessage />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle message action
                                  }}
                                />
                              </Tooltip>
                              <Tooltip label="View profile">
                                <IconButton
                                  aria-label="View profile"
                                  icon={<MdPerson />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleParticipantClick(student);
                                  }}
                                />
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>

                {filteredStudents.length === 0 && (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.500">
                      No students found matching your search criteria.
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>

          {/* Teaching Staff Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Lecturers */}
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Lecturers
                  </Heading>

                  {participants.lecturers.map((lecturer) => (
                    <Box
                      key={lecturer.id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      mb={4}
                      _hover={{ bg: "gray.50", cursor: "pointer" }}
                      onClick={() => handleParticipantClick(lecturer)}
                    >
                      <Flex direction={{ base: "column", sm: "row" }} gap={4}>
                        <Avatar
                          size="xl"
                          name={lecturer.name}
                          src={lecturer.avatar}
                        />
                        <Box>
                          <Heading size="md" mb={1}>
                            {lecturer.name}
                          </Heading>
                          <Text color="gray.500" mb={2}>
                            {lecturer.role}
                          </Text>

                          <HStack mb={2}>
                            <MdContactMail />
                            <Text>{lecturer.email}</Text>
                          </HStack>

                          <HStack>
                            <MdSchool />
                            <Text>{lecturer.department}</Text>
                          </HStack>

                          <HStack mt={4}>
                            <Button
                              leftIcon={<MdMessage />}
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle message action
                              }}
                            >
                              Message
                            </Button>
                          </HStack>
                        </Box>
                      </Flex>
                    </Box>
                  ))}

                  {participants.lecturers.length === 0 && (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.500">
                        No lecturers assigned to this course.
                      </Text>
                    </Box>
                  )}
                </CardBody>
              </Card>

              {/* Assistants */}
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Teaching Assistants
                  </Heading>

                  {participants.assistants.map((assistant) => (
                    <Box
                      key={assistant.id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      mb={4}
                      _hover={{ bg: "gray.50", cursor: "pointer" }}
                      onClick={() => handleParticipantClick(assistant)}
                    >
                      <Flex direction={{ base: "column", sm: "row" }} gap={4}>
                        <Avatar
                          size="xl"
                          name={assistant.name}
                          src={assistant.avatar}
                        />
                        <Box>
                          <Heading size="md" mb={1}>
                            {assistant.name}
                          </Heading>
                          <Text color="gray.500" mb={2}>
                            {assistant.role}
                          </Text>

                          <HStack mb={2}>
                            <MdContactMail />
                            <Text>{assistant.email}</Text>
                          </HStack>

                          <HStack>
                            <MdSchool />
                            <Text>{assistant.year}</Text>
                          </HStack>

                          <HStack mt={4}>
                            <Button
                              leftIcon={<MdMessage />}
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle message action
                              }}
                            >
                              Message
                            </Button>
                          </HStack>
                        </Box>
                      </Flex>
                    </Box>
                  ))}

                  {participants.assistants.length === 0 && (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.500">
                        No teaching assistants assigned to this course.
                      </Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>

          {/* Groups Tab */}
          <TabPanel px={0} pt={5}>
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Student Groups</Heading>
              <Button leftIcon={<MdGroups />} colorScheme="blue" size="sm">
                Create New Group
              </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {groups.map((group) => (
                <Card key={group.id} variant="outline">
                  <CardBody>
                    <Flex justify="space-between" align="center" mb={3}>
                      <Heading size="md">{group.name}</Heading>
                      <IconButton
                        aria-label="Edit group"
                        icon={<MdEdit />}
                        size="sm"
                        variant="ghost"
                      />
                    </Flex>

                    <Text color="gray.500" mb={4}>
                      Assignment: {group.assignment}
                    </Text>

                    <Text fontWeight="medium" mb={2}>
                      Members ({group.members.length})
                    </Text>
                    <VStack
                      align="stretch"
                      spacing={2}
                      maxH="200px"
                      overflowY="auto"
                    >
                      {group.members.map((member) => (
                        <HStack
                          key={member.id}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={borderColor}
                          _hover={{ bg: "gray.50" }}
                        >
                          <Avatar
                            size="xs"
                            name={member.name}
                            src={member.avatar}
                          />
                          <Text fontSize="sm">{member.name}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              ))}

              {groups.length === 0 && (
                <Box textAlign="center" py={10} gridColumn="1 / -1">
                  <Heading size="md" mb={2}>
                    No Groups Created
                  </Heading>
                  <Text color="gray.500" mb={4}>
                    There are no student groups created for this course yet.
                  </Text>
                  <Button leftIcon={<MdGroups />} colorScheme="blue">
                    Create New Group
                  </Button>
                </Box>
              )}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Participant Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedParticipant?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedParticipant && (
              <VStack align="stretch" spacing={4}>
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap={6}
                  alignItems="center"
                >
                  <Avatar
                    size="2xl"
                    name={selectedParticipant.name}
                    src={selectedParticipant.avatar}
                  />

                  <Box>
                    <Heading size="md" mb={1}>
                      {selectedParticipant.name}
                    </Heading>
                    {selectedParticipant.role && (
                      <Text color="gray.500" mb={2}>
                        {selectedParticipant.role}
                      </Text>
                    )}
                    {selectedParticipant.studentId && (
                      <HStack mb={2}>
                        <Badge colorScheme="blue">Student ID</Badge>
                        <Text>{selectedParticipant.studentId}</Text>
                      </HStack>
                    )}
                    <HStack mb={2}>
                      <EmailIcon color="gray.500" />
                      <Text>{selectedParticipant.email}</Text>
                    </HStack>
                  </Box>
                </Flex>

                <Divider />

                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {selectedParticipant.major && (
                    <Box>
                      <Text fontWeight="bold">Major</Text>
                      <Text>{selectedParticipant.major}</Text>
                    </Box>
                  )}
                  {selectedParticipant.year && (
                    <Box>
                      <Text fontWeight="bold">Year</Text>
                      <Text>{selectedParticipant.year}</Text>
                    </Box>
                  )}
                  {selectedParticipant.department && (
                    <Box>
                      <Text fontWeight="bold">Department</Text>
                      <Text>{selectedParticipant.department}</Text>
                    </Box>
                  )}
                  {selectedParticipant.group && (
                    <Box>
                      <Text fontWeight="bold">Group</Text>
                      <Badge colorScheme="blue">
                        {selectedParticipant.group}
                      </Badge>
                    </Box>
                  )}
                </SimpleGrid>

                {selectedParticipant.studentId && (
                  <>
                    <Divider />

                    <Heading size="sm" mb={2}>
                      Course Performance
                    </Heading>
                    <VStack align="stretch" spacing={2}>
                      <Flex justify="space-between">
                        <Text>Attendance Rate:</Text>
                        <Badge colorScheme="green">92%</Badge>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Current Grade:</Text>
                        <Badge colorScheme="blue">B+</Badge>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Submitted Assignments:</Text>
                        <Text>5 of 6</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Forum Activity:</Text>
                        <Badge colorScheme="purple">8 posts</Badge>
                      </Flex>
                    </VStack>
                  </>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" leftIcon={<MdMessage />}>
              Send Message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PeoplePage;
