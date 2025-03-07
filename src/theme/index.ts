import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: {
      50: "#E6EEF5",
      100: "#C0D5E8",
      200: "#96B9DB",
      300: "#6C9CCE",
      400: "#4D87C5",
      500: "#2D72BB",
      600: "#2766A9",
      700: "#1A5791",
      800: "#0F487A",
      900: "#0B3055", // Darkest navy blue
    },
    secondary: {
      50: "#E4F5F5",
      100: "#BEE6E6",
      200: "#93D7D7",
      300: "#67C7C8",
      400: "#47BCBD",
      500: "#38B2AC", // Teal
      600: "#2CA1A1",
      700: "#1F8C94",
      800: "#137888",
      900: "#065A73",
    },
    accent: {
      50: "#FFEEDE",
      100: "#FFD4AD",
      200: "#FFB878",
      300: "#FF9C43",
      400: "#FF871F",
      500: "#ED8936", // Orange
      600: "#DB6E00",
      700: "#B75900",
      800: "#944500",
      900: "#7A3700",
    },
  },
  gray: {
    50: "#171923", // error color
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },
};

const fonts = {
  heading: "Poppins, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  body: "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const shadows = {
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

const space = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

// Component specific styling
const components = {
  Button: {
    baseStyle: {
      fontWeight: "semibold",
      borderRadius: "md",
    },
    variants: {
      primary: {
        bg: "brand.primary.500",
        color: "white",
        _hover: {
          bg: "brand.primary.600",
        },
        _active: {
          bg: "brand.primary.700",
        },
      },
      secondary: {
        bg: "brand.secondary.500",
        color: "white",
        _hover: {
          bg: "brand.secondary.600",
        },
        _active: {
          bg: "brand.secondary.700",
        },
      },
      accent: {
        bg: "brand.accent.500",
        color: "white",
        _hover: {
          bg: "brand.accent.600",
        },
        _active: {
          bg: "brand.accent.700",
        },
      },
      ghost: {
        color: "brand.primary.500",
        _hover: {
          bg: "brand.primary.50",
        },
        _active: {
          bg: "brand.primary.100",
        },
      },
    },
    defaultProps: {
      variant: "primary",
      size: "md",
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: "lg",
        boxShadow: "sm",
        overflow: "hidden",
      },
      header: {
        pt: 6,
        px: 6,
        pb: 4,
      },
      body: {
        px: 6,
        py: 4,
      },
      footer: {
        p: 6,
      },
    },
  },
  Sidebar: {
    baseStyle: {
      bg: "white",
      borderRight: "1px",
      borderColor: "gray.100",
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  shadows,
  space,
  components,
});

export default theme;
