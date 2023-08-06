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
  Tr, Badge, ButtonGroup, Button, Flex, Menu, MenuButton, MenuList, MenuItem, useToast,
} from '@chakra-ui/react';
import { getDonations, saveDonation, updateProfileBalance } from '../Service/amplifyService';
import { Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/all';
import { confirmPaymentIntent } from '../Service/stripeService';
import { Donation, DonationStatus } from '../models';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function TransactionsPage(){
  const [donations, setDonations] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [riskProfiles, setRiskProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonations, setTotalDonations] = useState(0);
  const navigate = useNavigate();
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let query = useQuery();
  const userId = query.get('userId');
  const status = query.get('status');
  let toast = useToast();

  useEffect(() => {
    getDonations(currentPage, userId, status).then(response => {
      setDonations(response.donations);
      setProfiles(response.profiles);
      setRiskProfiles(response.risk_profiles);
      setTotalPages(response.totalPages);
      setTotalDonations(response.totalDonations);
      setIsLoading(false);
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
  };

  const handleStatusChange = (status) => {
    navigate(`/transactions?status=${status}`);
    setIsLoading(true);
    getDonations(currentPage, userId, status).then(response => {
      setDonations(response.donations);
      setProfiles(response.profiles);
      setTotalPages(response.totalPages);
      setTotalDonations(response.totalDonations);
      setIsLoading(false);
    });
  }

  const acceptTransaction = (donation) => {
    confirmPaymentIntent(donation.payment_intent_id, donation.payment_method_id).then(response => {
      if (response.status === 200){
        saveDonation(
          Donation.copyOf(donation, updated => {
            updated.status = DonationStatus.COMPLETED
          })).then(_ => {
          updateProfileBalance(donation.user_id, donation.amount).then(_ => {
            toast({
              title: 'Transaction successfully confirmed.',
              status: 'info',
              duration: 5000,
              isClosable: true,
            });
          });

          setIsLoading(true);
          getDonations(currentPage, userId, status).then(response => {
            setDonations(response.donations);
            setProfiles(response.profiles);
            setTotalPages(response.totalPages);
            setTotalDonations(response.totalDonations);
            setIsLoading(false);
          });
        });
      } else {
        toast({
          title: response.message,
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  }

  const rejectTransaction = (donation) => {
    saveDonation(
      Donation.copyOf(donation, updated => {
        updated.status = DonationStatus.REJECTED
      }
      )).then(_ => {
      toast({
        title: 'Transaction successfully rejected.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(true);
      getDonations(currentPage, userId, status).then(response => {
        setDonations(response.donations);
        setProfiles(response.profiles);
        setTotalPages(response.totalPages);
        setTotalDonations(response.totalDonations);
        setIsLoading(false);
      });

    });
  }

  return (
    <Box>
      <Box  h={"25px"}/>
      <Text fontSize='2xl' as='b' >Transactions ({totalDonations})</Text>
      <Box h={"25px"}/>

      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        <Text fontSize='md' as='sb' color={'grey'} >Filter:</Text>
        <Box w={"20px"}/>
        <ButtonGroup>
          <Button
            variant={'outline'}
            colorScheme='blue'
            onClick={() => handleStatusChange('pending')}
          >Pending</Button>
          <Button
            variant={'outline'}
            colorScheme='green'
            onClick={() => handleStatusChange('completed')}
          >Completed</Button>
          <Button
            variant={'outline'}
            colorScheme='red'
            onClick={() => handleStatusChange('rejected')}
          >Rejected</Button>
        </ButtonGroup>
      </Box>

      <Box h={"25px"}/>

      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Amount (USD)</Th>
                <Th>Receiver</Th>
                <Th>Seon Score</Th>
                <Th>Radar Score</Th>
                <Th>Status</Th>
                <Th>Sent at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {donations.map((donation, i) => {
                const profile = profiles[i];
                const risk_profile = riskProfiles[i];
                return (
                  <Tr key={donation.id}>
                    <Td>{currencyFormatter.format(donation.amount)}</Td>
                    <Td>{profile.user_name} ({profile.display_name})</Td>
                    <Td>{donation.seon_score}</Td>
                    <Td> {risk_profile}</Td>
                    <Td>
                      <Badge
                        colorScheme={donation.status === 'COMPLETED' ? 'green' : 'red'}
                      >
                        {donation.status}
                      </Badge>
                    </Td>
                    <Td>{donation.createdAt}</Td>
                    <Td>
                      <Flex justifyContent="flex-end">
                        <Menu>
                          <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                            Actions
                          </MenuButton>
                          <MenuList>

                            {donation.status === 'PENDING' && (
                              <MenuItem colorScheme='red' onClick={
                                () => acceptTransaction(donation)
                              }>Accept Transaction</MenuItem>
                            )}

                            {donation.status === 'PENDING' && (
                              <MenuItem colorScheme='red' onClick={
                                () => rejectTransaction(donation)
                              }>Reject Transaction</MenuItem>
                            )}


                          </MenuList>
                        </Menu>
                      </Flex>
                    </Td>
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
