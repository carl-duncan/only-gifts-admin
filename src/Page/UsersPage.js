import { Box, Button, Menu, MenuButton, Skeleton, MenuList, MenuItem, Flex, Badge } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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

  useEffect(() => {
    getUsers(currentPage, searchValue).then(response => {
      setUsers(response.users);
      setTotalPages(response.totalPages);
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
      <Box h={"50px"}/>
      <SearchField
        label='search'
        placeholder='Search by Username'
        maxWidth='500px'
        onChange={(event) => handleSearchChange(event.target.value)}
      />
      <Box h={"50px"}/>
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table>
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
                    <Badge>Banned</Badge>
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end">
                      <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem colorScheme='red'>Ban</MenuItem>
                          <MenuItem colorScheme='blue'>View Page</MenuItem>
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
