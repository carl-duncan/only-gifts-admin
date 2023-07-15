import React, { useEffect } from 'react';
import {
  ChakraProvider,
  theme, Center,
} from '@chakra-ui/react';
import { Button } from '@aws-amplify/ui-react';


function App({signOut: signOut, user}) {
  useEffect(() => {
    if (user.username === '696aa3f6-93de-4a40-8d66-6f47706e94eb') {
      signOut();
    }
  }, [user.username, signOut]);

  return (
    <ChakraProvider theme={theme}>
      <Center>
        {user.username}
      </Center>
    </ChakraProvider>
  );
}

export default App;
