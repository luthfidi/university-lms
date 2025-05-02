import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Badge,
  Progress,
  List,
  ListItem,
  ListIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";

// Import course-specific components
import SessionCard from "../components/SessionCard";

// Import utils and mock data
import { courseData, tabItems, formatDate } from "../utils/courseDetailUtils";
import ContentCard from "@/components/organisms/ContentCard";
import TabContainer, { TabItem } from "@/components/organisms/TabContainer";

const CourseDetailPage = () => {
  useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState(0);

  // In a real app, fetch course data based on courseId
  // For now, we'll use the mock data regardless of courseId
  const course = courseData;

  // Colors
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.800");

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Create tab content items
  const getTabContent = (): TabItem[] => {
    return tabItems.map((tab) => ({
      label: tab.label,
      content: renderTabContent(tab.id),
    }));
  };

  // Render content for each tab
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "sessions":
        return (
          <Box>
            <Heading size="md" mb={4}>
              Course Sessions
            </Heading>
            <VStack spacing={4} align="stretch">
              {course.sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </VStack>
          </Box>
        );

      case "syllabus":
        return (
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={3}>
                Course Description
              </Heading>
              <Text>{course.syllabus.description}</Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>
                Course Topics
              </Heading>
              <List spacing={1}>
                {course.syllabus.topics.map((topic, index) => (
                  <ListItem key={index}>
                    <HStack>
                      <ListIcon as={MdCheckCircle} color="brand.primary.500" />
                      <Text>{topic}</Text>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>
                Textbooks
              </Heading>
              <VStack spacing={4} align="stretch">
                {course.syllabus.textbooks.map((book, index) => (
                  <ContentCard key={index}>
                    <HStack justify="space-between" mb={1}>
                      <Heading size="sm">{book.title}</Heading>
                      <Badge colorScheme={book.required ? "red" : "gray"}>
                        {book.required ? "Required" : "Optional"}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      by {book.author}, {book.publisher}, {book.year}
                    </Text>
                  </ContentCard>
                ))}
              </VStack>
            </Box>
          </VStack>
        );

      case "forum":
        return (
          <VStack spacing={4} align="stretch">
            {course.forums.map((forum) => (
              <ContentCard key={forum.id}>
                <Heading size="sm" mb={1}>
                  {forum.title}
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  {forum.description}
                </Text>
                <HStack fontSize="xs" color="gray.500">
                  <Text>{forum.threads} threads</Text>
                  <Text>•</Text>
                  <Text>Last post: {formatDate(forum.lastPost)}</Text>
                </HStack>
              </ContentCard>
            ))}
          </VStack>
        );

      case "assessments":
        return (
          <VStack spacing={4} align="stretch">
            {course.assignments.map((assignment) => (
              <ContentCard key={assignment.id}>
                <Heading size="sm" mb={1}>
                  {assignment.title}
                </Heading>
                <Text fontSize="sm" mb={2}>
                  {assignment.description}
                </Text>
                <HStack fontSize="sm" color="gray.500">
                  <Text>Due: {formatDate(assignment.dueDate)}</Text>
                  {assignment.status === "completed" && (
                    <>
                      <Text>•</Text>
                      <Text>Score: {assignment.score}/100</Text>
                    </>
                  )}
                </HStack>
              </ContentCard>
            ))}
          </VStack>
        );

      case "attendance":
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <ContentCard>
              <VStack align="center">
                <Heading size="md" mb={2}>
                  Your Attendance
                </Heading>
                <Box
                  position="relative"
                  w="120px"
                  h="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    {Math.round(
                      (course.attendance.present / course.attendance.total) *
                        100
                    )}
                    %
                  </Text>
                  <Progress
                    value={
                      (course.attendance.present / course.attendance.total) *
                      100
                    }
                    size="lg"
                    h="10px"
                    colorScheme="green"
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    borderRadius="full"
                  />
                </Box>
                <Text mt={2} color="gray.500">
                  Attended {course.attendance.present} of{" "}
                  {course.attendance.total} sessions
                </Text>
              </VStack>
            </ContentCard>

            <ContentCard>
              <Heading size="sm" mb={3}>
                Attendance Requirements
              </Heading>
              <List spacing={2}>
                <ListItem>
                  <HStack>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    <Text>Minimum attendance: 80% of all sessions</Text>
                  </HStack>
                </ListItem>
                <ListItem>
                  <HStack>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    <Text>Medical absence: Requires doctor's note</Text>
                  </HStack>
                </ListItem>
              </List>
            </ContentCard>
          </SimpleGrid>
        );

      // Add more tab contents as needed

      default:
        return (
          <Box p={5} textAlign="center">
            <Text color="gray.500">
              Content for {tabId} will be displayed here.
            </Text>
          </Box>
        );
    }
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
          <BreadcrumbLink href="/lms/courses">Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{course.code}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Course Header */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mb={6}
        gap={4}
      >
        <Box>
          <HStack mb={2}>
            <Heading size="lg" color={headingColor}>
              {course.code}
            </Heading>
            <Badge colorScheme={course.type === "LEC" ? "blue" : "teal"}>
              {course.type}
            </Badge>
          </HStack>
          <Heading size="md" fontWeight="medium" mb={2} color={headingColor}>
            {course.name}
          </Heading>
          <Text color="gray.500">
            {course.lecturer} • {course.credits} Credits • {course.semester}
          </Text>
        </Box>

        <HStack spacing={4} align="center">
          <Box textAlign="right">
            <Text fontSize="sm" color="gray.500">
              Your Progress
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              {course.progress}%
            </Text>
          </Box>
          <Box w="100px">
            <Progress
              value={course.progress}
              size="lg"
              colorScheme="green"
              borderRadius="full"
              hasStripe
            />
          </Box>
        </HStack>
      </Flex>

      {/* Course Description */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        mb={6}
      >
        <CardBody>
          <Text>{course.description}</Text>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Box id="course-tabs">
        <TabContainer
          index={activeTab}
          onTabChange={handleTabChange}
          tabs={getTabContent()}
        />
      </Box>
    </Box>
  );
};

export default CourseDetailPage;
