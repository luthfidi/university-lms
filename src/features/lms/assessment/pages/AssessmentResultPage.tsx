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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Icon,
  Divider,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tooltip,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdAssignment,
  MdQuiz,
  MdSchool,
  MdPerson,
  MdDateRange,
  MdAccessTime,
  MdCircle,
} from "react-icons/md";

// Mock data for a quiz result
const quizResultData = {
  id: "quiz-cs101-2",
  title: "Quiz 2: Control Structures",
  courseId: "cs101",
  courseCode: "CS101",
  courseName: "Introduction to Computer Science",
  type: "quiz",
  submittedDate: "2025-03-06T10:35:00",
  dueDate: "2025-03-06T23:59:00", // Added dueDate property
  timeTaken: 25, // minutes
  totalPoints: 20,
  earnedPoints: 18,
  percentage: 90,
  grade: "A",
  feedback:
    "Excellent understanding of control structures. Keep up the good work!",
  questions: [
    {
      id: "q1",
      questionNumber: 1,
      type: "multiple-choice",
      text: "Which of the following is NOT a Python control structure?",
      points: 2,
      earnedPoints: 2,
      isCorrect: true,
      options: [
        { id: "opt1", text: "if-else" },
        { id: "opt2", text: "for loop" },
        { id: "opt3", text: "switch-case" },
        { id: "opt4", text: "while loop" },
      ],
      correctAnswer: "opt3",
      selectedAnswer: "opt3",
      explanation:
        "Python does not have a switch-case statement like other languages such as C or Java. Python 3.10+ introduced the match-case statement which provides similar functionality.",
    },
    {
      id: "q2",
      questionNumber: 2,
      type: "multiple-choice",
      text: "What is the output of the following code?\n\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i)",
      points: 2,
      earnedPoints: 2,
      isCorrect: true,
      options: [
        { id: "opt1", text: "0 1 2 3 4" },
        { id: "opt2", text: "0 1 2 4" },
        { id: "opt3", text: "0 1 2" },
        { id: "opt4", text: "3" },
      ],
      correctAnswer: "opt2",
      selectedAnswer: "opt2",
      explanation:
        "The continue statement skips the rest of the code inside the loop for the current iteration. When i equals 3, the print statement is skipped, so 3 is not printed.",
    },
    {
      id: "q3",
      questionNumber: 3,
      type: "multiple-choice",
      text: 'What does the "break" statement do in Python?',
      points: 2,
      earnedPoints: 0,
      isCorrect: false,
      options: [
        { id: "opt1", text: "Exits the current function" },
        { id: "opt2", text: "Skips the current iteration of a loop" },
        { id: "opt3", text: "Immediately terminates the loop" },
        { id: "opt4", text: "Causes a runtime error" },
      ],
      correctAnswer: "opt3",
      selectedAnswer: "opt2",
      explanation:
        "The break statement exits the loop immediately, terminating the loop completely. The continue statement skips the current iteration and moves to the next one.",
    },
    // More questions would be here in a real app
  ],
  statistics: {
    classAverage: 72,
    highestScore: 100,
    lowestScore: 40,
    numberOfStudents: 32,
    scoringDistribution: [
      { range: "0-59", count: 4 },
      { range: "60-69", count: 8 },
      { range: "70-79", count: 10 },
      { range: "80-89", count: 6 },
      { range: "90-100", count: 4 },
    ],
  },
};

// Mock data for an assignment result
const assignmentResultData = {
  id: "assignment-cs101-2",
  title: "Programming Assignment #2",
  courseId: "cs101",
  courseCode: "CS101",
  courseName: "Introduction to Computer Science",
  type: "assignment",
  submittedDate: "2025-02-24T22:30:00",
  dueDate: "2025-02-24T23:59:00",
  totalPoints: 100,
  earnedPoints: 90,
  percentage: 90,
  grade: "A",
  submittedFiles: ["assignment2.py", "readme.txt"],
  feedback: {
    overall: "Excellent work! Your solution was well-structured and efficient.",
    breakdown: [
      {
        category: "Functionality",
        score: 35,
        maxScore: 40,
        comments:
          "Your program correctly implements most of the required functionality. However, there was a minor issue with input validation that should be addressed.",
      },
      {
        category: "Code Quality",
        score: 28,
        maxScore: 30,
        comments:
          "Very clean, well-structured code. Good use of functions and appropriate naming conventions.",
      },
      {
        category: "Documentation",
        score: 15,
        maxScore: 15,
        comments:
          "Excellent documentation. Your comments were clear and helpful, and your README file provided comprehensive instructions.",
      },
      {
        category: "Testing",
        score: 12,
        maxScore: 15,
        comments: "Good test coverage, but some edge cases were not addressed.",
      },
    ],
  },
  statistics: {
    classAverage: 82,
    highestScore: 98,
    lowestScore: 65,
    numberOfStudents: 32,
    scoringDistribution: [
      { range: "60-69", count: 3 },
      { range: "70-79", count: 8 },
      { range: "80-89", count: 12 },
      { range: "90-100", count: 9 },
    ],
  },
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
      return MdAssignment;
  }
};

// Get grade color
const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "green";
    case "B":
      return "blue";
    case "C":
      return "yellow";
    case "D":
      return "orange";
    case "F":
      return "red";
    default:
      return "gray";
  }
};

const AssessmentResultPage = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();

  // For demonstration, choose between quiz and assignment based on ID
  const isQuiz = assessmentId?.includes("quiz");

  // Use the appropriate data based on assessment type
  const result = isQuiz ? quizResultData : assignmentResultData;

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Render quiz result content
  const renderQuizResult = () => (
    <>
      {/* Score Summary */}
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
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">
                Score
              </Text>
              <HStack justify="center" spacing={2} mt={1}>
                <Heading
                  size="2xl"
                  color={
                    result.percentage >= 90
                      ? "green.500"
                      : result.percentage >= 80
                        ? "blue.500"
                        : result.percentage >= 70
                          ? "yellow.500"
                          : result.percentage >= 60
                            ? "orange.500"
                            : "red.500"
                  }
                >
                  {result.percentage}%
                </Heading>
                <Badge
                  colorScheme={getGradeColor(result.grade)}
                  fontSize="xl"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  {result.grade}
                </Badge>
              </HStack>
              <Text mt={1} fontWeight="medium">
                {result.earnedPoints}/{result.totalPoints} points
              </Text>
            </Box>

            <VStack align="stretch" spacing={3}>
              <HStack>
                <Icon as={MdDateRange} color="gray.500" />
                <Text fontWeight="medium">Submitted: </Text>
                <Text>{formatDate(result.submittedDate)}</Text>
              </HStack>
              <HStack>
                <Icon as={MdDateRange} color="gray.500" />
                <Text fontWeight="medium">Due Date: </Text>
                <Text>{formatDate(result.dueDate)}</Text>
              </HStack>
              {isQuiz ? (
                <HStack>
                  <Icon as={MdAccessTime} color="gray.500" />
                  <Text fontWeight="medium">Time Taken: </Text>
                  <Text>{quizResultData.timeTaken} minutes</Text>
                </HStack>
              ) : (
                <HStack>
                  <Icon as={MdPerson} color="gray.500" />
                  <Text fontWeight="medium">Files: </Text>
                  <HStack>
                    {assignmentResultData.submittedFiles.map((file, index) => (
                      <Tag
                        key={index}
                        size="md"
                        colorScheme="blue"
                        borderRadius="full"
                      >
                        <TagLeftIcon boxSize="12px" as={MdAssignment} />
                        <TagLabel>{file}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </HStack>
              )}
            </VStack>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>
                Class Performance
              </Text>
              <HStack spacing={4} align="center" mb={3}>
                <Stat size="sm">
                  <StatLabel fontSize="xs">Average</StatLabel>
                  <StatNumber fontSize="md">
                    {result.statistics.classAverage}%
                  </StatNumber>
                </Stat>
                <Stat size="sm">
                  <StatLabel fontSize="xs">Highest</StatLabel>
                  <StatNumber fontSize="md">
                    {result.statistics.highestScore}%
                  </StatNumber>
                </Stat>
              </HStack>
              <Box position="relative" pt={5}>
                <Progress
                  value={result.statistics.classAverage}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                />
                <Box
                  position="absolute"
                  top="0"
                  left={`${result.percentage}%`}
                  transform="translateX(-50%)"
                >
                  <Tooltip label="Your Score">
                    <Icon as={MdCircle} color="green.500" />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Questions Section (for Quiz) */}
      {isQuiz && (
        <Card variant="outline" mb={6}>
          <CardBody>
            <Heading size="md" mb={4}>
              Quiz Questions
            </Heading>
            <Accordion allowMultiple>
              {quizResultData.questions.map((question, index) => (
                <AccordionItem key={question.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <HStack>
                          <Box>
                            <Text fontWeight="bold">
                              Question {question.questionNumber}
                            </Text>
                          </Box>
                          <Badge
                            colorScheme={question.isCorrect ? "green" : "red"}
                          >
                            {question.isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                          <Text>
                            {question.earnedPoints}/{question.points} points
                          </Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack align="stretch" spacing={4}>
                      <Text fontWeight="medium" whiteSpace="pre-wrap">
                        {question.text}
                      </Text>

                      <Divider />

                      <Box>
                        <Text fontWeight="bold" mb={2}>
                          Your Answer:
                        </Text>
                        {question.options.map((option) => (
                          <HStack
                            key={option.id}
                            p={2}
                            bg={
                              question.selectedAnswer === option.id
                                ? question.isCorrect
                                  ? "green.50"
                                  : "red.50"
                                : option.id === question.correctAnswer
                                  ? "green.50"
                                  : undefined
                            }
                            borderRadius="md"
                            borderWidth={
                              option.id === question.selectedAnswer ||
                              option.id === question.correctAnswer
                                ? "1px"
                                : undefined
                            }
                            borderColor={
                              option.id === question.correctAnswer
                                ? "green.200"
                                : option.id === question.selectedAnswer &&
                                    !question.isCorrect
                                  ? "red.200"
                                  : undefined
                            }
                          >
                            {option.id === question.selectedAnswer && (
                              <Icon
                                as={question.isCorrect ? CheckIcon : CloseIcon}
                                color={
                                  question.isCorrect ? "green.500" : "red.500"
                                }
                              />
                            )}
                            {option.id === question.correctAnswer &&
                              option.id !== question.selectedAnswer && (
                                <Icon as={CheckIcon} color="green.500" />
                              )}
                            <Text>{option.text}</Text>
                          </HStack>
                        ))}
                      </Box>

                      {question.explanation && (
                        <Box bg="blue.50" p={3} borderRadius="md">
                          <Text fontWeight="bold" mb={1}>
                            Explanation:
                          </Text>
                          <Text>{question.explanation}</Text>
                        </Box>
                      )}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      )}

      {/* Feedback */}
      <Card variant="outline" mb={6}>
        <CardBody>
          <Text fontWeight="bold" mb={4}>
            Instructor Feedback
          </Text>
          {isQuiz ? (
            <Box p={4} bg="blue.50" borderRadius="md">
              <Text>{quizResultData.feedback}</Text>
            </Box>
          ) : (
            <>
              <Box p={4} bg="blue.50" borderRadius="md" mb={6}>
                <Text>{assignmentResultData.feedback.overall}</Text>
              </Box>

              <Text fontWeight="bold" mb={4}>
                Grading Breakdown
              </Text>
              <VStack spacing={4} align="stretch">
                {assignmentResultData.feedback.breakdown.map(
                  (category, index) => (
                    <Box key={index}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontWeight="medium">{category.category}</Text>
                        <Text>
                          {category.score}/{category.maxScore} points
                        </Text>
                      </HStack>
                      <Progress
                        value={(category.score / category.maxScore) * 100}
                        size="sm"
                        colorScheme={
                          category.score / category.maxScore >= 0.9
                            ? "green"
                            : category.score / category.maxScore >= 0.8
                              ? "blue"
                              : category.score / category.maxScore >= 0.7
                                ? "yellow"
                                : category.score / category.maxScore >= 0.6
                                  ? "orange"
                                  : "red"
                        }
                        mb={2}
                      />
                      <Text fontSize="sm">{category.comments}</Text>
                      {index <
                        assignmentResultData.feedback.breakdown.length - 1 && (
                        <Divider mt={4} />
                      )}
                    </Box>
                  )
                )}
              </VStack>
            </>
          )}
        </CardBody>
      </Card>

      {/* Class Statistics */}
      <Card variant="outline" mb={6}>
        <CardBody>
          <Heading size="md" mb={4}>
            Class Statistics
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Score Distribution
              </Text>
              <VStack align="stretch" spacing={2}>
                {result.statistics.scoringDistribution.map((item) => (
                  <HStack key={item.range} spacing={3}>
                    <Text minW="60px">{item.range}%</Text>
                    <Progress
                      value={item.count}
                      max={result.statistics.numberOfStudents}
                      size="sm"
                      colorScheme="blue"
                      flex="1"
                    />
                    <Text>{item.count} students</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <VStack align="stretch" spacing={4}>
              <Stat>
                <StatLabel>Number of Students</StatLabel>
                <StatNumber>{result.statistics.numberOfStudents}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Class Average</StatLabel>
                <StatNumber>{result.statistics.classAverage}%</StatNumber>
                <StatHelpText>
                  Your score is{" "}
                  {result.percentage - result.statistics.classAverage > 0
                    ? "+"
                    : ""}
                  {result.percentage - result.statistics.classAverage}% from
                  average
                </StatHelpText>
              </Stat>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>

      <Flex justify="center">
        <Button colorScheme="blue" onClick={() => navigate("/lms/assessment")}>
          Back to Assessments
        </Button>
      </Flex>
    </>
  );

  // Render assignment result content
  const renderAssignmentResult = () => {
    // Since we're already rendering all content in renderQuizResult with conditional logic,
    // we can just reuse it for both types of assessments
    return renderQuizResult();
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
        <BreadcrumbItem>
          <BreadcrumbLink href={`/lms/assessment/${result.id}`}>
            {result.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Results</BreadcrumbLink>
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
          as={getAssessmentIcon(result.type)}
          boxSize={6}
          color="brand.primary.600"
          mr={3}
        />
        <Box flex="1">
          <HStack mb={1}>
            <Badge colorScheme="blue">{result.courseCode}</Badge>
            <Text color="brand.primary.600">•</Text>
            <Text color="brand.primary.600">{result.courseName}</Text>
            <Badge
              colorScheme={
                result.type === "assignment"
                  ? "purple"
                  : result.type === "quiz"
                    ? "orange"
                    : "red"
              }
            >
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </Badge>
          </HStack>
          <Heading size="lg" mb={1}>
            {result.title} - Results
          </Heading>
        </Box>
      </Flex>

      {/* Render content based on assessment type */}
      {isQuiz ? renderQuizResult() : renderAssignmentResult()}
    </Box>
  );
};

export default AssessmentResultPage;