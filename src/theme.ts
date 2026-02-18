import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Outfit', sans-serif`,
    body: `'Outfit', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? '#090c1a' : '#f0f2f8',
        color: props.colorMode === 'dark' ? '#e4e6f0' : '#1a1c2e',
        scrollBehavior: 'smooth',
      },
      '*::-webkit-scrollbar': {
        width: '6px',
      },
      '*::-webkit-scrollbar-track': {
        bg: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200',
        borderRadius: 'full',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        bg: props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
      },
    }),
  },
  colors: {
    gray: {
      50: '#f0f2f8',
      100: '#e1e4ef',
      200: '#c8cde0',
      300: '#a3aac5',
      400: '#7a82a6',
      500: '#5c6490',
      600: '#454c73',
      700: '#2d3258',
      800: '#181c36',
      900: '#090c1a',
    },
    brand: {
      50: '#f5f0ff',
      100: '#e9deff',
      200: '#d4bbff',
      300: '#b68fff',
      400: '#9c6aff',
      500: '#8347ff',
      600: '#6e2cf5',
      700: '#5a1ed6',
      800: '#4917a8',
      900: '#37117d',
    },
    accent: {
      50: '#fff0f7',
      100: '#ffe0ef',
      200: '#ffb8d9',
      300: '#ff8cc0',
      400: '#ff5eaa',
      500: '#ff3695',
      600: '#e6177e',
      700: '#bf0064',
      800: '#8a004a',
      900: '#520030',
    },
  },
  shadows: {
    glow: '0 0 20px rgba(131, 71, 255, 0.3)',
    'glow-lg': '0 0 40px rgba(131, 71, 255, 0.25)',
    'card-hover':
      '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(131, 71, 255, 0.15)',
    glass: '0 4px 30px rgba(0, 0, 0, 0.3)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'xl',
        transition: 'all 0.25s ease',
      },
      variants: {
        ghost: (props: any) => ({
          _hover: {
            bg:
              props.colorMode === 'dark'
                ? 'whiteAlpha.100'
                : 'blackAlpha.50',
          },
        }),
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            shadow: 'glow',
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? '#12152a' : 'white',
          borderRadius: '2xl',
          overflow: 'hidden',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'whiteAlpha.50'
              : 'blackAlpha.100',
        },
      }),
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === 'dark' ? '#12152a' : 'white',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'whiteAlpha.100'
              : 'blackAlpha.100',
          borderRadius: 'xl',
          boxShadow: 'glass',
          backdropFilter: 'blur(20px)',
          py: 2,
        },
        item: {
          bg: 'transparent',
          _hover: {
            bg:
              props.colorMode === 'dark'
                ? 'whiteAlpha.100'
                : 'blackAlpha.50',
          },
          borderRadius: 'lg',
          mx: 2,
          px: 3,
          transition: 'all 0.15s ease',
        },
      }),
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? '#12152a' : 'white',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'whiteAlpha.100'
              : 'blackAlpha.100',
          borderRadius: '2xl',
          boxShadow: 'glow-lg',
        },
        overlay: {
          bg: 'blackAlpha.700',
          backdropFilter: 'blur(8px)',
        },
      }),
    },
    Input: {
      variants: {
        filled: (props: any) => ({
          field: {
            bg:
              props.colorMode === 'dark'
                ? 'whiteAlpha.50'
                : 'blackAlpha.50',
            _hover: {
              bg:
                props.colorMode === 'dark'
                  ? 'whiteAlpha.100'
                  : 'blackAlpha.100',
            },
            _focus: {
              bg:
                props.colorMode === 'dark'
                  ? 'whiteAlpha.100'
                  : 'white',
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
            },
            borderRadius: 'full',
            border: '1px solid',
            borderColor: 'transparent',
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

export default theme;
