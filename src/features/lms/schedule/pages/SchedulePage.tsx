import { useState, useRef } from "react";
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
  IconButton,
  useColorModeValue,
  List,
  ListItem,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  MdLocationOn,
  MdPerson,
  MdAccessTime,
  MdBook,
  MdEvent,
  MdLayers,
  MdViewWeek,
  MdViewModule,
} from "react-icons/md";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";

// Mock data for schedule
const scheduleEvents: EventInput[] = [
  {
    id: "event-1",
    title: "CS101 - Introduction to Computer Science",
    start: "2025-03-10T09:00:00",
    end: "2025-03-10T10:40:00",
    extendedProps: {
      courseCode: "CS101",
      type: "LEC",
      location: "Room 301",
      lecturer: "Dr. Jane Smith",
      description: "Introduction to Computing Concepts",
      sessionNumber: 6,
      deliveryMode: "F2F",
    },
    backgroundColor: "#4299E1",
    borderColor: "#2B6CB0",
  },
  {
    id: "event-2",
    title: "MATH201 - Calculus I",
    start: "2025-03-10T13:00:00",
    end: "2025-03-10T14:40:00",
    extendedProps: {
      courseCode: "MATH201",
      type: "LEC",
      location: "Room 401",
      lecturer: "Prof. Robert Johnson",
      description: "Limits and Derivatives",
      sessionNumber: 6,
      deliveryMode: "F2F",
    },
    backgroundColor: "#48BB78",
    borderColor: "#2F855A",
  },
  {
    id: "event-3",
    title: "CS101L - Introduction to Computer Science Lab",
    start: "2025-03-11T15:00:00",
    end: "2025-03-11T16:40:00",
    extendedProps: {
      courseCode: "CS101L",
      type: "LAB",
      location: "Lab 201",
      lecturer: "Michael Chen",
      description: "Python Programming Lab",
      sessionNumber: 6,
      deliveryMode: "F2F",
    },
    backgroundColor: "#9F7AEA",
    borderColor: "#6B46C1",
  },
  {
    id: "event-4",
    title: "ENG102 - English Composition",
    start: "2025-03-12T09:00:00",
    end: "2025-03-12T10:40:00",
    extendedProps: {
      courseCode: "ENG102",
      type: "LEC",
      location: "Zoom Meeting",
      lecturer: "Dr. Emily Williams",
      description: "Essay Writing Techniques",
      sessionNumber: 6,
      deliveryMode: "VC",
    },
    backgroundColor: "#ED8936",
    borderColor: "#C05621",
  },
  {
    id: "event-5",
    title: "PHYS101 - Physics I",
    start: "2025-03-13T13:00:00",
    end: "2025-03-13T14:40:00",
    extendedProps: {
      courseCode: "PHYS101",
      type: "LEC",
      location: "Room 301",
      lecturer: "Dr. Alan Parker",
      description: "Newton's Laws of Motion",
      sessionNumber: 6,
      deliveryMode: "F2F",
    },
    backgroundColor: "#F56565",
    borderColor: "#C53030",
  },
  {
    id: "event-6",
    title: "CS101 Quiz",
    start: "2025-03-14T09:00:00",
    end: "2025-03-14T10:00:00",
    extendedProps: {
      courseCode: "CS101",
      type: "QUIZ",
      location: "Room 301",
      lecturer: "Dr. Jane Smith",
      description: "Quiz on Control Structures",
      deliveryMode: "F2F",
    },
    backgroundColor: "#DD6B20",
    borderColor: "#C05621",
  },
  {
    id: "event-7",
    title: "MATH201 Assignment Due",
    start: "2025-03-16T23:59:00",
    end: "2025-03-16T23:59:00",
    extendedProps: {
      courseCode: "MATH201",
      type: "ASSIGNMENT",
      description: "Problem Set 4",
      deliveryMode: "ONLINE",
    },
    display: "block",
    backgroundColor: "#48BB78",
    borderColor: "#2F855A",
  },
  // Add more events for the week
  // Monday next week
  {
    id: "event-8",
    title: "CS101 - Introduction to Computer Science",
    start: "2025-03-17T09:00:00",
    end: "2025-03-17T10:40:00",
    extendedProps: {
      courseCode: "CS101",
      type: "LEC",
      location: "Room 301",
      lecturer: "Dr. Jane Smith",
      description: "Data Structures Basics",
      sessionNumber: 7,
      deliveryMode: "F2F",
    },
    backgroundColor: "#4299E1",
    borderColor: "#2B6CB0",
  },
];

// Mock upcoming deadlines
const upcomingDeadlines = [
  {
    id: "deadline-1",
    title: "Programming Assignment #3",
    courseCode: "CS101",
    dueDate: "2025-03-10T23:59:00",
    type: "assignment",
  },
  {
    id: "deadline-2",
    title: "Quiz: Control Structures",
    courseCode: "CS101",
    dueDate: "2025-03-14T09:00:00",
    type: "quiz",
  },
  {
    id: "deadline-3",
    title: "Problem Set 4",
    courseCode: "MATH201",
    dueDate: "2025-03-16T23:59:00",
    type: "assignment",
  },
];

const SchedulePage = () => {
  const [viewMode, setViewMode] = useState<"timeGridWeek" | "dayGridMonth">(
    "timeGridWeek"
  );
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const calendarRef = useRef<FullCalendar | null>(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time only
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle event click
  const handleEventClick = (info: EventClickArg) => {
    const plainEvent: EventInput = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      backgroundColor: info.event.backgroundColor,
      borderColor: info.event.borderColor,
      extendedProps: info.event.extendedProps,
      display: info.event.display,
    };
    setSelectedEvent(plainEvent);
    onOpen();
  };

  // Navigate to previous week/month
  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  };

  // Navigate to next week/month
  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  };

  // Navigate to today
  const handleToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  };

  // Get days until a deadline
  const getDaysUntil = (dateString: string) => {
    const now = new Date();
    const due = new Date(dateString);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Overdue";
    return `${diffDays} days`;
  };

  // Get deadline badge color
  const getDeadlineBadgeColor = (dateString: string) => {
    const daysUntil = getDaysUntil(dateString);
    if (daysUntil === "Overdue") return "red";
    if (daysUntil === "Today") return "orange";
    if (daysUntil === "Tomorrow") return "yellow";
    return "green";
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Schedule
        </Heading>
        <Text color="gray.500">
          View your class schedule and upcoming deadlines
        </Text>
      </Box>

      {/* Main Content */}
      <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={6}>
        {/* Calendar - Takes up 3/4 of the width on large screens */}
        <Box gridColumn={{ lg: "span 3" }}>
          <Card
            bg={cardBg}
            boxShadow="sm"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            mb={6}
          >
            <CardBody>
              {/* Calendar Header */}
              <Flex
                justify="space-between"
                align="center"
                mb={4}
                wrap="wrap"
                gap={2}
              >
                <HStack>
                  <IconButton
                    aria-label="Previous"
                    icon={<ChevronLeftIcon />}
                    onClick={handlePrev}
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Next"
                    icon={<ChevronRightIcon />}
                    onClick={handleNext}
                    variant="ghost"
                  />
                  <Button
                    leftIcon={<CalendarIcon />}
                    onClick={handleToday}
                    size="sm"
                    variant="outline"
                  >
                    Today
                  </Button>
                </HStack>

                <HStack>
                  <IconButton
                    aria-label="Week View"
                    icon={<MdViewWeek />}
                    onClick={() => setViewMode("timeGridWeek")}
                    colorScheme={viewMode === "timeGridWeek" ? "blue" : "gray"}
                    variant="outline"
                  />
                  <IconButton
                    aria-label="Month View"
                    icon={<MdViewModule />}
                    onClick={() => setViewMode("dayGridMonth")}
                    colorScheme={viewMode === "dayGridMonth" ? "blue" : "gray"}
                    variant="outline"
                  />
                </HStack>
              </Flex>

              {/* Calendar */}
              <Box
                sx={{
                  ".fc": {
                    fontFamily: "inherit",
                    fontSize: "sm",
                  },
                  ".fc-toolbar-title": {
                    fontSize: "lg",
                    fontWeight: "bold",
                  },
                  ".fc-event": {
                    cursor: "pointer",
                    fontSize: "xs",
                  },
                  ".fc-day-today": {
                    backgroundColor: useColorModeValue("blue.50", "blue.900"),
                  },
                  ".fc-timegrid-event-harness": {
                    zIndex: 1, // Ensure events don't appear behind grid lines
                  },
                }}
              >
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView={viewMode}
                  headerToolbar={false}
                  events={scheduleEvents}
                  eventClick={handleEventClick}
                  height="auto"
                  aspectRatio={1.8}
                  firstDay={1} // Start week on Monday
                  allDaySlot={true}
                  allDayText="All Day"
                  slotDuration="00:30:00"
                  slotLabelInterval="01:00"
                  slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }}
                  eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }}
                  nowIndicator={true}
                  dayHeaderFormat={{
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  }}
                />
              </Box>
            </CardBody>
          </Card>

          {/* Color Legend */}
          <Card variant="outline" mb={{ base: 6, lg: 0 }}>
            <CardBody>
              <Heading size="sm" mb={3}>
                Class Legend
              </Heading>
              <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
                <HStack>
                  <Box w="12px" h="12px" borderRadius="full" bg="#4299E1" />
                  <Text fontSize="sm">CS101</Text>
                </HStack>
                <HStack>
                  <Box w="12px" h="12px" borderRadius="full" bg="#9F7AEA" />
                  <Text fontSize="sm">CS101L</Text>
                </HStack>
                <HStack>
                  <Box w="12px" h="12px" borderRadius="full" bg="#48BB78" />
                  <Text fontSize="sm">MATH201</Text>
                </HStack>
                <HStack>
                  <Box w="12px" h="12px" borderRadius="full" bg="#ED8936" />
                  <Text fontSize="sm">ENG102</Text>
                </HStack>
                <HStack>
                  <Box w="12px" h="12px" borderRadius="full" bg="#F56565" />
                  <Text fontSize="sm">PHYS101</Text>
                </HStack>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Box>

        {/* Sidebar - Takes up 1/4 of the width on large screens */}
        <Box>
          {/* Upcoming Deadlines */}
          <Card
            bg={cardBg}
            boxShadow="sm"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            mb={6}
          >
            <CardBody>
              <Heading size="md" mb={4}>
                Upcoming Deadlines
              </Heading>
              <List spacing={3}>
                {upcomingDeadlines.map((deadline) => (
                  <ListItem
                    key={deadline.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                    _hover={{ bg: "gray.50" }}
                  >
                    <VStack align="stretch" spacing={1}>
                      <HStack justify="space-between">
                        <Badge colorScheme="blue">{deadline.courseCode}</Badge>
                        <Badge
                          colorScheme={getDeadlineBadgeColor(deadline.dueDate)}
                        >
                          {getDaysUntil(deadline.dueDate)}
                        </Badge>
                      </HStack>
                      <Text fontWeight="bold">{deadline.title}</Text>
                      <HStack fontSize="sm" color="gray.500">
                        <Text>Due: {formatDate(deadline.dueDate)}</Text>
                      </HStack>
                    </VStack>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>

          {/* Today's Classes */}
          <Card
            bg={cardBg}
            boxShadow="sm"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <CardBody>
              <Heading size="md" mb={4}>
                Today's Classes
              </Heading>
              {scheduleEvents
                .filter((event) => {
                  const today = new Date();
                  const eventDate = new Date(event.start as string);
                  return (
                    eventDate.getDate() === today.getDate() &&
                    eventDate.getMonth() === today.getMonth() &&
                    eventDate.getFullYear() === today.getFullYear() &&
                    event.extendedProps?.type !== "ASSIGNMENT"
                  );
                })
                .sort(
                  (a, b) =>
                    new Date(a.start as string).getTime() -
                    new Date(b.start as string).getTime()
                )
                .map((event) => (
                  <Box
                    key={event.id}
                    mb={4}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                    borderLeftWidth="4px"
                    borderLeftColor={event.borderColor as string}
                  >
                    <HStack mb={1} justify="space-between">
                      <Badge
                        colorScheme={
                          event.extendedProps?.type === "LEC"
                            ? "blue"
                            : event.extendedProps?.type === "LAB"
                              ? "purple"
                              : "orange"
                        }
                      >
                        {event.extendedProps?.type}
                      </Badge>
                      <Badge
                        colorScheme={
                          event.extendedProps?.deliveryMode === "F2F"
                            ? "green"
                            : "blue"
                        }
                      >
                        {event.extendedProps?.deliveryMode}
                      </Badge>
                    </HStack>
                    <Text fontWeight="bold" mb={1}>
                      {event.extendedProps?.courseCode}
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      {event.title?.split(" - ")[1]}
                    </Text>
                    <HStack fontSize="xs" color="gray.500" mb={1}>
                      <MdAccessTime />
                      <Text>
                        {formatTime(event.start as string)} -{" "}
                        {formatTime(event.end as string)}
                      </Text>
                    </HStack>
                    <HStack fontSize="xs" color="gray.500">
                      <MdLocationOn />
                      <Text>{event.extendedProps?.location}</Text>
                    </HStack>
                  </Box>
                ))}

              {scheduleEvents.filter((event) => {
                const today = new Date();
                const eventDate = new Date(event.start as string);
                return (
                  eventDate.getDate() === today.getDate() &&
                  eventDate.getMonth() === today.getMonth() &&
                  eventDate.getFullYear() === today.getFullYear() &&
                  event.extendedProps?.type !== "ASSIGNMENT"
                );
              }).length === 0 && (
                <Text textAlign="center" color="gray.500" py={4}>
                  No classes scheduled for today.
                </Text>
              )}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      {/* Event Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Badge
                colorScheme={
                  selectedEvent?.extendedProps?.type === "LEC"
                    ? "blue"
                    : selectedEvent?.extendedProps?.type === "LAB"
                      ? "purple"
                      : selectedEvent?.extendedProps?.type === "QUIZ"
                        ? "orange"
                        : selectedEvent?.extendedProps?.type === "ASSIGNMENT"
                          ? "green"
                          : "gray"
                }
              >
                {selectedEvent?.extendedProps?.type}
              </Badge>
              <Text>{selectedEvent?.extendedProps?.courseCode}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">
                {selectedEvent?.title?.split(" - ")[1] || selectedEvent?.title}
              </Heading>

              {selectedEvent?.extendedProps?.description && (
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Description:
                  </Text>
                  <Text>{selectedEvent.extendedProps.description}</Text>
                </Box>
              )}

              <Divider />

              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Date & Time:
                  </Text>
                  <Text>{formatDate(selectedEvent?.start as string)}</Text>
                  {selectedEvent?.end &&
                    selectedEvent.start !== selectedEvent.end && (
                      <Text>to {formatDate(selectedEvent.end as string)}</Text>
                    )}
                </Box>

                {selectedEvent?.extendedProps?.location && (
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Location:
                    </Text>
                    <HStack>
                      <MdLocationOn />
                      <Text>{selectedEvent.extendedProps.location}</Text>
                    </HStack>
                    <Badge
                      colorScheme={
                        selectedEvent.extendedProps.deliveryMode === "F2F"
                          ? "green"
                          : "blue"
                      }
                      mt={1}
                    >
                      {selectedEvent.extendedProps.deliveryMode === "F2F"
                        ? "Face to Face"
                        : "Virtual Class"}
                    </Badge>
                  </Box>
                )}
              </SimpleGrid>

              {selectedEvent?.extendedProps?.lecturer && (
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Lecturer:
                  </Text>
                  <HStack>
                    <MdPerson />
                    <Text>{selectedEvent.extendedProps.lecturer}</Text>
                  </HStack>
                </Box>
              )}

              {selectedEvent?.extendedProps?.sessionNumber && (
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Session:
                  </Text>
                  <HStack>
                    <MdLayers />
                    <Text>
                      Session {selectedEvent.extendedProps.sessionNumber}
                    </Text>
                  </HStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {selectedEvent?.extendedProps?.type !== "ASSIGNMENT" && (
              <Button variant="outline" leftIcon={<MdBook />}>
                View Materials
              </Button>
            )}
            {selectedEvent?.extendedProps?.type === "ASSIGNMENT" && (
              <Button variant="outline" leftIcon={<MdEvent />}>
                Go to Assignment
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SchedulePage;
