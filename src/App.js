import React, { useEffect } from 'react';
import {
  Box,
  ChakraProvider,
} from '@chakra-ui/react';
import { Route, useNavigate , Routes} from 'react-router-dom';


import { Menu, MenuItem, View, Divider } from '@aws-amplify/ui-react';
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
      <View width="2rem" paddingTop={"1em"} paddingLeft={"1em"} >
        <Menu marginTop={"1em"}>
          <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
          <MenuItem onClick={() => navigate('transactions')}>Transactions</MenuItem>
          <MenuItem onClick={() => navigate('users')}>Users</MenuItem>
          <MenuItem onClick={() => navigate('withdrawals')}>Withdrawals</MenuItem>
          <MenuItem onClick={() => navigate('deductions')}>Deductions</MenuItem>
          <Divider />
          <MenuItem color={"red"} onClick={() => signOut()}>Sign Out</MenuItem>
        </Menu>
      </View>
      <Box w="98vw" pt="10px" pl={"20px"} pr={"20px"} m={'20px'} bg={"white"} border={"1px"} borderColor='gray.200'>
        <Routes>
          <Route path='/users' element={<UsersPage/>} />
          <Route path='/transactions' element={<TransactionsPage/>} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
