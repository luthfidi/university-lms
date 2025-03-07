import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Progress,
  Divider,
  IconButton,
  Link,
  useColorModeValue,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { MdCheckCircle, MdAccessTime, MdPictureAsPdf, MdSlideshow, MdVideoLibrary, MdForum, MdPeople } from 'react-icons/md';

// Mock data for a specific course
const courseData = {
  id: 'cs101',
  code: 'CS101',
  name: 'Introduction to Computer Science',
  description: 'A foundational course covering basic computer science concepts including algorithms, data structures, and problem-solving techniques.',
  lecturer: 'Dr. Jane Smith',
  type: 'LEC',
  credits: 3,
  semester: 'Odd 2024/2025',
  progress: 65,
  sessions: [
    {
      id: 'ses-1',
      number: 1,
      title: 'Introduction to Computing Concepts',
      subTopic: 'History of computing, basic terminology',
      startDate: '2025-02-03T09:00:00',
      endDate: '2025-02-03T10:40:00',
      deliveryMode: 'F2F',
      learningOutcome: 'Understand basic computing concepts and terminology',
      status: 'completed',
      materials: [
        { id: 'mat-1-1', title: 'Introduction to CS Slides', type: 'slides', path: '/materials/cs101-intro-slides.pdf' },
        { id: 'mat-1-2', title: 'Computing History Reading', type: 'pdf', path: '/materials/computing-history.pdf' },
      ],
    },
    {
      id: 'ses-2',
      number: 2,
      title: 'Problem Solving Strategies',
      subTopic: 'Algorithmic thinking, pseudocode',
      startDate: '2025-02-10T09:00:00',
      endDate: '2025-02-10T10:40:00',
      deliveryMode: 'F2F',
      learningOutcome: 'Develop problem-solving strategies and express solutions in pseudocode',
      status: 'completed',
      materials: [
        { id: 'mat-2-1', title: 'Problem Solving Slides', type: 'slides', path: '/materials/problem-solving.pdf' },
        { id: 'mat-2-2', title: 'Problem Set 1', type: 'pdf', path: '/materials/problem-set-1.pdf' },
      ],
    },
    {
      id: 'ses-3',
      number: 3,
      title: 'Introduction to Python',
      subTopic: 'Basic syntax, variables, data types',
      startDate: '2025-02-17T09:00:00',
      endDate: '2025-02-17T10:40:00',
      deliveryMode: 'VC',
      learningOutcome: 'Write simple Python programs using basic syntax and data types',
      status: 'completed',
      materials: [
        { id: 'mat-3-1', title: 'Python Basics Slides', type: 'slides', path: '/materials/python-basics.pdf' },
        { id: 'mat-3-2', title: 'Python Installation Guide', type: 'pdf', path: '/materials/python-setup.pdf' },
        { id: 'mat-3-3', title: 'Lecture Recording', type: 'video', path: '/materials/python-lecture.mp4' },
      ],
    },
    {
      id: 'ses-4',
      number: 4,
      title: 'Control Structures',
      subTopic: 'Conditional statements, loops',
      startDate: '2025-02-24T09:00:00',
      endDate: '2025-02-24T10:40:00',
      deliveryMode: 'F2F',
      learningOutcome: 'Implement conditional logic and iteration in programs',
      status: 'in-progress',
      materials: [
        { id: 'mat-4-1', title: 'Control Structures Slides', type: 'slides', path: '/materials/control-structures.pdf' },
        { id: 'mat-4-2', title: 'Problem Set 2', type: 'pdf', path: '/materials/problem-set-2.pdf' },
      ],
    },
    {
      id: 'ses-5',
      number: 5,
      title: 'Functions and Modules',
      subTopic: 'Function definition, parameters, return values',
      startDate: '2025-03-03T09:00:00',
      endDate: '2025-03-03T10:40:00',
      deliveryMode: 'F2F',
      learningOutcome: 'Create modular programs using functions and modules',
      status: 'upcoming',
      materials: [
        { id: 'mat-5-1', title: 'Functions and Modules Slides', type: 'slides', path: '/materials/functions-modules.pdf' },
      ],
    },
    {
      id: 'ses-6',
      number: 6,
      title: 'Data Structures: Lists and Tuples',
      subTopic: 'Sequence types, operations, methods',
      startDate: '2025-03-10T09:00:00',
      endDate: '2025-03-10T10:40:00',
      deliveryMode: 'VC',
      learningOutcome: 'Work with lists and tuples to manage collections of data',
      status: 'upcoming',
      materials: [],
    },
  ],
  assignments: [
    {
      id: 'asg-1',
      title: 'Problem Set 1: Algorithms and Pseudocode',
      description: 'Practice creating algorithms and writing pseudocode for basic problems.',
      dueDate: '2025-02-17T23:59:00',
      status: 'completed',
      score: 85,
    },
    {
      id: 'asg-2',
      title: 'Programming Assignment 1: Python Basics',
      description: 'Implement simple programs using Python variables, expressions, and basic I/O.',
      dueDate: '2025-02-24T23:59:00',
      status: 'completed',
      score: 90,
    },
    {
      id: 'asg-3',
      title: 'Programming Assignment 2: Control Structures',
      description: 'Build programs that utilize conditional logic and loops.',
      dueDate: '2025-03-10T23:59:00',
      status: 'in-progress',
    },
  ],
  syllabus: {
    description: 'This course introduces fundamental concepts of computer science including problem-solving, algorithms, programming basics, and data structures. Students will gain practical programming experience using Python.',
    topics: [
      'Introduction to Computing and Algorithmic Thinking',
      'Problem Solving Strategies',
      'Programming Fundamentals',
      'Control Structures',
      'Functions and Modular Programming',
      'Data Structures',
      'File I/O',
      'Object-Oriented Programming Basics',
      'Algorithm Analysis',
      'Recursion',
    ],
    textbooks: [
      {
        title: 'Introduction to Computer Science using Python',
        author: 'John Smith',
        publisher: 'Academic Press',
        year: '2022',
        required: true,
      },
      {
        title: 'Algorithms and Problem Solving',
        author: 'Emily Johnson',
        publisher: 'University Press',
        year: '2020',
        required: false,
      },
    ],
  },
  forums: [
    {
      id: 'forum-1',
      title: 'General Discussion',
      description: 'General questions and discussions about the course',
      threads: 12,
      lastPost: '2025-03-05T14:30:00',
    },
    {
      id: 'forum-2',
      title: 'Assignment #1 Discussion',
      description: 'Questions and clarifications for Assignment #1',
      threads: 8,
      lastPost: '2025-02-16T09:15:00',
    },
    {
      id: 'forum-3',
      title: 'Assignment #2 Discussion',
      description: 'Questions and clarifications for Assignment #2',
      threads: 15,
      lastPost: '2025-02-23T16:45:00',
    },
  ],
  participants: {
    lecturers: 1,
    assistants: 2,
    students: 32,
  },
  attendance: {
    present: 4,
    absent: 0,
    total: 13,
  },
};

// Helper function to get material icon
const getMaterialIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return MdPictureAsPdf;
    case 'slides':
      return MdSlideshow;
    case 'video':
      return MdVideoLibrary;
    default:
      return MdPictureAsPdf;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const formatTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString('en-US', options);
};

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // In a real app, fetch course data based on courseId
  // For now, we'll use the mock data regardless of courseId
  
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
          <BreadcrumbLink>{courseData.code}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      {/* Course Header */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        mb={6}
        gap={4}
      >
        <Box>
          <HStack mb={2}>
            <Heading size="lg">{courseData.code}</Heading>
            <Badge colorScheme={courseData.type === 'LEC' ? 'blue' : 'teal'}>
              {courseData.type}
            </Badge>
          </HStack>
          <Heading size="md" fontWeight="medium" mb={2}>{courseData.name}</Heading>
          <Text color="gray.500">{courseData.lecturer} • {courseData.credits} Credits • {courseData.semester}</Text>
        </Box>
        
        <HStack spacing={4} align="center">
          <Box textAlign="right">
            <Text fontSize="sm" color="gray.500">Your Progress</Text>
            <Text fontWeight="bold" fontSize="xl">{courseData.progress}%</Text>
          </Box>
          <Box w="100px">
            <Progress 
              value={courseData.progress} 
              size="lg" 
              colorScheme="green" 
              borderRadius="full"
              hasStripe
            />
          </Box>
        </HStack>
      </Flex>
      
      {/* Course Description */}
      <Card bg={cardBg} boxShadow="sm" borderRadius="lg" mb={6} borderWidth="1px" borderColor={borderColor}>
        <CardBody>
          <Text>{courseData.description}</Text>
        </CardBody>
      </Card>
      
      {/* Tabs */}
      <Tabs 
        variant="enclosed" 
        colorScheme="blue" 
        onChange={(index) => setActiveTab(index)}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        bg={cardBg}
        boxShadow="sm"
      >
        <TabList px={4} pt={4}>
          <Tab>Sessions</Tab>
          <Tab>Syllabus</Tab>
          <Tab>Forum</Tab>
          <Tab>Assessments</Tab>
          <Tab>Gradebook</Tab>
          <Tab>People</Tab>
          <Tab>Attendance</Tab>
        </TabList>
        
        <TabPanels>
          {/* Sessions Tab */}
          <TabPanel px={5} py={4}>
            <Box>
              <Heading size="md" mb={4}>Course Sessions</Heading>
              <VStack spacing={4} align="stretch">
                {courseData.sessions.map((session) => (
                  <Card
                    key={session.id}
                    variant="outline"
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                    overflow="hidden"
                  >
                    <Box 
                      bg={
                        session.status === 'completed' ? 'green.500' :
                        session.status === 'in-progress' ? 'orange.500' :
                        'gray.300'
                      }
                      h="6px"
                    />
                    <CardBody p={4}>
                      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 6 }}>
                        <Box minW="60px" textAlign={{ base: 'left', md: 'center' }}>
                          <Text
                            fontWeight="bold"
                            fontSize="2xl"
                            color={
                              session.status === 'completed' ? 'green.500' :
                              session.status === 'in-progress' ? 'orange.500' :
                              'gray.500'
                            }
                          >
                            {session.number}
                          </Text>
                          <Badge
                            colorScheme={
                              session.status === 'completed' ? 'green' :
                              session.status === 'in-progress' ? 'orange' :
                              'gray'
                            }
                          >
                            {session.status}
                          </Badge>
                        </Box>
                        
                        <Box flex="1">
                          <Heading size="sm" mb={1}>{session.title}</Heading>
                          <Text fontSize="sm" color="gray.500" mb={2}>{session.subTopic}</Text>
                          
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mb={3}>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">Date:</Text>
                              <Text fontSize="sm">{formatDate(session.startDate)}</Text>
                            </HStack>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">Time:</Text>
                              <Text fontSize="sm">
                                {formatTime(session.startDate)} - {formatTime(session.endDate)}
                              </Text>
                            </HStack>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">Delivery:</Text>
                              <Badge size="sm" colorScheme={session.deliveryMode === 'F2F' ? 'green' : 'blue'}>
                                {session.deliveryMode}
                              </Badge>
                            </HStack>
                            <HStack>
                              <Text fontWeight="bold" fontSize="sm">Location:</Text>
                              <Text fontSize="sm">
                                {session.deliveryMode === 'F2F' ? 'Room 301' : 'Zoom Meeting'}
                              </Text>
                            </HStack>
                          </SimpleGrid>
                          
                          <Box mb={4}>
                            <Text fontWeight="bold" fontSize="sm" mb={1}>Learning Outcome:</Text>
                            <Text fontSize="sm">{session.learningOutcome}</Text>
                          </Box>
                          
                          {session.materials.length > 0 && (
                            <Box>
                              <Text fontWeight="bold" fontSize="sm" mb={2}>Materials:</Text>
                              <List spacing={2}>
                                {session.materials.map((material) => (
                                  <ListItem key={material.id}>
                                    <Flex align="center">
                                      <ListIcon as={getMaterialIcon(material.type)} color="brand.primary.500" />
                                      <Link href={material.path} color="brand.primary.600" mr={2}>
                                        {material.title}
                                      </Link>
                                      <IconButton
                                        aria-label="Download"
                                        icon={<DownloadIcon />}
                                        size="xs"
                                        variant="ghost"
                                      />
                                    </Flex>
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )}
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </Box>
          </TabPanel>
          
          {/* Syllabus Tab */}
          <TabPanel px={5} py={4}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Course Description</Heading>
                <Text>{courseData.syllabus.description}</Text>
              </Box>
              
              <Box>
                <Heading size="md" mb={3}>Course Topics</Heading>
                <List spacing={1}>
                  {courseData.syllabus.topics.map((topic, index) => (
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
                <Heading size="md" mb={3}>Textbooks</Heading>
                <VStack spacing={4} align="stretch">
                  {courseData.syllabus.textbooks.map((book, index) => (
                    <Card key={index} variant="outline">
                      <CardBody>
                        <HStack justify="space-between" mb={1}>
                          <Heading size="sm">{book.title}</Heading>
                          <Badge colorScheme={book.required ? 'red' : 'gray'}>
                            {book.required ? 'Required' : 'Optional'}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.500" mb={2}>
                          by {book.author}, {book.publisher}, {book.year}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </TabPanel>
          
          {/* Forum Tab */}
          <TabPanel px={5} py={4}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">Discussion Forums</Heading>
              <Button colorScheme="blue" size="sm">New Topic</Button>
            </Flex>
            
            <VStack spacing={4} align="stretch">
              {courseData.forums.map((forum) => (
                <Card key={forum.id} variant="outline">
                  <CardBody p={4}>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Heading size="sm" mb={1}>
                          <Link color="brand.primary.600">
                            {forum.title} <ExternalLinkIcon mx="2px" />
                          </Link>
                        </Heading>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                          {forum.description}
                        </Text>
                        <HStack fontSize="xs" color="gray.500">
                          <Text>{forum.threads} threads</Text>
                          <Text>•</Text>
                          <Text>Last post: {new Date(forum.lastPost).toLocaleString()}</Text>
                        </HStack>
                      </Box>
                      <IconButton
                        aria-label="Go to forum"
                        icon={<MdForum />}
                        colorScheme="blue"
                        variant="ghost"
                      />
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </TabPanel>
          
          {/* Assessments Tab */}
          <TabPanel px={5} py={4}>
            <Heading size="md" mb={4}>Assignments</Heading>
            
            <VStack spacing={4} align="stretch">
              {courseData.assignments.map((assignment) => (
                <Card key={assignment.id} variant="outline">
                  <CardBody p={4}>
                    <Flex justify="space-between" align="start" gap={4}>
                      <Box>
                        <Heading size="sm" mb={1}>{assignment.title}</Heading>
                        <Text fontSize="sm" mb={2}>{assignment.description}</Text>
                        <HStack fontSize="sm" color="gray.500">
                          <MdAccessTime />
                          <Text>Due: {new Date(assignment.dueDate).toLocaleString()}</Text>
                          
                          {assignment.status === 'completed' && (
                            <>
                              <Text>•</Text>
                              <Text>Score: {assignment.score}/100</Text>
                            </>
                          )}
                        </HStack>
                      </Box>
                      
                      <Badge
                        colorScheme={
                          assignment.status === 'completed' ? 'green' :
                          assignment.status === 'in-progress' ? 'orange' :
                          'red'
                        }
                        fontSize="sm"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {assignment.status}
                      </Badge>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </TabPanel>
          
          {/* Gradebook Tab */}
          <TabPanel px={5} py={4}>
            <Heading size="md" mb={4}>Your Grades</Heading>
            
            <Card variant="outline" mb={6}>
              <CardBody>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Heading size="lg" color="green.500">A-</Heading>
                    <Text color="gray.500">Current Grade</Text>
                  </Box>
                  <Divider orientation="vertical" h="50px" mx={4} />
                  <Box>
                    <Heading size="lg">87.5%</Heading>
                    <Text color="gray.500">Overall Score</Text>
                  </Box>
                  <Divider orientation="vertical" h="50px" mx={4} />
                  <Box>
                    <Text fontWeight="bold" mb={1}>Last Update:</Text>
                    <Text color="gray.500">March 5, 2025</Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
            
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <Box>
                <Heading size="sm" mb={3}>Assignment Scores</Heading>
                <VStack spacing={3} align="stretch">
                  {courseData.assignments.map((assignment) => (
                    <Flex 
                      key={assignment.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                    >
                      <Text fontWeight="medium">{assignment.title}</Text>
                      <Text>
                        {assignment.status === 'completed' 
                          ? `${assignment.score}/100` 
                          : '-'
                        }
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
              
              <Box>
                <Heading size="sm" mb={3}>Grade Breakdown</Heading>
                <VStack spacing={3} align="stretch">
                  <Flex 
                    justify="space-between"
                    align="center"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                  >
                    <Text fontWeight="medium">Assignments (40%)</Text>
                    <Text>35/40</Text>
                  </Flex>
                  <Flex 
                    justify="space-between"
                    align="center"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                  >
                    <Text fontWeight="medium">Midterm Exam (30%)</Text>
                    <Text>25.5/30</Text>
                  </Flex>
                  <Flex 
                    justify="space-between"
                    align="center"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                  >
                    <Text fontWeight="medium">Final Exam (30%)</Text>
                    <Text>- / 30</Text>
                  </Flex>
                  <Flex 
                    justify="space-between"
                    align="center"
                    p={3}
                    bg="gray.50"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                  >
                    <Text fontWeight="bold">Total</Text>
                    <Text fontWeight="bold">87.5 / 100</Text>
                  </Flex>
                </VStack>
              </Box>
            </SimpleGrid>
          </TabPanel>
          
          {/* People Tab */}
          <TabPanel px={5} py={4}>
            <Heading size="md" mb={4}>People</Heading>
            
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
              <Card variant="outline">
                <CardBody>
                  <VStack>
                    <Heading size="sm">Lecturers</Heading>
                    <Avatar size="xl" name="Dr. Jane Smith" src="" mb={2} />
                    <Text fontWeight="bold">Dr. Jane Smith</Text>
                    <Text color="gray.500">Primary Lecturer</Text>
                    <Button size="sm" leftIcon={<MdForum />} mt={2} colorScheme="blue" variant="outline">
                      Message
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
              
              <Card variant="outline">
                <CardBody>
                  <VStack align="center">
                    <Heading size="sm">Teaching Assistants</Heading>
                    <Box textAlign="center">
                      <Avatar size="lg" name="Michael Chen" src="" mb={2} />
                      <Text fontWeight="bold">Michael Chen</Text>
                      <Text color="gray.500" fontSize="sm">Lab Assistant</Text>
                    </Box>
                    <Box textAlign="center" mt={2}>
                      <Avatar size="lg" name="Sarah Johnson" src="" mb={2} />
                      <Text fontWeight="bold">Sarah Johnson</Text>
                      <Text color="gray.500" fontSize="sm">Lab Assistant</Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
              
              <Card variant="outline">
                <CardBody>
                  <VStack>
                    <Heading size="sm">Students</Heading>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      justifyContent="center"
                      gap={2}
                      my={2}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Avatar key={i} size="md" name={`Student ${i+1}`} />
                      ))}
                    </Box>
                    <Text color="gray.500">+{courseData.participants.students - 8} more students</Text>
                    <Button 
                      size="sm" 
                      leftIcon={<MdPeople />} 
                      mt={2}
                      colorScheme="blue" 
                      variant="outline"
                      width="full"
                    >
                      View All Students
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
          
          {/* Attendance Tab */}
          <TabPanel px={5} py={4}>
            <Heading size="md" mb={4}>Attendance</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
              <Card variant="outline">
                <CardBody>
                  <VStack align="center">
                    <Heading size="md" mb={2}>Your Attendance</Heading>
                    <Box 
                      position="relative" 
                      w="120px" 
                      h="120px" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                    >
                      <Text fontSize="2xl" fontWeight="bold">
                        {Math.round((courseData.attendance.present / courseData.attendance.total) * 100)}%
                      </Text>
                      <Progress 
                        value={(courseData.attendance.present / courseData.attendance.total) * 100}
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
                      Attended {courseData.attendance.present} of {courseData.attendance.total} sessions
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
              
              <Card variant="outline">
                <CardBody>
                  <Heading size="sm" mb={3}>Attendance Requirements</Heading>
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
                    <ListItem>
                      <HStack>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        <Text>Being late (15 mins): Counts as 0.5 absence</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            <Heading size="sm" mb={3}>Attendance Record</Heading>
            <Card variant="outline">
              <CardBody overflowX="auto">
                <Box minW="600px">
                  <HStack spacing={0} mb={2} borderBottom="1px" borderColor={borderColor} pb={2}>
                    <Box width="60px" fontWeight="bold" textAlign="center">Session</Box>
                    <Box flex="1" fontWeight="bold">Date & Time</Box>
                    <Box width="100px" fontWeight="bold">Delivery</Box>
                    <Box width="100px" fontWeight="bold">Status</Box>
                  </HStack>
                  
                  {courseData.sessions.map((session) => (
                    <HStack key={session.id} spacing={0} py={2} borderBottom="1px" borderColor="gray.100">
                      <Box width="60px" textAlign="center">{session.number}</Box>
                      <Box flex="1">
                        {formatDate(session.startDate)}
                        <Text fontSize="sm" color="gray.500">
                          {formatTime(session.startDate)} - {formatTime(session.endDate)}
                        </Text>
                      </Box>
                      <Box width="100px">
                        <Badge colorScheme={session.deliveryMode === 'F2F' ? 'green' : 'blue'}>
                          {session.deliveryMode}
                        </Badge>
                      </Box>
                      <Box width="100px">
                        {session.status === 'completed' ? (
                          <Badge colorScheme="green">Present</Badge>
                        ) : session.status === 'in-progress' ? (
                          <Badge colorScheme="orange">Ongoing</Badge>
                        ) : (
                          <Badge colorScheme="gray">Upcoming</Badge>
                        )}
                      </Box>
                    </HStack>
                  ))}
                </Box>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CourseDetailPage;