import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#666666",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#434957",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        blueAccent: {
          100: "#f8fdfe",
          200: "#f1fbfd",
          300: "#e9f8fc",
          400: "#e2f6fb",
          500: "#dbf4fa",
          600: "#afc3c8",
          700: "#839296",
          800: "#586264",
          900: "#2c3132",
        },
        yellowAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          900: "#141414",
          800: "#292929",
          700: "#3d3d3d",
          600: "#525252",
          500: "#666666",
          400: "#858585",
          300: "#a3a3a3",
          200: "#c2c2c2",
          100: "#e0e0e0",
        },
        primary: {
          900: "#040509",
          800: "#080b12",
          700: "#0c101b",
          600: "#101624",
          500: "#141b2d",
          400: "#f2f0f0",
          300: "#727681",
          200: "#a1a4ab",
          100: "#d0d1d5",
        },
        greenAccent: {
          900: "#0f2922",
          800: "#1e5245",
          700: "#2e7c67",
          600: "#3da58a",
          500: "#4cceac",
          400: "#70d8bd",
          300: "#94e2cd",
          200: "#b7ebde",
          100: "#dbf5ee",
        },
        blueAccent: {
          900: "#2c3132",
          800: "#586264",
          700: "#839296",
          600: "#afc3c8",
          500: "#dbf4fa",
          400: "#e2f6fb",
          300: "#e9f8fc",
          200: "#f1fbfd",
          100: "#f8fdfe",
        },
        yellowAccent: {
          900: "#151632",
          800: "#2a2d64",
          700: "#3e4396",
          600: "#535ac8",
          500: "#6870fa",
          400: "#868dfb",
          300: "#a4a9fc",
          200: "#c3c6fd",
          100: "#e1e2fe",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            nuetral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            nuetral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
        fontFamily: ["Barlow", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Barlow", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Barlow", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  
  // context for color mode
  export const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });
  
  export const useMode = () => {
    const [mode, setMode] = useState("dark");
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () =>
          setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
    );
  
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
  };
  