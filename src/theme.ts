/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? '#08111f' : '#f5f7fb',
        color: props.colorMode === 'dark' ? '#ebf1ff' : '#142033',
        scrollBehavior: 'smooth',
      },
      body: {
        letterSpacing: '-0.01em',
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
      50: '#f8fafe',
      100: '#eef2f9',
      200: '#dce4f0',
      300: '#bfcbdd',
      400: '#93a5be',
      500: '#6b7d96',
      600: '#51627a',
      700: '#39485d',
      800: '#1f2c3f',
      900: '#08111f',
    },
    brand: {
      50: '#eef6ff',
      100: '#d8e8ff',
      200: '#b5d3ff',
      300: '#86b5ff',
      400: '#5793ff',
      500: '#2f73f6',
      600: '#1c58d0',
      700: '#1745a3',
      800: '#16377d',
      900: '#152d63',
    },
    accent: {
      50: '#fff2ea',
      100: '#ffe1cf',
      200: '#ffc097',
      300: '#ff9c62',
      400: '#ff7c3f',
      500: '#ff6230',
      600: '#eb4817',
      700: '#be3612',
      800: '#972d16',
      900: '#7a2918',
    },
  },
  shadows: {
    glow: '0 18px 40px rgba(47, 115, 246, 0.22)',
    'glow-lg': '0 28px 60px rgba(47, 115, 246, 0.18)',
    'card-hover':
      '0 26px 55px rgba(8, 17, 31, 0.2), 0 10px 24px rgba(47, 115, 246, 0.1)',
    glass: '0 18px 60px rgba(8, 17, 31, 0.18)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '700',
        borderRadius: 'xl',
        transition: 'all 0.25s ease',
      },
      variants: {
        ghost: (props: any) => ({
          bg:
            props.colorMode === 'dark'
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.58)',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(20,32,51,0.08)',
          _hover: {
            bg:
              props.colorMode === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.88)',
            transform: 'translateY(-1px)',
          },
        }),
        solid: {
          bg: 'linear-gradient(135deg, var(--chakra-colors-brand-500), var(--chakra-colors-accent-400))',
          color: 'white',
          _hover: {
            transform: 'translateY(-1px)',
            shadow: 'glow',
            opacity: 0.95,
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
          bg:
            props.colorMode === 'dark'
              ? 'rgba(11, 20, 36, 0.94)'
              : 'rgba(255, 255, 255, 0.94)',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(20,32,51,0.08)',
          borderRadius: '2xl',
          boxShadow: 'glass',
          backdropFilter: 'blur(20px)',
          py: 2.5,
        },
        item: {
          bg: 'transparent',
          _hover: {
            bg:
              props.colorMode === 'dark'
                ? 'whiteAlpha.100'
                : 'blackAlpha.50',
          },
          borderRadius: 'xl',
          mx: 2,
          px: 3,
          transition: 'all 0.15s ease',
        },
      }),
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg:
            props.colorMode === 'dark'
              ? 'rgba(11, 20, 36, 0.96)'
              : 'rgba(255, 255, 255, 0.96)',
          border: '1px solid',
          borderColor:
            props.colorMode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(20,32,51,0.08)',
          borderRadius: '28px',
          boxShadow: 'glow-lg',
          backdropFilter: 'blur(24px)',
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
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(255,255,255,0.72)',
            _hover: {
              bg:
                props.colorMode === 'dark'
                  ? 'rgba(255,255,255,0.09)'
                  : 'rgba(255,255,255,0.9)',
            },
            _focus: {
              bg:
                props.colorMode === 'dark'
                  ? 'rgba(255,255,255,0.09)'
                  : 'rgba(255,255,255,0.96)',
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
            },
            borderRadius: 'full',
            border: '1px solid',
            borderColor:
              props.colorMode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(20,32,51,0.08)',
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
