import {
  Text,
  Box,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { getDonations } from '../Service/amplifyService';
import { Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function TransactionsPage(){
  const [users, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonations, setTotalDonations] = useState(0);

  let query = useQuery();
  const userId = query.get('userId');

  useEffect(() => {
    getDonations(currentPage, userId).then(response => {
      setDonations(response.donations);
      setTotalPages(response.totalPages);
      setTotalDonations(response.totalDonations);
      setIsLoading(false);
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
  };

  return (
    <Box>
      <Box  h={"25px"}/>
      <Text fontSize='2xl' as='b' >Transactions ({totalDonations})</Text>
      <Box h={"25px"}/>
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Amount (USD)</Th>
                <Th>Name</Th>
                <Th>Message</Th>
                <Th>Sent at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(donation => (
                <Tr key={donation.id}>
                  <Td isNumeric>{donation.amount}</Td>
                  <Td>{donation.name}</Td>
                  <Td>{donation.message}</Td>
                  <Td>{donation.createdAt}</Td>
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
