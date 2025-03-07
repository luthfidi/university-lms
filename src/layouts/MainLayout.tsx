import { Box, Flex, useColorModeValue, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Navbar from "@/components/organisms/sidebar/Navbar";
import { HamburgerIcon } from "@chakra-ui/icons";

interface MainLayoutProps {
  children: ReactNode;
}

// Define constants for the sidebar dimensions
const SIDEBAR_WIDTH = "260px";
const SIDEBAR_COLLAPSED_WIDTH = "70px";
const NAVBAR_HEIGHT = "64px";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Use responsive background color based on color mode
  const bgColor = useColorModeValue("gray.50", "gray.900");
  
  // Detect if we're on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Handle mobile menu toggle
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Current sidebar width
  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Mobile menu toggle */}
      {isMobile && (
        <IconButton
          aria-label="Toggle navigation"
          icon={<HamburgerIcon />}
          position="fixed"
          top="12px"
          left="12px"
          zIndex={20}
          size="md"
          variant="ghost"
          onClick={toggleMobileNav}
          display={{ base: "flex", md: "none" }}
        />
      )}
  
      {/* Sidebar */}
      <Box
        display={{ base: isMobileNavOpen ? "block" : "none", md: "block" }}
        onClick={() => isMobile && setIsMobileNavOpen(false)}
      >
        <Sidebar 
          width={SIDEBAR_WIDTH} 
          collapsedWidth={SIDEBAR_COLLAPSED_WIDTH} 
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </Box>

      {/* Main content area */}
      <Box
        ml={{ base: "0", md: sidebarWidth }}
        w={{ base: "100%", md: `calc(100% - ${sidebarWidth})` }}
        h="full"
        position="relative"
        transition="margin-left 0.3s ease, width 0.3s ease"
      >
        {/* Navbar */}
        <Navbar 
          marginLeft={{ base: "0", md: sidebarWidth }} 
          isCollapsed={isCollapsed}
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