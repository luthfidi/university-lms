import { useState, useRef, useEffect } from "react";
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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Tag,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  SearchIcon,
  InfoIcon,
  ChevronDownIcon,
  CloseIcon,
  AttachmentIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import {
  MdSend,
  MdMoreVert,
  MdDeleteOutline,
  MdArchive,
  MdPerson,
  MdGroup,
  MdPeopleOutline,
  MdPersonAdd,
  MdOutlineEmojiEmotions,
  MdOutlinePushPin,
  MdArrowBack,
  MdContentCopy,
  MdEdit,
  MdFilterList,
  MdRefresh,
  MdOutlineForward,
  MdOutlineReply,
} from "react-icons/md";
import useAuthStore from "@/store/authStore";

// Mock data for conversations
const conversationsData = [
  {
    id: "conv-001",
    participants: [
      {
        id: "lec-001",
        name: "Dr. Jane Smith",
        email: "jane.smith@university.com",
        avatar: "",
        role: "lecturer",
        status: "online",
      },
    ],
    lastMessage: {
      content:
        "Please remember to submit your assignment by Friday at 11:59 PM.",
      timestamp: "2025-03-07T10:30:00",
      senderId: "lec-001",
      isRead: true,
    },
    isGroup: false,
    unreadCount: 0,
    pinned: false,
  },
  {
    id: "conv-002",
    participants: [
      {
        id: "std-003",
        name: "Emily Johnson",
        email: "emily.johnson@university.com",
        avatar: "",
        role: "student",
        status: "offline",
      },
    ],
    lastMessage: {
      content: "Can we meet to discuss the project tomorrow?",
      timestamp: "2025-03-06T15:45:00",
      senderId: "std-003",
      isRead: false,
    },
    isGroup: false,
    unreadCount: 2,
    pinned: true,
  },
  {
    id: "conv-003",
    participants: [
      {
        id: "std-005",
        name: "Michael Brown",
        email: "michael.brown@university.com",
        avatar: "",
        role: "student",
        status: "online",
      },
      {
        id: "std-008",
        name: "Sarah Wilson",
        email: "sarah.wilson@university.com",
        avatar: "",
        role: "student",
        status: "offline",
      },
      {
        id: "std-012",
        name: "Robert Davis",
        email: "robert.davis@university.com",
        avatar: "",
        role: "student",
        status: "online",
      },
    ],
    lastMessage: {
      content: "Ive uploaded my part of the presentation to Google Drive.",
      timestamp: "2025-03-05T20:15:00",
      senderId: "std-012",
      isRead: true,
    },
    isGroup: true,
    groupName: "Group 2 - CS101 Project",
    unreadCount: 0,
    pinned: true,
  },
  {
    id: "conv-004",
    participants: [
      {
        id: "ta-001",
        name: "Michael Chen",
        email: "michael.chen@university.com",
        avatar: "",
        role: "assistant",
        status: "away",
      },
    ],
    lastMessage: {
      content: "Ill be available for office hours from 2-4pm tomorrow.",
      timestamp: "2025-03-03T14:20:00",
      senderId: "ta-001",
      isRead: true,
    },
    isGroup: false,
    unreadCount: 0,
    pinned: false,
  },
  {
    id: "conv-005",
    participants: [
      {
        id: "adm-001",
        name: "Academic Office",
        email: "academic.office@university.com",
        avatar: "",
        role: "admin",
        status: "online",
      },
    ],
    lastMessage: {
      content: "Your registration for the summer semester has been confirmed.",
      timestamp: "2025-03-01T09:45:00",
      senderId: "adm-001",
      isRead: true,
    },
    isGroup: false,
    unreadCount: 0,
    pinned: false,
  },
];

// Mock data for messages in a conversation
const messagesData = {
  "conv-001": [
    {
      id: "msg-001",
      content:
        "Hello everyone, I wanted to remind you about the upcoming assignment deadline.",
      timestamp: "2025-03-06T10:15:00",
      senderId: "lec-001",
      status: "sent",
    },
    {
      id: "msg-002",
      content:
        "The deadline is this Friday at 11:59 PM. Please make sure to submit your work on time.",
      timestamp: "2025-03-06T10:16:00",
      senderId: "lec-001",
      status: "sent",
    },
    {
      id: "msg-003",
      content:
        "If you have any questions or need an extension, please let me know as soon as possible.",
      timestamp: "2025-03-06T10:18:00",
      senderId: "lec-001",
      status: "sent",
    },
    {
      id: "msg-004",
      content:
        "Thank you for the reminder, Dr. Smith. I have a question about the assignment requirements.",
      timestamp: "2025-03-06T14:30:00",
      senderId: "user-current",
      status: "read",
    },
    {
      id: "msg-005",
      content:
        "For the second part of the assignment, are we supposed to include code examples or just theoretical explanations?",
      timestamp: "2025-03-06T14:32:00",
      senderId: "user-current",
      status: "read",
    },
    {
      id: "msg-006",
      content:
        "Good question. Please include both theoretical explanations and code examples to demonstrate your understanding.",
      timestamp: "2025-03-07T10:25:00",
      senderId: "lec-001",
      status: "sent",
    },
    {
      id: "msg-007",
      content:
        "Please remember to submit your assignment by Friday at 11:59 PM.",
      timestamp: "2025-03-07T10:30:00",
      senderId: "lec-001",
      status: "sent",
    },
  ],
  "conv-002": [
    {
      id: "msg-101",
      content:
        "Hi, Im working on our group project and had some questions about your part.",
      timestamp: "2025-03-06T15:30:00",
      senderId: "std-003",
      status: "sent",
    },
    {
      id: "msg-102",
      content:
        "Could you explain how your component integrates with mine? Im not sure I understand the interface.",
      timestamp: "2025-03-06T15:32:00",
      senderId: "std-003",
      status: "sent",
    },
    {
      id: "msg-103",
      content:
        "Also, when do you think youll be done with your part? We need to integrate everything by Sunday.",
      timestamp: "2025-03-06T15:35:00",
      senderId: "std-003",
      status: "sent",
    },
    {
      id: "msg-104",
      content: "Can we meet to discuss the project tomorrow?",
      timestamp: "2025-03-06T15:45:00",
      senderId: "std-003",
      status: "sent",
    },
  ],
  "conv-003": [
    {
      id: "msg-201",
      content:
        "Hey team, hows everyone doing with their parts of the presentation?",
      timestamp: "2025-03-05T10:00:00",
      senderId: "std-005",
      status: "read",
    },
    {
      id: "msg-202",
      content: "Im almost done with the introduction and background sections.",
      timestamp: "2025-03-05T10:15:00",
      senderId: "user-current",
      status: "read",
    },
    {
      id: "msg-203",
      content:
        "Im still working on the methodology section but should be done by tomorrow.",
      timestamp: "2025-03-05T10:30:00",
      senderId: "std-008",
      status: "read",
    },
    {
      id: "msg-204",
      content: "Im finishing up the results and discussion sections tonight.",
      timestamp: "2025-03-05T15:45:00",
      senderId: "std-012",
      status: "read",
    },
    {
      id: "msg-205",
      content:
        "Great progress everyone! Lets plan to meet on Thursday to practice the presentation.",
      timestamp: "2025-03-05T16:20:00",
      senderId: "std-005",
      status: "read",
    },
    {
      id: "msg-206",
      content: "Thursday works for me. What time were you thinking?",
      timestamp: "2025-03-05T16:45:00",
      senderId: "user-current",
      status: "read",
    },
    {
      id: "msg-207",
      content: "How about 3 PM in the library study room?",
      timestamp: "2025-03-05T17:30:00",
      senderId: "std-005",
      status: "read",
    },
    {
      id: "msg-208",
      content: "Works for me!",
      timestamp: "2025-03-05T18:00:00",
      senderId: "std-008",
      status: "read",
    },
    {
      id: "msg-209",
      content:
        "Ill be there. Ive uploaded my part of the presentation to Google Drive.",
      timestamp: "2025-03-05T20:15:00",
      senderId: "std-012",
      status: "read",
    },
  ],
};

// Helper function to format date for conversation list
const formatConversationDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
};

// Helper function to format date for messages
const formatMessageDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper function to format full date for message groups
const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return "Today";
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "green";
    case "away":
      return "orange";
    case "busy":
      return "red";
    default:
      return "gray";
  }
};

// Helper function to get participant display name for conversation
const getConversationName = (conversation: any, currentUserId: string) => {
  if (conversation.isGroup) {
    return conversation.groupName;
  }

  const otherParticipant = conversation.participants[0];
  return otherParticipant.name;
};

const MessagingPage = () => {
  const { user } = useAuthStore();
  const [conversations, setConversations] = useState(conversationsData);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    isOpen: isNewMessageOpen,
    onOpen: onNewMessageOpen,
    onClose: onNewMessageClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const selectedBg = useColorModeValue("blue.50", "blue.900");

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conversation) => {
    const name = getConversationName(conversation, user?.id || "");
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get current conversation messages
  const currentMessages = selectedConversation
    ? messagesData[selectedConversation as keyof typeof messagesData] || []
    : [];

  // Get current conversation data
  const currentConversationData = selectedConversation
    ? conversations.find((c) => c.id === selectedConversation)
    : null;

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would send the message to the server
    console.log(`Sending message to ${selectedConversation}: ${newMessage}`);

    // Clear input
    setNewMessage("");
  };

  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);

    if (isMobile) {
      setIsDrawerOpen(true);
    }

    // In a real app, this would mark messages as read
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    );
    setConversations(updatedConversations);
  };

  // Group messages by date
  const groupedMessages: Record<string, typeof currentMessages> = {};
  currentMessages.forEach((message) => {
    const date = new Date(message.timestamp);
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }

    groupedMessages[dateKey].push(message);
  });

  // Render message content
  const renderMessageList = () => {
    if (!selectedConversation) {
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          h="full"
          p={10}
          textAlign="center"
        >
          <Box fontSize="6xl" mb={6}>
            💬
          </Box>
          <Heading size="md" mb={2}>
            Select a Conversation
          </Heading>
          <Text color="gray.500">
            Choose a conversation from the list or start a new one.
          </Text>
          <Button
            leftIcon={<MdPersonAdd />}
            colorScheme="blue"
            mt={6}
            onClick={onNewMessageOpen}
          >
            New Message
          </Button>
        </Flex>
      );
    }

    return (
      <VStack spacing={0} align="stretch" h="full">
        {/* Conversation Header */}
        <Flex
          p={4}
          borderBottomWidth="1px"
          borderColor={borderColor}
          align="center"
          bg={cardBg}
        >
          {isMobile && (
            <IconButton
              icon={<MdArrowBack />}
              aria-label="Back to conversations"
              variant="ghost"
              mr={2}
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          <Avatar
            size="md"
            name={getConversationName(currentConversationData, user?.id || "")}
          />

          <Box ml={3} flex="1">
            <Flex align="center">
              <Text fontWeight="bold">
                {getConversationName(currentConversationData, user?.id || "")}
              </Text>
              {!currentConversationData?.isGroup &&
                currentConversationData?.participants[0].status && (
                  <Badge
                    ml={2}
                    colorScheme={getStatusColor(
                      currentConversationData.participants[0].status
                    )}
                    variant="subtle"
                  >
                    {currentConversationData.participants[0].status}
                  </Badge>
                )}
            </Flex>

            <Text fontSize="sm" color="gray.500">
              {currentConversationData?.isGroup
                ? `${currentConversationData.participants.length} participants`
                : currentConversationData?.participants[0].email}
            </Text>
          </Box>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdMoreVert />}
              variant="ghost"
              aria-label="More options"
            />
            <MenuList>
              <MenuItem icon={<MdPerson />}>View Profile</MenuItem>
              <MenuItem icon={<MdContentCopy />}>Copy Email</MenuItem>
              {currentConversationData?.pinned ? (
                <MenuItem icon={<MdOutlinePushPin />}>
                  Unpin Conversation
                </MenuItem>
              ) : (
                <MenuItem icon={<MdOutlinePushPin />}>
                  Pin Conversation
                </MenuItem>
              )}
              <MenuDivider />
              <MenuItem icon={<MdArchive />}>Archive</MenuItem>
              <MenuItem
                icon={<MdDeleteOutline />}
                color="red.500"
                onClick={onDeleteDialogOpen}
              >
                Delete Conversation
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Messages */}
        <Box
          flex="1"
          p={4}
          overflowY="auto"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          {Object.keys(groupedMessages).map((dateKey) => {
            const messages = groupedMessages[dateKey];
            const dateLabel = formatFullDate(messages[0].timestamp);

            return (
              <Box key={dateKey} mb={6}>
                <Flex align="center" mb={4}>
                  <Divider flex="1" />
                  <Text
                    mx={4}
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="medium"
                  >
                    {dateLabel}
                  </Text>
                  <Divider flex="1" />
                </Flex>

                <VStack spacing={4} align="stretch">
                  {messages.map((message) => {
                    const isSentByCurrentUser =
                      message.senderId === "user-current";

                    return (
                      <Flex
                        key={message.id}
                        justify={
                          isSentByCurrentUser ? "flex-end" : "flex-start"
                        }
                      >
                        <Box
                          maxW="70%"
                          bg={isSentByCurrentUser ? "blue.500" : cardBg}
                          color={isSentByCurrentUser ? "white" : "inherit"}
                          p={3}
                          borderRadius="lg"
                          boxShadow="sm"
                          borderWidth={!isSentByCurrentUser ? "1px" : undefined}
                          borderColor={borderColor}
                        >
                          <Text mb={1}>{message.content}</Text>
                          <Flex
                            justify="flex-end"
                            align="center"
                            fontSize="xs"
                            color={
                              isSentByCurrentUser
                                ? "whiteAlpha.800"
                                : "gray.500"
                            }
                          >
                            <Text>{formatMessageDate(message.timestamp)}</Text>
                            {isSentByCurrentUser && (
                              <CheckIcon ml={1} boxSize={3} />
                            )}
                          </Flex>
                        </Box>
                      </Flex>
                    );
                  })}
                </VStack>
              </Box>
            );
          })}

          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Box p={4} bg={cardBg} borderTopWidth="1px" borderColor={borderColor}>
          <Flex gap={2}>
            <InputGroup size="md">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                pr="4.5rem"
              />
              <InputRightElement width="4.5rem">
                <HStack spacing={1}>
                  <IconButton
                    aria-label="Add attachment"
                    icon={<AttachmentIcon />}
                    size="sm"
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Add emoji"
                    icon={<MdOutlineEmojiEmotions />}
                    size="sm"
                    variant="ghost"
                  />
                </HStack>
              </InputRightElement>
            </InputGroup>
            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              icon={<MdSend />}
              onClick={handleSendMessage}
              isDisabled={!newMessage.trim()}
            />
          </Flex>
        </Box>
      </VStack>
    );
  };

  // Mobile drawer for conversation
  const conversationDrawer = (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p={0}>{renderMessageList()}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Box h="calc(100vh - 140px)">
      {/* Page Header */}
      <Box mb={4}>
        <Heading size="lg" mb={2}>
          Messages
        </Heading>
        <Text color="gray.500">
          Communicate with your instructors and classmates
        </Text>
      </Box>

      {/* Main Content */}
      <Flex
        h="calc(100% - 80px)"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
      >
        {/* Conversations List */}
        <Box
          w={{ base: "full", md: "320px" }}
          borderRightWidth={{ base: 0, md: "1px" }}
          borderColor={borderColor}
          display={{ base: isDrawerOpen ? "none" : "block", md: "block" }}
        >
          <Box
            p={3}
            borderBottomWidth="1px"
            borderColor={borderColor}
            bg={cardBg}
          >
            <Flex justify="space-between" align="center" mb={3}>
              <Heading size="md">Conversations</Heading>
              <Button
                leftIcon={<MdPersonAdd />}
                colorScheme="blue"
                size="sm"
                onClick={onNewMessageOpen}
              >
                New
              </Button>
            </Flex>

            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Box>

          <Box overflowY="auto" h="calc(100% - 115px)">
            {filteredConversations.length === 0 ? (
              <Box textAlign="center" p={6}>
                <Text color="gray.500">No conversations found</Text>
              </Box>
            ) : (
              <VStack spacing={0} align="stretch">
                {filteredConversations.map((conversation) => {
                  const isSelected = selectedConversation === conversation.id;
                  const conversationName = getConversationName(
                    conversation,
                    user?.id || ""
                  );

                  return (
                    <Box
                      key={conversation.id}
                      p={3}
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      bg={isSelected ? selectedBg : undefined}
                      _hover={{
                        bg: isSelected ? selectedBg : "gray.50",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <Flex>
                        <Box position="relative">
                          <Avatar
                            size="md"
                            name={conversationName}
                            src={
                              conversation.isGroup
                                ? undefined
                                : conversation.participants[0].avatar
                            }
                            icon={
                              conversation.isGroup ? (
                                <MdGroup size={24} />
                              ) : undefined
                            }
                          />
                          {!conversation.isGroup &&
                            conversation.participants[0].status && (
                              <Box
                                position="absolute"
                                bottom="0"
                                right="0"
                                w="12px"
                                h="12px"
                                bg={`${getStatusColor(conversation.participants[0].status)}.500`}
                                borderRadius="full"
                                borderWidth="2px"
                                borderColor="white"
                              />
                            )}
                        </Box>

                        <Box ml={3} flex="1" overflow="hidden">
                          <Flex justify="space-between" align="center">
                            <Text
                              fontWeight={
                                conversation.unreadCount > 0 ? "bold" : "medium"
                              }
                              fontSize="sm"
                              isTruncated
                            >
                              {conversationName}
                            </Text>
                            <HStack spacing={1}>
                              {conversation.pinned && <MdOutlinePushPin />}
                              <Text fontSize="xs" color="gray.500">
                                {formatConversationDate(
                                  conversation.lastMessage.timestamp
                                )}
                              </Text>
                            </HStack>
                          </Flex>

                          <Flex justify="space-between" align="center">
                            <Text
                              fontSize="xs"
                              color="gray.600"
                              noOfLines={1}
                              flex="1"
                            >
                              {conversation.lastMessage.senderId ===
                                "user-current" && "You: "}
                              {conversation.lastMessage.content}
                            </Text>

                            {conversation.unreadCount > 0 && (
                              <Badge
                                colorScheme="red"
                                borderRadius="full"
                                px={2}
                                fontSize="xs"
                              >
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            )}
          </Box>
        </Box>

        {/* Message Content */}
        <Box
          flex="1"
          display={{ base: isDrawerOpen ? "block" : "none", md: "block" }}
        >
          {renderMessageList()}
        </Box>
      </Flex>

      {/* Mobile Drawer */}
      {isMobile && conversationDrawer}

      {/* New Message Modal */}
      <Modal isOpen={isNewMessageOpen} onClose={onNewMessageClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="medium" mb={2}>
                  To:
                </Text>
                <Input placeholder="Search for people or groups" />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Message:
                </Text>
                <Textarea placeholder="Type your message here..." rows={5} />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewMessageClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" leftIcon={<MdSend />}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Conversation
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteDialogClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteDialogClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MessagingPage;
