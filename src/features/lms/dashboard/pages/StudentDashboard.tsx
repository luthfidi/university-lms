import {
  Box,
  Grid,
  GridItem,
  Button,
  HStack,
  List,
  ListItem,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MdAssignment, MdQuiz, MdSchool } from "react-icons/md";

// Import reusable components
import PageHeader from "@/components/molecules/PageHeader";
import ContentCard from "@/components/organisms/ContentCard";
import StatusBadge from "@/components/atoms/StatusBadge";
import EmptyState from "@/components/molecules/EmptyState";

// Import dashboard-specific components
import {
  ClassCard,
  ProgressCard,
  AnnouncementCard,
  TodoItem,
} from "../components/DashboardCards";

// Import utils and mock data
import {
  upcomingClasses,
  assignments,
  announcements,
  courseProgress,
  forumPosts,
  todoItems,
  formatDate,
  getDueStatus,
} from "../utils/dashboardUtils";

// Import auth store for user information
import useAuthStore from "@/store/authStore";

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Navigate to different pages
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Navigate to assessment with specific tab
  const navigateToAssessment = (assessmentId: string) => {
    // If it's an exam, redirect to the assessment page with upcoming tab
    if (assessmentId.includes("midterm") || assessmentId.includes("exam")) {
      navigate("/lms/assessment");
    } else {
      navigate(`/lms/assessment/${assessmentId}`);
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.firstName}! Here's what's happening today.`}
      />

      {/* Main Dashboard Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={6}>
        {/* Left Column - Main Content */}
        <GridItem>
          {/* Today's Classes */}
          <ContentCard
            title="Today's Classes"
            action={
              <Button
                variant="ghost"
                rightIcon={<ChevronRightIcon />}
                size="sm"
                onClick={() => navigateTo("/lms/schedule")}
              >
                View Schedule
              </Button>
            }
          >
            {upcomingClasses.length > 0 ? (
              <List spacing={4}>
                {upcomingClasses.map((classItem) => (
                  <ListItem key={classItem.id}>
                    <ClassCard classItem={classItem} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <EmptyState
                title="No Classes Today"
                description="No classes scheduled for today."
              />
            )}
          </ContentCard>

          {/* Upcoming Assignments */}
          <ContentCard
            title="Upcoming Assignments"
            action={
              <Button
                variant="ghost"
                rightIcon={<ChevronRightIcon />}
                size="sm"
                onClick={() => navigateTo("/lms/assessment")}
              >
                View All
              </Button>
            }
          >
            <List spacing={3}>
              {assignments.map((assignment) => (
                <ListItem
                  key={assignment.id}
                  p={3}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                  _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
                  onClick={() => navigateToAssessment(assignment.id)}
                >
                  <HStack spacing={4}>
                    {/* Icon based on assignment type */}
                    <Icon
                      as={
                        assignment.type === "quiz"
                          ? MdQuiz
                          : assignment.type === "exam"
                            ? MdSchool
                            : MdAssignment
                      }
                      color="brand.secondary.500"
                      boxSize={5}
                    />
                    <Box flex={1}>
                      <HStack justify="space-between" mb={1}>
                        <Box fontWeight="bold">{assignment.title}</Box>
                        <StatusBadge
                          status={getDueStatus(assignment.dueDate).label}
                        />
                      </HStack>
                      <HStack fontSize="sm" color="gray.500">
                        <Box>{assignment.courseCode}</Box>
                        <Box>•</Box>
                        <Box>Due {formatDate(assignment.dueDate)}</Box>
                      </HStack>
                    </Box>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </ContentCard>

          {/* Course Progress */}
          <ContentCard
            title="My Progress"
            action={
              <Button
                variant="ghost"
                rightIcon={<ChevronRightIcon />}
                size="sm"
                onClick={() => navigateTo("/lms/courses")}
              >
                All Courses
              </Button>
            }
          >
            <List spacing={5}>
              {courseProgress.map((course) => (
                <ListItem key={course.id}>
                  <ProgressCard course={course} />
                </ListItem>
              ))}
            </List>
          </ContentCard>
        </GridItem>

        {/* Right Column - Sidebar */}
        <GridItem>
          {/* Announcements */}
          <ContentCard title="Announcements">
            <List spacing={4}>
              {announcements.map((announcement) => (
                <ListItem key={announcement.id}>
                  <AnnouncementCard
                    announcement={announcement}
                    formatDate={formatDate}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              size="sm"
              width="full"
              variant="ghost"
              mt={4}
              onClick={() => navigateTo("/lms/announcement")}
            >
              View All Announcements
            </Button>
          </ContentCard>

          {/* Latest Forum Posts */}
          <ContentCard title="Latest Forum Posts">
            <List spacing={4}>
              {forumPosts.map((post) => (
                <ListItem key={post.id}>
                  <HStack spacing={3}>
                    <Box>
                      <Box fontWeight="bold" fontSize="sm">
                        {post.title}
                      </Box>
                      <Box fontSize="xs" color="gray.500">
                        {post.course} • {formatDate(post.postedAt)}
                      </Box>
                    </Box>
                  </HStack>
                </ListItem>
              ))}
            </List>
            <Button
              size="sm"
              width="full"
              variant="ghost"
              onClick={() => navigateTo("/lms/forum")}
              mt={4}
            >
              Go to Forum
            </Button>
          </ContentCard>

          {/* To-Do List */}
          <ContentCard title="To-Do List">
            <List spacing={2}>
              {todoItems.map((todo) => (
                <ListItem key={todo.id}>
                  <TodoItem todo={todo} />
                </ListItem>
              ))}
            </List>
          </ContentCard>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
