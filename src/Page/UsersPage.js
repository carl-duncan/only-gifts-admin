import { Box, Button, Menu, MenuButton, Skeleton, MenuList, MenuItem, Flex, Badge } from '@chakra-ui/react';
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
import { getUsers } from '../Service/amplifyService';
import { BiChevronDown } from 'react-icons/all';
export function UsersPage(){
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

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
                  <Td>{user.balance}</Td>
                  <Td>{user.createdAt}</Td>
                  <Td>
                    <Badge>Available</Badge>
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end">
                      <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem colorScheme='red'>Ban {user.user_name}</MenuItem>
                          <MenuItem colorScheme='blue'>View Page</MenuItem>
                          <MenuItem colorScheme='blue'>View Transactions</MenuItem>
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
