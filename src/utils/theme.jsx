import { extendTheme } from 'native-base';

export default extendTheme({
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
  },
  components: {
    // Center: {
    //   baseStyle: {
    //     _text: {
    //       color: 'emerald.500',
    //     },
    //   },
    // },
    // Button: {
    //   baseStyle: {
    //     rounded: 'md',
    //   },
    //   defaultProps: {
    //     colorScheme: 'emerald',
    //     my: 3,
    //   },
    // },
    // IconButton: {
    //   defaultProps: {
    //     colorScheme: 'emerald',
    //   },
    // },
    // // FormControl: {
    // //   colorScheme: 'emerald',
    // //   defaultProps: {
    // //     my: 2,
    // //   },
    // // },
    FormControlLabel: {
      baseStyle: {
        _text: {
          fontSize: 'sm',
          fontWeight: 'medium',
        },
        my: '1',
        _light: {
          _text: {
            color: 'text.700',
          },
          _astrick: {
            color: 'error.600',
          },
        },
        _dark: {
          _text: {
            color: 'text.600',
          },
          _astrick: {
            color: 'error.500',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        _light: {
          placeholderTextColor: 'text.400',
          color: 'text.900',
          borderColor: 'primary.600',
          _hover: {
            borderColor: 'primary.600',
          },
          _focus: {
            borderColor: 'primary.600',
            _hover: { borderColor: 'primary.600' },
            _stack: {
              style: {
                outlineWidth: '1px',
                outlineStyle: 'solid',
              },
            },
          },
          _invalid: {
            borderColor: 'error.600',
            _hover: { borderColor: 'error.600' },
            _stack: {
              style: {
                outlineWidth: '1px',
                outlineStyle: 'solid',
              },
            },
          },
          _ios: {
            selectionColor: 'coolGray.800',
          },
          _android: {
            selectionColor: 'coolGray.800',
          },
          _disabled: {
            placeholderTextColor: 'muted.700',
            _hover: {
              borderColor: 'muted.300',
            },
          },
          _stack: {
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            overflow: 'hidden',
          },
        },
      }
    },
  },
});
