import { Flex, Icon, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

// We'll use react-icons library
import {
  MdDashboard,
  MdBook,
  MdForum,
  MdAssignment,
  MdGrade,
  MdEventAvailable,
  MdCalendarMonth,
  MdNotifications,
  MdEdit,
  MdManageAccounts,
  MdSettings,
  MdDescription,
  MdHistory,
  MdPayments,
  MdSchool,
  MdAccountBox,
  MdWork,
  MdAnalytics,
} from "react-icons/md";

// Map of icon names to icon components
const iconMap: Record<string, ReactNode> = {
  dashboard: <MdDashboard />,
  book: <MdBook />,
  forum: <MdForum />,
  assignment: <MdAssignment />,
  grade: <MdGrade />,
  event_available: <MdEventAvailable />,
  calendar_month: <MdCalendarMonth />,
  notifications: <MdNotifications />,
  edit: <MdEdit />,
  grading: <MdGrade />,
  manage_accounts: <MdManageAccounts />,
  settings: <MdSettings />,
  description: <MdDescription />,
  history: <MdHistory />,
  payments: <MdPayments />,
  school: <MdSchool />,
  account_box: <MdAccountBox />,
  work: <MdWork />,
  analytics: <MdAnalytics />,
};

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  isCollapsed,
  onClick,
}) => {
  const activeBg = useColorModeValue("brand.primary.50", "brand.primary.900");
  const activeColor = useColorModeValue(
    "brand.primary.700",
    "brand.primary.200"
  );
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Tooltip label={label} placement="right" isDisabled={!isCollapsed} hasArrow>
      <Flex
        align="center"
        px={3}
        py={2}
        cursor="pointer"
        role="group"
        fontWeight={isActive ? "semibold" : "normal"}
        transition=".15s ease"
        bg={isActive ? activeBg : undefined}
        color={isActive ? activeColor : undefined}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
        }}
        borderRadius="md"
        onClick={onClick}
      >
        <Icon
          mr={isCollapsed ? 0 : 3}
          fontSize="xl"
          as={() => iconMap[icon] || <MdDashboard />}
          color={isActive ? activeColor : undefined}
        />
        {!isCollapsed && <Text noOfLines={1}>{label}</Text>}
      </Flex>
    </Tooltip>
  );
};

export default NavItem;
