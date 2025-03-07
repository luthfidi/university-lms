import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      label={
        colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      <IconButton
        aria-label={
          colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        colorScheme="blue"
        size="md"
      />
    </Tooltip>
  );
};

export default ThemeToggleButton;
