import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Flex,
  HStack,
  VStack,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  Select,
  useColorModeValue,
  Avatar,
  Divider,
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
} from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { MdAttachFile, MdOpenInNew } from "react-icons/md";

// Mock data for announcements
const announcementData = [
  {
    id: "ann-1",
    title: "Mid-term Exam Schedule Posted",
    content:
      "The mid-term examination schedule has been posted on the University portal. Please review your exam schedule and make sure you have no conflicts. If you find any conflicts, please contact the Academic Office immediately.",
    category: "Academic",
    date: "2025-03-05T10:30:00",
    author: {
      name: "Academic Office",
      avatar: "",
      role: "admin",
    },
    target: "University",
    isRead: true,
    attachments: [{ name: "midterm_schedule.pdf", size: "256 KB" }],
  },
  {
    id: "ann-2",
    title: "CS101 Assignment #3 Extended Deadline",
    content:
      "Due to the university system maintenance scheduled for this weekend, the deadline for Assignment #3 has been extended by 24 hours. The new deadline is March 11th, 2025 at 23:59.",
    category: "Course",
    date: "2025-03-04T14:15:00",
    author: {
      name: "Dr. Jane Smith",
      avatar: "",
      role: "lecturer",
    },
    target: "CS101",
    isRead: true,
    attachments: [],
  },
  {
    id: "ann-3",
    title: "Library Hours Extended During Finals Week",
    content:
      "The University Library will extend its hours during finals week (March 25-31). The library will be open from 7:00 AM to 2:00 AM to accommodate students preparing for final exams.",
    category: "Facilities",
    date: "2025-03-03T09:45:00",
    author: {
      name: "Library Services",
      avatar: "",
      role: "admin",
    },
    target: "University",
    isRead: false,
    attachments: [],
  },
  {
    id: "ann-4",
    title: "Important: System Maintenance This Weekend",
    content:
      "The University Information System (including LMS and email) will be undergoing scheduled maintenance this Saturday, March 8th, from 23:00 to 05:00. During this time, all systems will be unavailable. Please plan accordingly.",
    category: "System",
    date: "2025-03-02T16:30:00",
    author: {
      name: "IT Department",
      avatar: "",
      role: "admin",
    },
    target: "University",
    isRead: true,
    attachments: [],
  },
  {
    id: "ann-5",
    title: "Guest Lecture: Artificial Intelligence and Ethics",
    content:
      'We are pleased to announce that Dr. Maria Rodriguez, a leading expert in AI Ethics, will be giving a guest lecture on "Ethical Considerations in Artificial Intelligence Development" on March 20th, 2025 at 15:00 in the Main Auditorium. All students are welcome to attend.',
    category: "Event",
    date: "2025-03-01T11:20:00",
    author: {
      name: "Computer Science Department",
      avatar: "",
      role: "admin",
    },
    target: "Department",
    isRead: false,
    attachments: [{ name: "guest_lecture_poster.jpg", size: "1.2 MB" }],
  },
  {
    id: "ann-6",
    title: "MATH201 Study Group Formation",
    content:
      "In preparation for the upcoming midterm exam, we will be forming study groups in next week's class. Please come prepared with your availability for study sessions outside of class time.",
    category: "Course",
    date: "2025-02-28T13:45:00",
    author: {
      name: "Prof. Robert Johnson",
      avatar: "",
      role: "lecturer",
    },
    target: "MATH201",
    isRead: true,
    attachments: [],
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return (
      "Today, " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } else if (diffDays === 1) {
    return (
      "Yesterday, " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

// Helper function to get category badge color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Academic":
      return "blue";
    case "Course":
      return "green";
    case "System":
      return "red";
    case "Event":
      return "purple";
    case "Facilities":
      return "orange";
    default:
      return "gray";
  }
};

const AnnouncementPage = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<
    (typeof announcementData)[0] | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const highlightColor = useColorModeValue("blue.50", "blue.900");

  // Filter announcements based on search term and category
  const filteredAnnouncements = announcementData.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || announcement.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Handle announcement click
  const handleAnnouncementClick = (
    announcement: (typeof announcementData)[0]
  ) => {
    setSelectedAnnouncement(announcement);
    onOpen();
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Announcements
        </Heading>
        <Text color="gray.500">
          Stay updated with important university and course announcements
        </Text>
      </Box>

      {/* Filters */}
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
          <Input
            placeholder="Search announcements"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Flex
          flex={{ md: 1 }}
          gap={4}
          direction={{ base: "column", sm: "row" }}
        >
          <Select
            placeholder="All Categories"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Course">Course</option>
            <option value="System">System</option>
            <option value="Event">Event</option>
            <option value="Facilities">Facilities</option>
          </Select>

          <Select placeholder="All Sources">
            <option value="all">All Sources</option>
            <option value="university">University</option>
            <option value="department">Department</option>
            <option value="course">Courses</option>
          </Select>
        </Flex>
      </Flex>

      {/* Announcements Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>All Announcements</Tab>
          <Tab>
            Unread
            <Badge ml={2} colorScheme="red" borderRadius="full">
              {announcementData.filter((a) => !a.isRead).length}
            </Badge>
          </Tab>
          <Tab>Course Announcements</Tab>
        </TabList>

        <TabPanels>
          {/* All Announcements Tab */}
          <TabPanel px={0} pt={5}>
            {filteredAnnouncements.length === 0 ? (
              <Box textAlign="center" p={10}>
                <Box fontSize="6xl" mb={4}>
                  📭
                </Box>
                <Heading size="md" mb={2}>
                  No Announcements Found
                </Heading>
                <Text color="gray.500">
                  There are no announcements matching your search criteria.
                </Text>
              </Box>
            ) : (
              <VStack spacing={4} align="stretch">
                {filteredAnnouncements.map((announcement) => (
                  <Card
                    key={announcement.id}
                    bg={announcement.isRead ? cardBg : highlightColor}
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="sm"
                    borderRadius="lg"
                    overflow="hidden"
                    _hover={{
                      boxShadow: "md",
                      transform: "translateY(-2px)",
                      transition: "all 0.2s ease-in-out",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAnnouncementClick(announcement)}
                  >
                    <CardBody>
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <HStack>
                          {!announcement.isRead && (
                            <Badge colorScheme="red" borderRadius="full">
                              New
                            </Badge>
                          )}
                          <Badge
                            colorScheme={getCategoryColor(
                              announcement.category
                            )}
                          >
                            {announcement.category}
                          </Badge>
                          {announcement.target !== "University" && (
                            <Badge variant="outline" colorScheme="blue">
                              {announcement.target}
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                          {formatDate(announcement.date)}
                        </Text>
                      </Flex>

                      <Heading size="md" mb={2}>
                        {announcement.title}
                      </Heading>

                      <Text
                        noOfLines={2}
                        color={useColorModeValue("gray.600", "gray.300")}
                        mb={4}
                      >
                        {announcement.content}
                      </Text>

                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Avatar
                            size="xs"
                            name={announcement.author.name}
                            src={announcement.author.avatar}
                          />
                          <Text fontSize="sm" fontWeight="medium">
                            {announcement.author.name}
                          </Text>
                        </HStack>

                        {announcement.attachments.length > 0 && (
                          <HStack>
                            <MdAttachFile />
                            <Text fontSize="sm">
                              {announcement.attachments.length} attachment(s)
                            </Text>
                          </HStack>
                        )}
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            )}
          </TabPanel>

          {/* Unread Tab */}
          <TabPanel px={0} pt={5}>
            <VStack spacing={4} align="stretch">
              {announcementData.filter((a) => !a.isRead).length === 0 ? (
                <Box textAlign="center" p={10}>
                  <Box fontSize="6xl" mb={4}>
                    ✅
                  </Box>
                  <Heading size="md" mb={2}>
                    All Caught Up!
                  </Heading>
                  <Text color="gray.500">
                    You've read all your announcements.
                  </Text>
                </Box>
              ) : (
                announcementData
                  .filter((a) => !a.isRead)
                  .map((announcement) => (
                    <Card
                      key={announcement.id}
                      bg={highlightColor}
                      borderWidth="1px"
                      borderColor={borderColor}
                      boxShadow="sm"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{
                        boxShadow: "md",
                        transform: "translateY(-2px)",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAnnouncementClick(announcement)}
                    >
                      <CardBody>
                        <Flex justify="space-between" align="flex-start" mb={2}>
                          <HStack>
                            <Badge colorScheme="red" borderRadius="full">
                              New
                            </Badge>
                            <Badge
                              colorScheme={getCategoryColor(
                                announcement.category
                              )}
                            >
                              {announcement.category}
                            </Badge>
                            {announcement.target !== "University" && (
                              <Badge variant="outline" colorScheme="blue">
                                {announcement.target}
                              </Badge>
                            )}
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            {formatDate(announcement.date)}
                          </Text>
                        </Flex>

                        <Heading size="md" mb={2}>
                          {announcement.title}
                        </Heading>

                        <Text
                          noOfLines={2}
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={4}
                        >
                          {announcement.content}
                        </Text>

                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar
                              size="xs"
                              name={announcement.author.name}
                              src={announcement.author.avatar}
                            />
                            <Text fontSize="sm" fontWeight="medium">
                              {announcement.author.name}
                            </Text>
                          </HStack>

                          {announcement.attachments.length > 0 && (
                            <HStack>
                              <MdAttachFile />
                              <Text fontSize="sm">
                                {announcement.attachments.length} attachment(s)
                              </Text>
                            </HStack>
                          )}
                        </Flex>
                      </CardBody>
                    </Card>
                  ))
              )}
            </VStack>
          </TabPanel>

          {/* Course Announcements Tab */}
          <TabPanel px={0} pt={5}>
            <VStack spacing={4} align="stretch">
              {announcementData.filter(
                (a) => a.target !== "University" && a.target !== "Department"
              ).length === 0 ? (
                <Box textAlign="center" p={10}>
                  <Box fontSize="6xl" mb={4}>
                    📋
                  </Box>
                  <Heading size="md" mb={2}>
                    No Course Announcements
                  </Heading>
                  <Text color="gray.500">
                    There are no announcements from your courses.
                  </Text>
                </Box>
              ) : (
                announcementData
                  .filter(
                    (a) =>
                      a.target !== "University" && a.target !== "Department"
                  )
                  .map((announcement) => (
                    <Card
                      key={announcement.id}
                      bg={announcement.isRead ? cardBg : highlightColor}
                      borderWidth="1px"
                      borderColor={borderColor}
                      boxShadow="sm"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{
                        boxShadow: "md",
                        transform: "translateY(-2px)",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAnnouncementClick(announcement)}
                    >
                      <CardBody>
                        <Flex justify="space-between" align="flex-start" mb={2}>
                          <HStack>
                            {!announcement.isRead && (
                              <Badge colorScheme="red" borderRadius="full">
                                New
                              </Badge>
                            )}
                            <Badge
                              colorScheme={getCategoryColor(
                                announcement.category
                              )}
                            >
                              {announcement.category}
                            </Badge>
                            <Badge variant="outline" colorScheme="blue">
                              {announcement.target}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            {formatDate(announcement.date)}
                          </Text>
                        </Flex>

                        <Heading size="md" mb={2}>
                          {announcement.title}
                        </Heading>

                        <Text
                          noOfLines={2}
                          color={useColorModeValue("gray.600", "gray.300")}
                          mb={4}
                        >
                          {announcement.content}
                        </Text>

                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar
                              size="xs"
                              name={announcement.author.name}
                              src={announcement.author.avatar}
                            />
                            <Text fontSize="sm" fontWeight="medium">
                              {announcement.author.name}
                            </Text>
                          </HStack>

                          {announcement.attachments.length > 0 && (
                            <HStack>
                              <MdAttachFile />
                              <Text fontSize="sm">
                                {announcement.attachments.length} attachment(s)
                              </Text>
                            </HStack>
                          )}
                        </Flex>
                      </CardBody>
                    </Card>
                  ))
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Announcement Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Badge
                colorScheme={
                  selectedAnnouncement
                    ? getCategoryColor(selectedAnnouncement.category)
                    : "gray"
                }
              >
                {selectedAnnouncement?.category}
              </Badge>
              {selectedAnnouncement?.target !== "University" && (
                <Badge variant="outline" colorScheme="blue">
                  {selectedAnnouncement?.target}
                </Badge>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAnnouncement && (
              <VStack align="stretch" spacing={4}>
                <Heading size="lg">{selectedAnnouncement.title}</Heading>

                <HStack>
                  <Avatar
                    size="sm"
                    name={selectedAnnouncement.author.name}
                    src={selectedAnnouncement.author.avatar}
                  />
                  <Box>
                    <Text fontWeight="medium">
                      {selectedAnnouncement.author.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDate(selectedAnnouncement.date)}
                    </Text>
                  </Box>
                </HStack>

                <Divider />

                <Text whiteSpace="pre-line">
                  {selectedAnnouncement.content}
                </Text>

                {selectedAnnouncement.attachments.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Attachments:
                    </Text>
                    <VStack align="stretch" pl={2}>
                      {selectedAnnouncement.attachments.map(
                        (attachment, index) => (
                          <HStack key={index} spacing={2}>
                            <MdAttachFile />
                            <Text flex="1">{attachment.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {attachment.size}
                            </Text>
                            <IconButton
                              aria-label="Download attachment"
                              icon={<MdOpenInNew />}
                              size="sm"
                              variant="ghost"
                            />
                          </HStack>
                        )
                      )}
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" leftIcon={<BellIcon />}>
              Mark as {selectedAnnouncement?.isRead ? "unread" : "read"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AnnouncementPage;
