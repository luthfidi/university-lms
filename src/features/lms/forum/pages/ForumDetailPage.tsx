import { useState } from "react";
import { useParams } from "react-router-dom";
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
  Button,
  Avatar,
  Divider,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Textarea,
  useColorModeValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  AddIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  MdClass,
  MdReply,
  MdEdit,
  MdDelete,
  MdFlag,
  MdPersonPin,
} from "react-icons/md";

// Mock data for forum threads
const forumTopicData = {
  id: "topic-cs101-2",
  courseId: "cs101",
  courseCode: "CS101",
  courseName: "Introduction to Computer Science",
  title: "Assignment #1 Discussion",
  description:
    "Questions and clarifications about Assignment #1 - Algorithm Design and Pseudocode",
  isAssignment: true,
  dueDate: "2025-02-17T23:59:00",
  threads: [
    {
      id: "thread-1",
      title: "Clarification on Problem 3",
      content: `I'm having trouble understanding the requirements for Problem 3 in the assignment. The instructions say to "design an algorithm using pseudocode for finding the median value in an unsorted array." I'm not sure if we're allowed to sort the array first or if we need to find the median without sorting.

Can someone clarify this, or perhaps suggest an approach? Thanks!`,
      author: {
        id: "student-1",
        name: "John Doe",
        role: "student",
        avatar: "",
      },
      createdAt: "2025-02-10T14:30:00",
      isAnnouncement: false,
      isPinned: false,
      replies: [
        {
          id: "reply-1",
          content: `Good question, John. For Problem 3, you are allowed to use sorting as part of your algorithm. However, I'd like you to also think about the efficiency of your solution.

If you sort the array first (which is perfectly acceptable), make sure to discuss the time complexity of your overall approach. Can you think of any ways to find the median without sorting the entire array?`,
          author: {
            id: "lecturer-1",
            name: "Dr. Jane Smith",
            role: "lecturer",
            avatar: "",
          },
          createdAt: "2025-02-10T15:45:00",
          isPrivate: false,
        },
        {
          id: "reply-2",
          content: `Thanks for the clarification, Dr. Smith! I'll implement a sorting-based approach first and then see if I can come up with a more efficient solution.

For others who are interested, I found a good resource explaining median-finding algorithms: [Introduction to Selection Algorithms](https://example.com/selection-algorithms)`,
          author: {
            id: "student-1",
            name: "John Doe",
            role: "student",
            avatar: "",
          },
          createdAt: "2025-02-10T16:20:00",
          isPrivate: false,
        },
        {
          id: "reply-3",
          content: `I believe there's a linear-time algorithm for finding the median called "Median of Medians" or "BFPRT algorithm" that doesn't require sorting the entire array. It's a bit complex though.`,
          author: {
            id: "student-2",
            name: "Emily Johnson",
            role: "student",
            avatar: "",
          },
          createdAt: "2025-02-10T18:10:00",
          isPrivate: false,
        },
      ],
    },
    {
      id: "thread-2",
      title: "Announcement: Extended Deadline",
      content: `Dear students,

Due to the university system maintenance scheduled for this weekend, I am extending the deadline for Assignment #1 by 24 hours. 

The new deadline is Monday, February 18th, at 23:59.

Please use this additional time to review your work and ensure your solutions are well-documented.

Best regards,
Dr. Jane Smith`,
      author: {
        id: "lecturer-1",
        name: "Dr. Jane Smith",
        role: "lecturer",
        avatar: "",
      },
      createdAt: "2025-02-15T09:00:00",
      isAnnouncement: true,
      isPinned: true,
      replies: [],
    },
    {
      id: "thread-3",
      title: "Question about Pseudocode Notation",
      content: `Hi everyone,

I'm a bit confused about the pseudocode notation we should be using for this assignment. Should we follow the notation used in the textbook, or are we free to use any clear notation?

Also, do we need to include explanations along with the pseudocode?

Thanks!`,
      author: {
        id: "student-3",
        name: "Michael Chen",
        role: "student",
        avatar: "",
      },
      createdAt: "2025-02-12T11:20:00",
      isAnnouncement: false,
      isPinned: false,
      replies: [
        {
          id: "reply-4",
          content: `You can use any clear pseudocode notation, but it should be consistent and understandable. Yes, please include brief explanations to clarify your thinking process.`,
          author: {
            id: "lecturer-1",
            name: "Dr. Jane Smith",
            role: "lecturer",
            avatar: "",
          },
          createdAt: "2025-02-12T13:40:00",
          isPrivate: false,
        },
      ],
    },
  ],
};

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ForumDetailPage = () => {
  const {  } = useParams<{ topicId: string }>();
  const [replyText, setReplyText] = useState("");
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const announcementBg = useColorModeValue("red.50", "red.900");
  const pinnedBg = useColorModeValue("yellow.50", "yellow.900");

  // For a real app, we would fetch the forum topic data based on topicId
  const topic = forumTopicData; // Using mock data

  // Sort threads to show pinned ones first
  const sortedThreads = [...topic.threads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreateThread = () => {
    // In a real app, this would navigate to a thread creation form
    alert("Navigate to create thread page");
  };

  const handleSubmitReply = (threadId: string) => {
    if (!replyText.trim()) return;

    // In a real app, this would submit the reply to the API
    alert(`Submitting reply to thread ${threadId}: ${replyText}`);
    setReplyText("");
    setActiveThreadId(null);
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        mb={6}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/lms/forum">Forums</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/lms/courses/${topic.courseId}`}>
            {topic.courseCode}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{topic.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Forum Header */}
      <Flex
        align="center"
        mb={6}
        bg="brand.primary.50"
        p={4}
        borderRadius="md"
        borderLeftWidth="4px"
        borderLeftColor="brand.primary.500"
      >
        <Icon as={MdClass} boxSize={6} color="brand.primary.600" mr={3} />
        <Box flex="1">
          <HStack mb={1}>
            <Heading size="md" color="brand.primary.700">
              {topic.courseCode}
            </Heading>
            <Text color="brand.primary.600">•</Text>
            <Text color="brand.primary.600">{topic.courseName}</Text>
          </HStack>
          <Heading size="lg" mb={2}>
            {topic.title}
          </Heading>
          <Text color="gray.600">{topic.description}</Text>

          {topic.isAssignment && topic.dueDate && (
            <Badge colorScheme="orange" mt={2}>
              Due: {formatDate(topic.dueDate)}
            </Badge>
          )}
        </Box>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleCreateThread}
          ml={4}
        >
          New Thread
        </Button>
      </Flex>

      {/* Threads List */}
      <VStack spacing={6} align="stretch">
        {sortedThreads.map((thread) => (
          <Card
            key={thread.id}
            borderWidth="1px"
            borderColor={borderColor}
            bg={
              thread.isAnnouncement
                ? announcementBg
                : thread.isPinned
                  ? pinnedBg
                  : cardBg
            }
            boxShadow="sm"
            borderRadius="lg"
            overflow="hidden"
          >
            <CardBody p={0}>
              {/* Thread Header */}
              <Box
                p={4}
                borderBottomWidth="1px"
                borderColor={borderColor}
                bg={useColorModeValue("gray.50", "gray.700")}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  wrap="wrap"
                  gap={2}
                >
                  <HStack>
                    {thread.isAnnouncement && (
                      <Badge colorScheme="red">Announcement</Badge>
                    )}
                    {thread.isPinned && (
                      <Badge colorScheme="yellow">Pinned</Badge>
                    )}
                    <Heading size="md">{thread.title}</Heading>
                  </HStack>

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<SettingsIcon />}
                      variant="ghost"
                      size="sm"
                      aria-label="Thread options"
                    />
                    <MenuList>
                      <MenuItem icon={<MdEdit />}>Edit</MenuItem>
                      <MenuItem icon={<MdDelete />} color="red.500">
                        Delete
                      </MenuItem>
                      <MenuItem icon={<MdFlag />}>Report</MenuItem>
                      {!thread.isPinned && (
                        <MenuItem icon={<MdPersonPin />}>Pin Thread</MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>

              {/* Thread Content */}
              <Box p={4}>
                <HStack mb={4} spacing={3}>
                  <Avatar
                    size="md"
                    name={thread.author.name}
                    src={thread.author.avatar}
                    bg={
                      thread.author.role === "lecturer"
                        ? "brand.secondary.500"
                        : "brand.primary.500"
                    }
                  />
                  <Box>
                    <HStack>
                      <Text fontWeight="bold">{thread.author.name}</Text>
                      {thread.author.role === "lecturer" && (
                        <Badge colorScheme="teal">Lecturer</Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                      {formatDate(thread.createdAt)}
                    </Text>
                  </Box>
                </HStack>

                <Text whiteSpace="pre-line" mb={4}>
                  {thread.content}
                </Text>

                <HStack justify="flex-end" spacing={4} mb={2}>
                  <Button
                    leftIcon={<MdReply />}
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveThreadId(thread.id)}
                  >
                    Reply
                  </Button>
                </HStack>
              </Box>

              {/* Replies */}
              {thread.replies.length > 0 && (
                <Box p={4} pt={0}>
                  <Divider mb={4} />
                  <Heading size="sm" mb={4}>
                    Replies ({thread.replies.length})
                  </Heading>

                  <VStack spacing={4} align="stretch">
                    {thread.replies.map((reply) => (
                      <Card key={reply.id} variant="outline" p={4}>
                        <HStack mb={3} spacing={3}>
                          <Avatar
                            size="sm"
                            name={reply.author.name}
                            src={reply.author.avatar}
                            bg={
                              reply.author.role === "lecturer"
                                ? "brand.secondary.500"
                                : "brand.primary.500"
                            }
                          />
                          <Box>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">
                                {reply.author.name}
                              </Text>
                              {reply.author.role === "lecturer" && (
                                <Badge colorScheme="teal" size="sm">
                                  Lecturer
                                </Badge>
                              )}
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              {formatDate(reply.createdAt)}
                            </Text>
                          </Box>
                        </HStack>

                        <Text whiteSpace="pre-line" fontSize="sm" ml={10}>
                          {reply.content}
                        </Text>
                      </Card>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Reply Form */}
              {activeThreadId === thread.id && (
                <Box p={4} bg={useColorModeValue("gray.50", "gray.700")}>
                  <Heading size="sm" mb={3}>
                    Post a Reply
                  </Heading>
                  <Textarea
                    placeholder="Write your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    mb={3}
                    rows={4}
                  />
                  <HStack justify="flex-end" spacing={3}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyText("");
                        setActiveThreadId(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      isDisabled={!replyText.trim()}
                      onClick={() => handleSubmitReply(thread.id)}
                    >
                      Post Reply
                    </Button>
                  </HStack>
                </Box>
              )}
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default ForumDetailPage;
