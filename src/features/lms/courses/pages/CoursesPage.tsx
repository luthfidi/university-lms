import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Import reusable components
import PageHeader from "@/components/molecules/PageHeader";
import SearchFilterBar from "@/components/organisms/SearchFilterBar";
import CourseCard from "@/components/molecules/CourseCard";
import EmptyState from "@/components/molecules/EmptyState";

// Import utils
import {
  courses,
  semesterOptions,
  courseTypeOptions,
} from "../utils/coursesUtils";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("odd-2024");
  const [typeFilter, setTypeFilter] = useState("");

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType =
      typeFilter === "" ||
      course.type.toLowerCase() === typeFilter.toUpperCase();

    // For the purposes of this example, we're filtering against the hardcoded semester value
    const matchesSemester = course.semester.toLowerCase().includes("odd 2024");

    return matchesSearch && matchesType && matchesSemester;
  });

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === "semester") {
      setSemesterFilter(value);
    } else if (filterName === "type") {
      setTypeFilter(value);
    }
  };

  // Navigate to course detail
  const handleViewCourse = (courseId: string) => {
    navigate(`/lms/courses/${courseId}`);
  };

  return (
    <Box>
      {/* Page Header */}
      <PageHeader
        title="My Courses"
        description="View all your current courses and access learning materials"
      />

      {/* Search and Filters */}
      <SearchFilterBar
        searchPlaceholder="Search courses"
        onSearch={handleSearch}
        filters={[
          {
            name: "semester",
            placeholder: "All Semesters",
            options: semesterOptions,
          },
          {
            name: "type",
            placeholder: "All Types",
            options: courseTypeOptions,
          },
        ]}
      />

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={handleViewCourse}
            />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState
          title="No Courses Found"
          description="No courses match your search criteria."
        />
      )}
    </Box>
  );
};

export default CoursesPage;
