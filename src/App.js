import React, { useEffect } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


import { Menu, MenuItem, View, Divider } from '@aws-amplify/ui-react';

function App({signOut, user}) {
  const navigate = useNavigate();

  useEffect(() => {
  if (!user.attributes['custom:is_admin']) {
      signOut();
    }
  }, [user]);


  return (
    <ChakraProvider theme={theme}>
      <View width="4rem" paddingTop={"1em"} paddingLeft={"1em"}>
        <Menu marginTop={"1em"}>
          <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
          <MenuItem onClick={() => navigate('transactions')}>Transactions</MenuItem>
          <MenuItem onClick={() => navigate('users')}>Users</MenuItem>
          <MenuItem onClick={() => navigate('withdrawals')}>Withdrawals</MenuItem>
          <Divider />
          <MenuItem color={"red"} onClick={() => signOut()}>Sign Out</MenuItem>
        </Menu>
      </View>
    </ChakraProvider>
  );
}

export default App;
