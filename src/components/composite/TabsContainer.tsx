// src/components/composite/TabsContainer.tsx
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import ContentCard from "@/components/atomic/cards/ContentCard";

interface TabItem {
  label: string;
  content: ReactNode;
  count?: number;
}

interface TabsContainerProps {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  isBoxed?: boolean;
  variant?:
    | "enclosed"
    | "line"
    | "enclosed-colored"
    | "soft-rounded"
    | "solid-rounded"
    | "unstyled";
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  defaultIndex = 0,
  onChange,
  isBoxed = true,
  variant = "enclosed",
}) => {
  const tabsComponent = (
    <Tabs
      variant={variant}
      colorScheme="blue"
      defaultIndex={defaultIndex}
      onChange={onChange}
    >
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>
            {tab.label}
            {tab.count !== undefined && (
              <Badge ml={2} colorScheme="blue" borderRadius="full">
                {tab.count}
              </Badge>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index} px={0} pt={5}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );

  if (isBoxed) {
    return <ContentCard noPadding>{tabsComponent}</ContentCard>;
  }

  return tabsComponent;
};

export default TabsContainer;
