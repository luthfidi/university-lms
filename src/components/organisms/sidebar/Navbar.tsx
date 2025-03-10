import {
  Box,
  Flex,
  Text,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BellIcon, SettingsIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import ThemeToggleButton from "./ThemeToggleButton";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Use proper color values that work well in both modes
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const titleColor = useColorModeValue(
    "brand.primary.700",
    "brand.primary.200"
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px" /* Maintain exact 64px height to match sidebar header */
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={10}
      px={4}
      boxShadow="sm"
    >
      <Flex h="full" align="center" justify="space-between">
        {/* Left section with hamburger menu and title */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle sidebar"
            icon={<HamburgerIcon />}
            onClick={onToggleSidebar}
            variant="ghost"
            size="md"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={titleColor}
            letterSpacing="tight"
            display={{ base: "none", md: "block" }}
          >
            University.com
          </Text>
        </HStack>

        {/* Right-side actions */}
        <Flex align="center" gap={4}>
          {/* Theme Toggle Button */}
          <ThemeToggleButton />

          {/* Notifications */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Notifications"
              icon={
                <>
                  <BellIcon fontSize="xl" />
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    boxSize="18px"
                    fontSize="xs"
                  >
                    3
                  </Badge>
                </>
              }
              variant="ghost"
              size="md"
            />
            <MenuList>
              <MenuItem>New Assignment Due Tomorrow</MenuItem>
              <MenuItem>Exam Schedule Updated</MenuItem>
              <MenuItem>New Course Available</MenuItem>
              <MenuDivider />
              <MenuItem>View All Notifications</MenuItem>
            </MenuList>
          </Menu>

          {/* User Menu */}
          <Menu>
            <MenuButton>
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={`${user.firstName} ${user.lastName}`}
                  src={user.profilePicture}
                  cursor="pointer"
                />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
