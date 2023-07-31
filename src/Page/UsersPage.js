import { Box, Button, Menu, MenuButton, Skeleton, MenuList, MenuItem, Flex, Badge, useToast } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from '@chakra-ui/react';
import { Pagination, SearchField } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { banUser, getUsers, unbanUser } from '../Service/amplifyService';
import { BiChevronDown } from 'react-icons/all';
import { Profile } from '../models';
export function UsersPage(){
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const toast = useToast();
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  useEffect(() => {
    getUsers(currentPage, searchValue).then(response => {
      setUsers(response.users);
      setTotalPages(response.totalPages);
      setTotalUsers(response.totalUsers);
      setIsLoading(false);
    });
  }, [currentPage, searchValue]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setIsLoading(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
  };

  const handleBanUser = (userId) => {
    banUser(userId).then(() => {
      toast({
        title: 'User banned',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setUsers(users.map(user => {
        if (user.id === userId) {
          return Profile.copyOf(user, updated => {
            updated.banned = true
          });
        }
        return user;
      }
      ));
    });
  }

  const handleUnBanUser = (userId) => {
    unbanUser(userId).then(() => {
      toast({
        title: 'User unbanned',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
    setUsers(users.map(user => {
        if (user.id === userId) {
          return Profile.copyOf(user, updated => {
            updated.banned = false
          });
        }
        return user;
      }
    ));
  }

  return (
    <Box>
      <Box  h={"25px"}/>
      <Text fontSize='2xl' as='b' >Users ({totalUsers})</Text>
      <Box h={"25px"}/>
      <SearchField
        label='search'
        placeholder='Search by Username'
        maxWidth='500px'
        onChange={(event) => handleSearchChange(event.target.value)}
      />
      <Box h={"50px"}/>
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Display Name</Th>
                <Th>Balance</Th>
                <Th>Joined on</Th>
                <Th>Status</Th>

              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user.id}>
                  <Td>{user.user_name}</Td>
                  <Td>{user.display_name}</Td>
                  <Td>{currencyFormatter.format(user.balance)}</Td>
                  <Td>{user.createdAt}</Td>
                  <Td>
                    <Badge colorScheme={!user.banned ? 'green' : 'red'}>
                      {user.banned ? 'Banned' : 'Active'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end">
                      <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          Actions
                        </MenuButton>
                        <MenuList>

                          {!user.banned && (
                            <MenuItem colorScheme='red' onClick={
                              () => handleBanUser(user.id)
                            }>Ban {user.user_name}</MenuItem>
                          )}

                          {user.banned && (
                            <MenuItem colorScheme='green'
                                      onClick={ () => handleUnBanUser(user.id) }
                            >Unban {user.user_name}</MenuItem>
                          )}
                          <MenuItem colorScheme='blue'
                                    onClick={ () => window.open(`https://dev.only.gift/${user.user_name}`, '_blank')}
                          >
                            View Page
                          </MenuItem>
                          <MenuItem colorScheme='blue'
                                    onClick={ () => window.location.href = `/transactions?userId=${user.user_id}`}
                          >View Transactions</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
      <Box h={10}/>
      <Skeleton isLoaded={!isLoading}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          siblingCount={1}
          onChange={(page) => handlePageChange(page)}
        />
      </Skeleton>
      <Box h={10}/>
    </Box>
  );
}
