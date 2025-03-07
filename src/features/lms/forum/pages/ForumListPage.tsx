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
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  VStack,
  Icon,
  useColorModeValue,
  Select,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MdForum, MdChat, MdPeople, MdClass } from "react-icons/md";

// Mock data for forums
const forumData = [
  {
    id: "forum-cs101",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    topics: [
      {
        id: "topic-cs101-1",
        title: "General Discussion",
        description: "General questions and discussions about the course",
        threadCount: 12,
        unreadCount: 3,
        latestPost: {
          date: "2025-03-05T14:30:00",
          author: "John Doe",
          avatar: "",
        },
        isAssignment: false,
        participants: 15,
      },
      {
        id: "topic-cs101-2",
        title: "Assignment #1 Discussion",
        description: "Questions and clarifications about Assignment #1",
        threadCount: 8,
        unreadCount: 0,
        latestPost: {
          date: "2025-02-16T09:15:00",
          author: "Dr. Jane Smith",
          avatar: "",
        },
        isAssignment: true,
        dueDate: "2025-02-17T23:59:00",
        participants: 10,
      },
      {
        id: "topic-cs101-3",
        title: "Assignment #2 Discussion",
        description: "Questions and clarifications about Assignment #2",
        threadCount: 15,
        unreadCount: 5,
        latestPost: {
          date: "2025-02-23T16:45:00",
          author: "Emily Johnson",
          avatar: "",
        },
        isAssignment: true,
        dueDate: "2025-03-10T23:59:00",
        participants: 18,
      },
    ],
  },
  {
    id: "forum-math201",
    courseCode: "MATH201",
    courseName: "Calculus I",
    topics: [
      {
        id: "topic-math201-1",
        title: "General Discussion",
        description: "General questions and discussions about the course",
        threadCount: 5,
        unreadCount: 2,
        latestPost: {
          date: "2025-03-04T10:20:00",
          author: "Robert Brown",
          avatar: "",
        },
        isAssignment: false,
        participants: 12,
      },
      {
        id: "topic-math201-2",
        title: "Problem Set Discussion",
        description: "Discuss weekly problem sets",
        threadCount: 10,
        unreadCount: 0,
        latestPost: {
          date: "2025-03-01T11:30:00",
          author: "Prof. Robert Johnson",
          avatar: "",
        },
        isAssignment: false,
        participants: 8,
      },
    ],
  },
  {
    id: "forum-eng102",
    courseCode: "ENG102",
    courseName: "English Composition",
    topics: [
      {
        id: "topic-eng102-1",
        title: "General Discussion",
        description: "General questions and discussions about the course",
        threadCount: 7,
        unreadCount: 0,
        latestPost: {
          date: "2025-02-28T09:45:00",
          author: "Sarah Wilson",
          avatar: "",
        },
        isAssignment: false,
        participants: 9,
      },
      {
        id: "topic-eng102-2",
        title: "Essay Feedback",
        description: "Peer feedback for essay drafts",
        threadCount: 14,
        unreadCount: 4,
        latestPost: {
          date: "2025-03-03T14:20:00",
          author: "Dr. Emily Williams",
          avatar: "",
        },
        isAssignment: true,
        dueDate: "2025-03-15T23:59:00",
        participants: 20,
      },
    ],
  },
];

// Helper to format date
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
    return date.toLocaleDateString();
  }
};

const ForumListPage = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Forums
        </Heading>
        <Text color="gray.500">
          Participate in course discussions and collaborate with classmates
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
          <Input placeholder="Search forums" />
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
            <option value="general">General Discussion</option>
            <option value="assignment">Assignment Discussion</option>
          </Select>
        </Flex>
      </Flex>

      {/* Forums List */}
      <VStack spacing={8} align="stretch">
        {forumData.map((forum) => (
          <Box key={forum.id}>
            <Flex
              align="center"
              mb={4}
              bg="brand.primary.50"
              p={3}
              borderRadius="md"
              borderLeftWidth="4px"
              borderLeftColor="brand.primary.500"
            >
              <Icon as={MdClass} boxSize={5} color="brand.primary.600" mr={2} />
              <Box>
                <Heading size="md" color="brand.primary.700">
                  {forum.courseCode}
                </Heading>
                <Text color="brand.primary.600">{forum.courseName}</Text>
              </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
              {forum.topics.map((topic) => (
                <Card
                  key={topic.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={cardBg}
                  boxShadow="sm"
                  borderRadius="lg"
                  _hover={{
                    borderColor: "brand.primary.300",
                    boxShadow: "md",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/lms/forum/${topic.id}`)}
                >
                  <CardBody p={4}>
                    <Flex direction="column" h="full">
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box>
                          <Flex align="center">
                            <Heading size="sm" mb={1}>
                              {topic.title}
                            </Heading>
                            {topic.unreadCount > 0 && (
                              <Badge
                                colorScheme="red"
                                ml={2}
                                borderRadius="full"
                              >
                                {topic.unreadCount} new
                              </Badge>
                            )}
                          </Flex>
                          {topic.isAssignment && (
                            <Badge colorScheme="orange" mb={2}>
                              Assignment Discussion
                            </Badge>
                          )}
                        </Box>
                        <Icon as={MdForum} boxSize={5} color="gray.400" />
                      </Flex>

                      <Text fontSize="sm" mb={3} color="gray.600" noOfLines={2}>
                        {topic.description}
                      </Text>

                      <HStack mb={3} spacing={4} fontSize="sm" color="gray.500">
                        <Flex align="center">
                          <Icon as={MdChat} mr={1} />
                          <Text>{topic.threadCount} threads</Text>
                        </Flex>
                        <Flex align="center">
                          <Icon as={MdPeople} mr={1} />
                          <Text>{topic.participants} participants</Text>
                        </Flex>
                      </HStack>

                      <Divider mb={3} />

                      <Flex mt="auto" justify="space-between" align="center">
                        <HStack>
                          <Avatar
                            size="xs"
                            name={topic.latestPost.author}
                            src={topic.latestPost.avatar}
                          />
                          <Box fontSize="xs">
                            <Text fontWeight="medium">
                              {topic.latestPost.author}
                            </Text>
                            <Text color="gray.500">
                              {formatDate(topic.latestPost.date)}
                            </Text>
                          </Box>
                        </HStack>

                        {topic.isAssignment && topic.dueDate && (
                          <Tooltip
                            label={`Due: ${new Date(topic.dueDate).toLocaleString()}`}
                          >
                            <Badge colorScheme="blue" fontSize="xs">
                              Due {new Date(topic.dueDate).toLocaleDateString()}
                            </Badge>
                          </Tooltip>
                        )}
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ForumListPage;
