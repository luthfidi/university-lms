import {
  Box,
  VStack,
  Text,
  Flex,
  useColorModeValue,
  Badge,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useNavigation from "@/hooks/useNavigation";
import useAuthStore from "@/store/authStore";
import NavItem from "./NavItem";

interface SidebarProps {
  width: string;
  onClose: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ width, onClose, isMobile }) => {
  const navigation = useNavigation();
  const { user, activeModule, setActiveModule } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  if (!user) return null;

  // Module switching is now handled directly in the buttons

  return (
    <Box
      width={width}
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      boxShadow="sm"
      h="100vh"
      overflowY="auto"
    >
      <VStack spacing={0} align="stretch" h="full">
        {/* Header with Close Button - Exactly 64px height to match navbar */}
        <Flex
          h="64px"
          px={4}
          align="center"
          justify="space-between"
          borderBottomWidth="1px"
          borderColor={borderColor}
        >
          {isMobile && <CloseButton p={5} onClick={onClose} />}
          <Text fontSize="lg" fontWeight="bold" color="brand.primary.700">
            University.com
          </Text>
        </Flex>

        {/* User Role Section */}
        <Box px={4} py={3} borderBottomWidth="1px" borderColor={borderColor}>
          <Flex direction="column" align="flex-start">
            <Badge
              colorScheme="blue"
              p={2}
              borderRadius="md"
              textAlign="center"
              fontSize="sm"
              mb={2}
            >
              Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>

            <Button
              size="xs"
              variant="outline"
              onClick={() => console.log("Change role")}
            >
              Change Role
            </Button>
          </Flex>
        </Box>

        {/* Navigation Links */}
        <Box flex="1" overflowY="auto" py={2} px={2}>
          <VStack spacing={1} align="stretch">
            {navigation.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname.startsWith(item.path)}
                isCollapsed={false}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onClose();
                }}
              />
            ))}
          </VStack>
        </Box>

        {/* Module Toggle - Bottom Section */}
        <Box p={4} borderTopWidth="1px" borderColor={borderColor}>
          <Text mb={2} fontSize="sm" fontWeight="medium" color={textColor}>
            Switch Module:
          </Text>
          <Flex gap={2}>
            <Button
              size="sm"
              colorScheme={activeModule === "lms" ? "blue" : "gray"}
              variant={activeModule === "lms" ? "solid" : "outline"}
              flex="1"
              onClick={() => {
                if (activeModule !== "lms") {
                  setActiveModule("lms");
                  navigate("/lms/dashboard");
                }
              }}
            >
              LMS
            </Button>
            <Button
              size="sm"
              colorScheme={activeModule === "university" ? "blue" : "gray"}
              variant={activeModule === "university" ? "solid" : "outline"}
              flex="1"
              onClick={() => {
                if (activeModule !== "university") {
                  setActiveModule("university");
                  navigate("/university/dashboard");
                }
              }}
            >
              University
            </Button>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
