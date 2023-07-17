import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#F2F3F3',
        color: 'black',
      },
      fontFamily: 'Roboto',
    },
  },
})

export default theme;