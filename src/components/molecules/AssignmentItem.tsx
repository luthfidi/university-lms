import {
  Box,
  HStack,
  Text,
  Badge,
  Icon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdAssignment, MdQuiz, MdOutlineTimeline } from "react-icons/md";

interface AssignmentItemProps {
  assignment: {
    id: string;
    title: string;
    courseCode: string;
    dueDate: string;
    type?: "assignment" | "quiz" | "exam" | string;
    status?: string;
    score?: number;
    maxScore?: number;
  };
  onClick?: (assignmentId: string) => void;
}

/**
 * AssignmentItem component for displaying assignment information
 * Used in assignment lists and dashboard pages
 */
const AssignmentItem = ({ assignment, onClick }: AssignmentItemProps) => {
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Determine due status
  const getDueStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return { label: "Overdue", color: "red" };
    if (diffDays === 0) return { label: "Due Today", color: "orange" };
    if (diffDays === 1) return { label: "Due Tomorrow", color: "yellow" };
    return { label: `Due in ${diffDays} days`, color: "green" };
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get icon based on assignment type
  const getAssignmentIcon = (type: string = "assignment") => {
    switch (type.toLowerCase()) {
      case "quiz":
        return MdQuiz;
      case "exam":
        return MdOutlineTimeline;
      default:
        return MdAssignment;
    }
  };

  const dueStatus = getDueStatus(assignment.dueDate);

  return (
    <ListItem
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg, cursor: onClick ? "pointer" : "default" }}
      onClick={() => onClick && onClick(assignment.id)}
    >
      <HStack spacing={4}>
        <Icon
          as={getAssignmentIcon(assignment.type)}
          color="brand.secondary.500"
          boxSize={5}
        />
        <Box flex={1}>
          <HStack justify="space-between" mb={1}>
            <Text fontWeight="bold">{assignment.title}</Text>
            <Badge colorScheme={dueStatus.color}>{dueStatus.label}</Badge>
          </HStack>
          <HStack fontSize="sm" color="gray.500">
            <Text>{assignment.courseCode}</Text>
            <Text>•</Text>
            <Text>
              Due {formatDate(assignment.dueDate)}{" "}
              {formatTime(assignment.dueDate)}
            </Text>
          </HStack>

          {assignment.score !== undefined &&
            assignment.maxScore !== undefined && (
              <Text fontSize="sm" mt={1}>
                Score:{" "}
                <strong>
                  {assignment.score}/{assignment.maxScore}
                </strong>
              </Text>
            )}
        </Box>
      </HStack>
    </ListItem>
  );
};

export default AssignmentItem;
