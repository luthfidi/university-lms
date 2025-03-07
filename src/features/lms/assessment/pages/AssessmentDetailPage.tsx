import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  InfoIcon,
  WarningIcon,
  CheckIcon,
  TimeIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import {
  MdAssignment,
  MdQuiz,
  MdSchool,
  MdCheckCircle,
  MdOutlineCheckCircleOutline,
  MdTimerOff,
  MdUpload,
  MdDescription,
} from "react-icons/md";

// Mock data for a specific assessment
const assessmentData = {
  id: "assignment-cs101-3",
  title: "Programming Assignment #3",
  courseId: "cs101",
  courseCode: "CS101",
  courseName: "Introduction to Computer Science",
  type: "assignment",
  dueDate: "2025-03-10T23:59:00",
  totalPoints: 100,
  status: "active",
  description:
    "In this assignment, you will implement two fundamental data structures: a Linked List and a Binary Search Tree in Python. You will also write methods to perform common operations on these data structures and analyze their time complexity.",
  instructions: `## Assignment Requirements

### Part 1: Linked List Implementation (50 points)
- Implement a singly linked list class with the following methods:
  - append(value): Add a new node at the end
  - prepend(value): Add a new node at the beginning
  - delete(value): Delete the first occurrence of a value
  - insert(value, position): Insert value at given position
  - search(value): Return true if value exists, false otherwise
  - display(): Return a string representation of the list

### Part 2: Binary Search Tree Implementation (50 points)
- Implement a binary search tree class with the following methods:
  - insert(value): Insert a new value
  - search(value): Return true if value exists, false otherwise
  - delete(value): Remove a node with the given value
  - inOrderTraversal(): Return an array of values in-order
  - preOrderTraversal(): Return an array of values pre-order
  - postOrderTraversal(): Return an array of values post-order

### Submission Requirements
- Submit your code in a single Python file named "assignment3.py"
- Include comments explaining your implementation
- Write a brief analysis (1-2 paragraphs) of the time complexity of your implementations

### Grading Criteria
- Correctness: 70%
- Code quality and style: 20%
- Analysis: 10%`,
  progress: 25,
  lastSaved: "2025-03-05T15:30:00",
  submissionType: "file",
  allowedFileTypes: [".py", ".txt", ".pdf"],
  maxFileSize: 5, // MB
  attempts: {
    allowed: 3,
    used: 1,
    remaining: 2,
  },
  parts: [
    {
      id: "part1",
      title: "Part 1: Linked List Implementation",
      points: 50,
      status: "in-progress",
    },
    {
      id: "part2",
      title: "Part 2: Binary Search Tree Implementation",
      points: 50,
      status: "not-started",
    },
  ],
};

// Mock data for a quiz
const quizData = {
  id: "quiz-cs101-2",
  title: "Quiz 2: Control Structures",
  courseId: "cs101",
  courseCode: "CS101",
  courseName: "Introduction to Computer Science",
  type: "quiz",
  dueDate: "2025-03-10T23:59:00",
  totalPoints: 20,
  totalQuestions: 10,
  timeLimit: 30, // minutes
  status: "active",
  description:
    "This quiz tests your understanding of Python control structures including loops, conditionals, and basic control flow.",
  instructions:
    "You have 30 minutes to complete this quiz. Once you start, you cannot pause the timer. Make sure you have a stable internet connection before beginning.",
  attempts: {
    allowed: 2,
    used: 0,
    remaining: 2,
  },
  questions: [
    {
      id: "q1",
      questionNumber: 1,
      type: "multiple-choice",
      text: "Which of the following is NOT a Python control structure?",
      points: 2,
      options: [
        { id: "opt1", text: "if-else" },
        { id: "opt2", text: "for loop" },
        { id: "opt3", text: "switch-case" },
        { id: "opt4", text: "while loop" },
      ],
      correctAnswer: "opt3",
    },
    {
      id: "q2",
      questionNumber: 2,
      type: "multiple-choice",
      text: "What is the output of the following code?\n\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i)",
      points: 2,
      options: [
        { id: "opt1", text: "0 1 2 3 4" },
        { id: "opt2", text: "0 1 2 4" },
        { id: "opt3", text: "0 1 2" },
        { id: "opt4", text: "3" },
      ],
      correctAnswer: "opt2",
    },
    // More questions would be here in a real app
  ],
};

// Helper function to format date
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

// Get assessment icon based on type
const getAssessmentIcon = (type: string) => {
  switch (type) {
    case "assignment":
      return MdAssignment;
    case "quiz":
      return MdQuiz;
    case "exam":
      return MdSchool;
    default:
      return MdDescription;
  }
};

const AssessmentDetailPage = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  // For demonstration, we're choosing between assignment and quiz based on ID
  const isQuiz = assessmentId?.includes("quiz");

  // Use the appropriate data based on assessment type
  const assessment = isQuiz ? quizData : assessmentData;

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // State for quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [quizTime, setQuizTime] = useState(quizData.timeLimit * 60); // in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  // Modal control
  const {
    isOpen: isStartModalOpen,
    onOpen: onStartModalOpen,
    onClose: onStartModalClose,
  } = useDisclosure();

  const {
    isOpen: isSubmitModalOpen,
    onOpen: onSubmitModalOpen,
    onClose: onSubmitModalClose,
  } = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = (
        assessmentData.allowedFileTypes as string[]
      ).map((ext) => (ext.startsWith(".") ? ext.substring(1) : ext));

      if (!allowedExtensions.includes(fileExtension || "")) {
        toast({
          title: "Invalid file type",
          description: `Please upload a file with one of these extensions: ${assessmentData.allowedFileTypes.join(", ")}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Validate file size
      if (file.size > assessmentData.maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${assessmentData.maxFileSize}MB`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  // Simulate file upload
  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "File uploaded successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, 300);
  };

  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
    onStartModalClose();

    // In a real app, you would start a timer here
    // For simplicity, we're not implementing the timer functionality in this demo
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    // In a real app, you would submit answers to the server here
    toast({
      title: "Quiz submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Navigate to results page
    navigate(`/lms/assessment/${assessmentId}/result`);
  };

  const renderAssignmentContent = () => (
    <>
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4} wrap="wrap">
              <Stat>
                <StatLabel>Due Date</StatLabel>
                <StatHelpText fontSize="lg" fontWeight="bold">
                  {formatDate(assessment.dueDate)}
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Time Remaining</StatLabel>
                <StatHelpText fontSize="lg" fontWeight="bold">
                  {getTimeRemaining(assessment.dueDate)}
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Points</StatLabel>
                <StatNumber>{assessment.totalPoints}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Attempts</StatLabel>
                <StatHelpText fontSize="lg" fontWeight="bold">
                  {assessmentData.attempts.used}/
                  {assessmentData.attempts.allowed}
                </StatHelpText>
              </Stat>
            </HStack>

            <Box>
              <Text fontWeight="bold">Last Saved</Text>
              <Text>
                {assessmentData.lastSaved
                  ? formatDate(assessmentData.lastSaved)
                  : "Not saved yet"}
              </Text>
            </Box>

            <Box>
              <HStack justify="space-between">
                <Text fontWeight="bold">Progress</Text>
                <Text>{assessmentData.progress}%</Text>
              </HStack>
              <Progress
                value={assessmentData.progress}
                size="sm"
                colorScheme="green"
                borderRadius="full"
                mb={2}
              />
            </Box>
          </VStack>
        </CardBody>
      </Card>

      <Box mb={6}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Description
        </Text>
        <Text>{assessment.description}</Text>
      </Box>

      <Box mb={6}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Instructions
        </Text>
        <Card variant="outline" p={4}>
          <Text whiteSpace="pre-wrap">{assessment.instructions}</Text>
        </Card>
      </Box>

      <Accordion allowToggle mb={6}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Assignment Parts
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={3}>
              {assessmentData.parts.map((part) => (
                <ListItem key={part.id}>
                  <HStack>
                    <ListIcon
                      as={
                        part.status === "completed"
                          ? MdCheckCircle
                          : part.status === "in-progress"
                            ? MdOutlineCheckCircleOutline
                            : MdTimerOff
                      }
                      color={
                        part.status === "completed"
                          ? "green.500"
                          : part.status === "in-progress"
                            ? "blue.500"
                            : "gray.500"
                      }
                    />
                    <Box>
                      <Text fontWeight="medium">{part.title}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {part.points} points
                      </Text>
                    </Box>
                    <Badge
                      ml="auto"
                      colorScheme={
                        part.status === "completed"
                          ? "green"
                          : part.status === "in-progress"
                            ? "blue"
                            : "gray"
                      }
                    >
                      {part.status === "completed"
                        ? "Completed"
                        : part.status === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                    </Badge>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box mb={6}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Submit Your Assignment
        </Text>
        <Card variant="outline" p={4}>
          <VStack spacing={4} align="stretch">
            <Text>
              Upload your assignment file. Allowed file types:{" "}
              {assessmentData.allowedFileTypes.join(", ")}. Maximum file size:{" "}
              {assessmentData.maxFileSize}MB.
            </Text>

            <FormControl>
              <FormLabel htmlFor="file-upload">Select file to upload</FormLabel>
              <InputGroup>
                <Input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  placeholder="Choose file"
                  padding={1}
                  disabled={isUploading}
                />
                <InputRightElement width="4.5rem">
                  <Tooltip label="Upload file">
                    <IconButton
                      aria-label="Upload file"
                      icon={<AttachmentIcon />}
                      size="sm"
                      isDisabled={!selectedFile || isUploading}
                      onClick={handleUpload}
                    />
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {selectedFile && (
              <HStack>
                <Text fontSize="sm">Selected: {selectedFile.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </Text>
              </HStack>
            )}

            {isUploading && (
              <Box>
                <Text mb={1}>Uploading: {uploadProgress}%</Text>
                <Progress value={uploadProgress} size="sm" colorScheme="blue" />
              </Box>
            )}

            <FormControl>
              <FormLabel htmlFor="comments">Comments (optional)</FormLabel>
              <Textarea
                id="comments"
                placeholder="Add any comments for your instructor..."
                rows={3}
              />
            </FormControl>

            <HStack justify="flex-end">
              <Button
                colorScheme="blue"
                leftIcon={<MdUpload />}
                onClick={onSubmitModalOpen}
                isDisabled={!selectedFile || isUploading}
              >
                Submit Assignment
              </Button>
            </HStack>
          </VStack>
        </Card>
      </Box>

      {/* Submit Confirmation Modal */}
      <Modal isOpen={isSubmitModalOpen} onClose={onSubmitModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning" mb={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Are you sure you want to submit?</Text>
                <Text>This will count as one of your submission attempts.</Text>
              </Box>
            </Alert>
            <Text>
              You have used {assessmentData.attempts.used} out of{" "}
              {assessmentData.attempts.allowed} allowed attempts.
            </Text>
            {selectedFile && (
              <Text mt={2}>File to be submitted: {selectedFile.name}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onSubmitModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onSubmitModalClose();
                // In a real app, submit the assignment here
                toast({
                  title: "Assignment submitted successfully",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Confirm Submission
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  const renderQuizContent = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
      <>
        {!quizStarted ? (
          <>
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              mb={6}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4} wrap="wrap">
                    <Stat>
                      <StatLabel>Available Until</StatLabel>
                      <StatHelpText fontSize="lg" fontWeight="bold">
                        {formatDate(quizData.dueDate)}
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Time Limit</StatLabel>
                      <StatHelpText fontSize="lg" fontWeight="bold">
                        {quizData.timeLimit} minutes
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Questions</StatLabel>
                      <StatNumber>{quizData.totalQuestions}</StatNumber>
                    </Stat>

                    <Stat>
                      <StatLabel>Attempts</StatLabel>
                      <StatHelpText fontSize="lg" fontWeight="bold">
                        {quizData.attempts.used}/{quizData.attempts.allowed}
                      </StatHelpText>
                    </Stat>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            <Box mb={6}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Description
              </Text>
              <Text>{quizData.description}</Text>
            </Box>

            <Box mb={6}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Instructions
              </Text>
              <Card variant="outline" p={4}>
                <Text>{quizData.instructions}</Text>
              </Card>
            </Box>

            <Alert status="warning" mb={6}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Important</Text>
                <Text>
                  Once you start the quiz, the timer will begin and cannot be
                  paused. Make sure you have enough time to complete the quiz
                  before starting.
                </Text>
              </Box>
            </Alert>

            <Flex justify="center" mb={6}>
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<TimeIcon />}
                onClick={onStartModalOpen}
              >
                Start Quiz
              </Button>
            </Flex>

            {/* Start Quiz Modal */}
            <Modal isOpen={isStartModalOpen} onClose={onStartModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Start Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Alert status="warning" mb={4}>
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="bold">Are you ready to begin?</Text>
                      <Text>
                        Once you start, you'll have {quizData.timeLimit} minutes
                        to complete all {quizData.totalQuestions} questions.
                      </Text>
                    </Box>
                  </Alert>
                  <Text>
                    This quiz will count as one of your attempts. You have used{" "}
                    {quizData.attempts.used} out of {quizData.attempts.allowed}{" "}
                    allowed attempts.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" mr={3} onClick={onStartModalClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={handleStartQuiz}>
                    Begin Quiz
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            {/* Quiz Interface */}
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              mb={6}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Badge
                      colorScheme="green"
                      p={2}
                      borderRadius="md"
                      fontSize="md"
                    >
                      Question {currentQuestionIndex + 1} of{" "}
                      {quizData.questions.length}
                    </Badge>
                    <Badge
                      colorScheme="red"
                      p={2}
                      borderRadius="md"
                      fontSize="md"
                    >
                      <Icon as={TimeIcon} mr={1} />
                      Time Remaining: {Math.floor(quizTime / 60)}:
                      {(quizTime % 60).toString().padStart(2, "0")}
                    </Badge>
                  </HStack>

                  <Divider />

                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={4}>
                      {currentQuestion.questionNumber}. {currentQuestion.text}
                    </Text>

                    <RadioGroup
                      value={selectedAnswers[currentQuestion.id] || ""}
                      onChange={(value) =>
                        handleAnswerSelect(currentQuestion.id, value)
                      }
                    >
                      <VStack spacing={3} align="stretch">
                        {currentQuestion.options.map((option) => (
                          <Box
                            key={option.id}
                            borderWidth="1px"
                            borderRadius="md"
                            p={3}
                            _hover={{ bg: "gray.50" }}
                            bg={
                              selectedAnswers[currentQuestion.id] === option.id
                                ? "blue.50"
                                : undefined
                            }
                            borderColor={
                              selectedAnswers[currentQuestion.id] === option.id
                                ? "blue.300"
                                : "gray.200"
                            }
                          >
                            <Radio value={option.id} width="100%">
                              <Text>{option.text}</Text>
                            </Radio>
                          </Box>
                        ))}
                      </VStack>
                    </RadioGroup>
                  </Box>

                  <Divider />

                  <HStack justify="space-between">
                    <Button
                      onClick={handlePrevQuestion}
                      isDisabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>

                    <HStack>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Mark question for review in a real app
                          toast({
                            title: "Question marked for review",
                            status: "info",
                            duration: 2000,
                          });
                        }}
                      >
                        Mark for Review
                      </Button>
                      {currentQuestionIndex < quizData.questions.length - 1 ? (
                        <Button colorScheme="blue" onClick={handleNextQuestion}>
                          Next
                        </Button>
                      ) : (
                        <Button colorScheme="green" onClick={onSubmitModalOpen}>
                          Finish
                        </Button>
                      )}
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            <Card variant="outline" mb={6}>
              <CardBody>
                <Heading size="sm" mb={3}>
                  Question Navigator
                </Heading>
                <Flex flexWrap="wrap" gap={2}>
                  {quizData.questions.map((question, index) => (
                    <Button
                      key={question.id}
                      size="sm"
                      variant={
                        currentQuestionIndex === index ? "solid" : "outline"
                      }
                      colorScheme={
                        currentQuestionIndex === index
                          ? "blue"
                          : selectedAnswers[question.id]
                            ? "green"
                            : "gray"
                      }
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </Flex>
              </CardBody>
            </Card>

            {/* Submit Quiz Modal */}
            <Modal isOpen={isSubmitModalOpen} onClose={onSubmitModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Submit Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Alert
                    status={
                      Object.keys(selectedAnswers).length ===
                      quizData.questions.length
                        ? "info"
                        : "warning"
                    }
                    mb={4}
                  >
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="bold">
                        {Object.keys(selectedAnswers).length ===
                        quizData.questions.length
                          ? "Ready to submit?"
                          : "Some questions are not answered"}
                      </Text>
                      <Text>
                        {Object.keys(selectedAnswers).length ===
                        quizData.questions.length
                          ? "You have answered all questions."
                          : `You have answered ${Object.keys(selectedAnswers).length} out of ${quizData.questions.length} questions.`}
                      </Text>
                    </Box>
                  </Alert>
                  <Text mb={4}>
                    Once submitted, you cannot return to this attempt.
                  </Text>
                  {Object.keys(selectedAnswers).length !==
                    quizData.questions.length && (
                    <Text fontWeight="bold" color="orange.500">
                      Are you sure you want to submit without answering all
                      questions?
                    </Text>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" mr={3} onClick={onSubmitModalClose}>
                    Return to Quiz
                  </Button>
                  <Button colorScheme="blue" onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </>
    );
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
          <BreadcrumbLink href="/lms/assessment">Assessments</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{assessment.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Assessment Header */}
      <Flex
        align="center"
        mb={6}
        bg="brand.primary.50"
        p={4}
        borderRadius="md"
        borderLeftWidth="4px"
        borderLeftColor="brand.primary.500"
      >
        <Icon
          as={getAssessmentIcon(assessment.type)}
          boxSize={6}
          color="brand.primary.600"
          mr={3}
        />
        <Box flex="1">
          <HStack mb={1}>
            <Badge colorScheme="blue">{assessment.courseCode}</Badge>
            <Text color="brand.primary.600">•</Text>
            <Text color="brand.primary.600">{assessment.courseName}</Text>
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
          <Heading size="lg" mb={1}>
            {assessment.title}
          </Heading>
        </Box>
      </Flex>

      {/* Render content based on assessment type */}
      {isQuiz ? renderQuizContent() : renderAssignmentContent()}
    </Box>
  );
};

export default AssessmentDetailPage;
