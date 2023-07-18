import React, { useEffect } from 'react';
import {
  Box, Center, Flex,
  ChakraProvider,
} from '@chakra-ui/react';
import { Route, useNavigate , Routes} from 'react-router-dom';

import { Menu, MenuItem, Divider } from '@aws-amplify/ui-react';
import { UsersPage } from './Page/UsersPage';
import { TransactionsPage } from './Page/TransactionsPage';
import theme from './theme/theme';

function App({signOut, user}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.attributes['custom:is_admin']) {
      signOut();
    }
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh">
        <Box paddingTop={"0.5em"} paddingLeft={"1em"} paddingBottom={"0.5em"} border={"1px"} borderColor='gray.200' bg={"white"}>
          <Menu marginTop={"1em"}>
            <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
            <MenuItem onClick={() => navigate('transactions')}>Transactions</MenuItem>
            <MenuItem onClick={() => navigate('users')}>Users</MenuItem>
            <MenuItem onClick={() => navigate('withdrawals')}>Withdrawals</MenuItem>
            <MenuItem onClick={() => navigate('deductions')}>Deductions</MenuItem>
            <Divider />
            <MenuItem color={"red"} onClick={() => signOut()}>Sign Out</MenuItem>
          </Menu>
        </Box>
        <Box flex="1" w="95%" pt="10px" pl={"20px"} pr={"20px"} m={'20px'} bg={"white"} border={"1px"} borderColor='gray.200'>
          <Routes>
            <Route path='/users' element={<UsersPage/>} />
            <Route path='/transactions' element={<TransactionsPage/>} />
          </Routes>
        </Box>
        <Box paddingTop={"0.5em"} paddingBottom={"0.5em"} border={"1px"} borderColor='gray.200' bg={"white"}>
          <Center>
            Made by Carl Duncan
          </Center>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
