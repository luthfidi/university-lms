import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Navbar from "@/components/organisms/sidebar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

// Define constants for the sidebar dimensions
const SIDEBAR_WIDTH = "260px";
const SIDEBAR_COLLAPSED_WIDTH = "70px";
const NAVBAR_HEIGHT = "64px";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Use responsive background color based on color mode
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Sidebar */}
      <Sidebar width={SIDEBAR_WIDTH} collapsedWidth={SIDEBAR_COLLAPSED_WIDTH} />

      {/* Main content area */}
      <Box
        ml={SIDEBAR_WIDTH}
        w={`calc(100% - ${SIDEBAR_WIDTH})`}
        h="full"
        position="relative"
      >
        {/* Navbar */}
        <Navbar marginLeft={SIDEBAR_WIDTH} />

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