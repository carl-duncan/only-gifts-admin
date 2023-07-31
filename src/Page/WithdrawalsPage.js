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
  Tr, Badge,
} from '@chakra-ui/react';
import { getDonations, getWithdrawals } from '../Service/amplifyService';
import { Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function WithdrawalsPage(){
  const [withdrawals, setWithdrawals] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  let query = useQuery();
  const userId = query.get('userId');

  useEffect(() => {
    getWithdrawals(currentPage, userId).then(response => {
      setWithdrawals(response.withdrawals);
      setProfiles(response.profiles);
      setTotalPages(response.totalPages);
      setTotalWithdrawals(response.totalWithdrawals);
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
      <Text fontSize='2xl' as='b' >Withdrawals ({totalWithdrawals})</Text>
      <Box h={"25px"}/>
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Amount (USD)</Th>
                <Th>User</Th>
                <Th>Bank Account</Th>
                <Th>Status</Th>
                <Th>Sent at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {withdrawals.map((donation,i) =>{
                const profile = profiles[i];
                return (
                <Tr key={donation.id}>
                  <Td isNumeric>{currencyFormatter.format(donation.amount)}</Td>
                  <Td>{profile.user_name} ({profile.display_name})</Td>
                  <Td>{donation.bank_account_id}</Td>
                  <Td>
                    <Badge colorScheme={donation.status === 'COMPLETED' ? 'green' : 'red'}>
                      {donation.status}
                    </Badge>
                  </Td>
                  <Td>{donation.createdAt}</Td>
                </Tr>
              );
              })}
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
