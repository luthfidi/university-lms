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
  Switch,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { BellIcon, SettingsIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { AppModule } from "@/types/global";

interface NavbarProps {
  marginLeft: string;
}

const Navbar: React.FC<NavbarProps> = ({ marginLeft }) => {
  const { user, logout, activeModule, setActiveModule } = useAuthStore();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleModuleToggle = () => {
    const newModule: AppModule = activeModule === "lms" ? "university" : "lms";
    setActiveModule(newModule);

    // Navigate to the appropriate dashboard based on the module
    navigate(`/${newModule}/dashboard`);
  };

  if (!user) return null;

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={marginLeft}
      right={0}
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={5}
      px={4}
      boxShadow="sm"
      transition="left 0.2s ease"
    >
      <Flex h="full" align="center" justify="space-between">
        {/* Logo / Title */}
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="brand.primary.700"
            letterSpacing="tight"
          >
            University.com
          </Text>
        </Box>

        {/* Module Toggle */}
        <HStack spacing={2}>
          <FormLabel htmlFor="module-toggle" mb="0">
            {activeModule === "lms" ? "LMS" : "My University"}
          </FormLabel>
          <Switch
            id="module-toggle"
            colorScheme="brand.primary"
            isChecked={activeModule === "university"}
            onChange={handleModuleToggle}
          />
        </HStack>

        {/* Right-side actions */}
        <Flex align="center" gap={4}>
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
              <Avatar
                size="sm"
                name={`${user.firstName} ${user.lastName}`}
                src={user.profilePicture}
                cursor="pointer"
              />
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
