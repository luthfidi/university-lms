// src/features/lms/courses/pages/CoursesPageRefactored.tsx
import {
  Box,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MdBook } from "react-icons/md";

import PageHeader from "@/components/composite/PageHeader";
import ContentCard from "@/components/atomic/cards/ContentCard";
import CourseCard from "@/components/composite/CourseCard";
import EmptyState from "@/components/atomic/feedback/EmptyState";
import { useFilteredData } from "@/hooks/useFilteredData";

// Course data would come from an API or context in a real app
const courses = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    lecturer: "Dr. Jane Smith",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 65,
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    lecturer: "Prof. Robert Johnson",
    type: "LEC",
    credits: 4,
    semester: "Odd 2024/2025",
    progress: 45,
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    lecturer: "Dr. Emily Williams",
    type: "LEC",
    credits: 2,
    semester: "Odd 2024/2025",
    progress: 80,
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    lecturer: "Michael Chen",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 70,
  },
  {
    id: "phys101",
    code: "PHYS101",
    name: "Physics I",
    lecturer: "Dr. Alan Parker",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 55,
  },
  {
    id: "phys101l",
    code: "PHYS101L",
    name: "Physics I Lab",
    lecturer: "Sarah Johnson",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 60,
  },
];

const CoursesPageRefactored = () => {

  const {
    filteredData,
    searchTerm,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  } = useFilteredData(courses, {
    searchFields: ["code", "name", "lecturer"],
  });

  return (
    <Box>
      <PageHeader
        title="My Courses"
        subtitle="View all your current courses and access learning materials"
      />

      <ContentCard mb={6}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          align={{ base: "stretch", md: "center" }}
        >
          <InputGroup maxW={{ md: "320px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search courses"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </InputGroup>

          <Flex
            flex={{ md: 1 }}
            gap={4}
            direction={{ base: "column", sm: "row" }}
          >
            <Select
              placeholder="All Semesters"
              onChange={(e) => handleFilterChange("semester", e.target.value)}
            >
              <option value="Odd 2024/2025">Odd Semester 2024/2025</option>
              <option value="Even 2023/2024">Even Semester 2023/2024</option>
              <option value="Odd 2023/2024">Odd Semester 2023/2024</option>
            </Select>

            <Select
              placeholder="All Types"
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="LEC">Lecture (LEC)</option>
              <option value="LAB">Laboratory (LAB)</option>
            </Select>
          </Flex>
        </Flex>
      </ContentCard>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredData.length === 0 ? (
          <Box gridColumn="1 / -1">
            <EmptyState
              title="No Courses Found"
              message="There are no courses matching your search criteria."
              icon={MdBook}
              action={{
                label: "Clear Filters",
                onClick: () => resetFilters(),
              }}
            />
          </Box>
        ) : (
          filteredData.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              code={course.code}
              name={course.name}
              lecturer={course.lecturer}
              type={course.type}
              credits={course.credits}
              progress={course.progress}
            />
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CoursesPageRefactored;
