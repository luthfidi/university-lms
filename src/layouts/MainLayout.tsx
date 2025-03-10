import { Box, Flex, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Navbar from "@/components/organisms/sidebar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

// Define constants for the sidebar dimensions
const SIDEBAR_WIDTH = "240px";
const SIDEBAR_MOBILE_WIDTH = "220px";
// Define exact height for navbar and sidebar header
const NAVBAR_HEIGHT = "64px";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State for sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // Use responsive background color based on color mode
  const bgColor = useColorModeValue("gray.50", "gray.900");
  
  // Detect if we're on mobile
  const isMobile = useBreakpointValue({ base: true, md: false }) || false;
  
  // Auto-hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isMobile]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Sidebar - conditionally rendered based on visibility */}
      {isSidebarVisible && (
        <Box 
          position="fixed"
          left={0}
          top={0}
          bottom={0}
          width={isMobile ? SIDEBAR_MOBILE_WIDTH : SIDEBAR_WIDTH}
          zIndex={20}
          transition="all 0.3s"
        >
          <Sidebar 
            width={isMobile ? SIDEBAR_MOBILE_WIDTH : SIDEBAR_WIDTH}
            onClose={toggleSidebar}
            isMobile={isMobile ?? false}
          />
        </Box>
      )}

      {/* Main content area */}
      <Box
        ml={{ base: 0, md: isSidebarVisible ? SIDEBAR_WIDTH : 0 }}
        w="100%"
        h="full"
        position="relative"
        transition="margin-left 0.3s ease, width 0.3s ease"
      >
        {/* Navbar with hamburger menu */}
        <Navbar 
          onToggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Page content */}
        <Box
          as="main"
          mt={NAVBAR_HEIGHT}
          p={6}
          h={`calc(100vh - ${NAVBAR_HEIGHT})`}
          overflowY="auto"
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;