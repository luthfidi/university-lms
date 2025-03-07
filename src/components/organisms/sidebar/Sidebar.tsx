import { useState } from "react";
import {
  Box,
  VStack,
  Avatar,
  Text,
  Flex,
  Divider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useNavigation from "@/hooks/useNavigation";
import useAuthStore from "@/store/authStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";

interface SidebarProps {
  width: string;
  collapsedWidth: string;
}

const Sidebar: React.FC<SidebarProps> = ({ width, collapsedWidth }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  if (!user) return null;

  const currentWidth = isCollapsed ? collapsedWidth : width;

  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width={currentWidth}
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      transition="width 0.2s ease"
      zIndex={10}
      overflowX="hidden"
      boxShadow="sm"
    >
      <VStack spacing={6} align="stretch" h="full" py={4}>
        {/* User Profile Section */}
        <Box px={4}>
          <Flex
            direction={isCollapsed ? "column" : "row"}
            align="center"
            justify={isCollapsed ? "center" : "flex-start"}
            gap={isCollapsed ? 2 : 4}
          >
            <Avatar
              size={isCollapsed ? "sm" : "md"}
              name={`${user.firstName} ${user.lastName}`}
              src={user.profilePicture}
            />
            {!isCollapsed && (
              <Box>
                <Text fontWeight="bold" noOfLines={1}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text fontSize="sm" color="gray.500" noOfLines={1}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Navigation Links */}
        <VStack spacing={1} align="stretch" flex="1" px={2}>
          {navigation.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname.startsWith(item.path)}
              isCollapsed={isCollapsed}
              onClick={() => navigate(item.path)}
            />
          ))}
        </VStack>

        {/* Collapse Toggle */}
        <Box px={4}>
          <IconButton
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            size="sm"
            width="full"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
