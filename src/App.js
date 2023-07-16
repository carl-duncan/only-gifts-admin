import React, { useEffect } from 'react';
import {
  Box,
  ChakraProvider, Switch,
  theme,
} from '@chakra-ui/react';
import { Route, useNavigate } from 'react-router-dom';


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
        <Switch>
          <Route exact path="/">
            <Box />
          </Route>
          <Route path="/transactions">
            <Box />
          </Route>
          <Route path="/users">
            <Box />
          </Route>
          <Route path="/withdrawals">
            <Box />
          </Route>
        </Switch>
      </View>
    </ChakraProvider>
  );
}

export default App;
