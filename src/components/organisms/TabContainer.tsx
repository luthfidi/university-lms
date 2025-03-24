import { ReactNode } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabsProps,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

export interface TabItem {
  label: string;
  content: ReactNode;
  badge?: {
    count: number;
    colorScheme?: string;
  };
}

interface TabContainerProps extends Omit<TabsProps, "children"> {
  tabs: TabItem[];
  onTabChange?: (index: number) => void;
}

/**
 * TabContainer component for consistent tab interface
 * Used across the application for tabbed content
 */
const TabContainer = ({
  tabs,
  onTabChange,
  ...tabsProps
}: TabContainerProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Tabs
      variant="enclosed"
      colorScheme="blue"
      onChange={onTabChange}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={cardBg}
      boxShadow="sm"
      {...tabsProps}
    >
      <TabList px={4} pt={4}>
        {tabs.map((tab, index) => (
          <Tab key={index}>
            {tab.label}
            {tab.badge && tab.badge.count > 0 && (
              <Badge
                ml={2}
                colorScheme={tab.badge.colorScheme || "red"}
                borderRadius="full"
              >
                {tab.badge.count}
              </Badge>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index} px={5} py={4}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabContainer;
