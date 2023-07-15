import React, { useEffect } from 'react';
import {
  ChakraProvider,
  theme, Center,
} from '@chakra-ui/react';

function App({signOut, user}) {
  useEffect(() => {
  if (!user.attributes['custom:is_admin']) {
      signOut();
    }
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <Center>
        {user.username}
      </Center>
    </ChakraProvider>
  );
}

export default App;
