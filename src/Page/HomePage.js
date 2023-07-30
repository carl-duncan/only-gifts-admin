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
import { getDonations, getStatistics, getWithdrawals } from '../Service/amplifyService';
import { Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function HomePage(){
  const [statistic, setStatistics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  let query = useQuery();
  const userId = query.get('userId');

  useEffect(() => {
    getStatistics(currentPage, userId).then(response => {
      setStatistics(response.statistics);
      setIsLoading(false);
    });
  }, [currentPage]);

  return (
    <Box>
      <Box  h={"25px"}/>
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {statistic.map((statistic) =>{
                return (
                  <Tr key={statistic.id}>
                    <Td>{statistic.name}</Td>
                    <Td>{statistic.value}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
      <Box h={10}/>
    </Box>
  );
}