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
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Icon,
  FormErrorMessage,
  Alert,
  AlertIcon,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdClass, MdForum } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Mock data for the forum topic
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
};

// Define validation schema
const threadSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
  isAnnouncement: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  visibility: z.enum(["public", "private"]),
});

type ThreadFormData = z.infer<typeof threadSchema>;

const CreateThreadPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // In a real app, fetch forum topic data based on topicId
  const topic = forumTopicData; // Using mock data

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ThreadFormData>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      title: "",
      content: "",
      isAnnouncement: false,
      isPinned: false,
      visibility: "public",
    },
  });

  const isAnnouncement = watch("isAnnouncement");

  const onSubmit = async (data: ThreadFormData) => {
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to create the thread
      console.log("Creating thread with data:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Thread created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect back to forum topic
      navigate(`/lms/forum/${topicId}`);
    } catch (error) {
      toast({
        title: "Failed to create thread",
        description:
          "An error occurred while creating the thread. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/lms/forum/${topicId}`);
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
        <BreadcrumbItem>
          <BreadcrumbLink href={`/lms/forum/${topic.id}`}>
            {topic.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>New Thread</BreadcrumbLink>
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
        <Box>
          <HStack mb={1}>
            <Heading size="md" color="brand.primary.700">
              {topic.courseCode}
            </Heading>
            <Text color="brand.primary.600">•</Text>
            <Text color="brand.primary.600">{topic.courseName}</Text>
          </HStack>
          <Heading size="md">{topic.title}</Heading>
        </Box>
      </Flex>

      {/* Create Thread Form */}
      <Card
        bg={cardBg}
        boxShadow="md"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody p={6}>
          <Heading size="md" mb={6}>
            Create New Thread
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Thread Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  {...register("title")}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.content}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Textarea
                  id="content"
                  placeholder="Write your message here..."
                  rows={10}
                  {...register("content")}
                />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="visibility">Visibility</FormLabel>
                <Select id="visibility" {...register("visibility")}>
                  <option value="public">Public (visible to everyone)</option>
                  <option value="private">
                    Private (visible to lecturer only)
                  </option>
                </Select>
              </FormControl>

              {/* Only show announcement and pin options for lecturers - in a real app, check user role */}
              <FormControl>
                <HStack spacing={5}>
                  <Checkbox id="isAnnouncement" {...register("isAnnouncement")}>
                    Mark as Announcement
                  </Checkbox>

                  <Checkbox
                    id="isPinned"
                    {...register("isPinned")}
                    isDisabled={isAnnouncement}
                    isChecked={isAnnouncement || watch("isPinned")}
                  >
                    Pin Thread
                  </Checkbox>
                </HStack>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {isAnnouncement
                    ? "Announcements are automatically pinned to the top of the forum."
                    : "Pinned threads appear at the top of the forum."}
                </Text>
              </FormControl>

              {isAnnouncement && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Announcements are important messages that will be
                    highlighted for all students. Use this sparingly for
                    critical information.
                  </Text>
                </Alert>
              )}

              <HStack spacing={4} justify="flex-end" pt={4}>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  loadingText="Creating..."
                >
                  Create Thread
                </Button>
              </HStack>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CreateThreadPage;
