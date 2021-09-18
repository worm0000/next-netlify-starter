import react, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  Center,
  Badge,
  HStack,
  Input,
} from '@chakra-ui/react';
import detectEthereumProvider from '@metamask/detect-provider';
import Container1 from '../components/Container';

import { contractAddress } from '../config';
import abi from '../contracts/abi.json';

export default function Home() {
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [price, setPrice] = useState('');
  const [priceInWei, setPriceInWei] = useState('');
  const [purchaseLimit, setPurchaseLimit] = useState('');
  const [supplyLeft, setSupplyLeft] = useState('');
  const [supplyTotal, setSupplyTotal] = useState('');
  const [formInput, updateFormInput] = useState('');
  const [instance, setContract] = useState();

  useEffect(() => {
    (async () => {
      await loadweb3();
      await loadBlockchain();
    })();
  }, []);

  const loadweb3 = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log('Ethereum successfully detected!');
      try {
        const account = await provider.request({
          method: 'eth_requestAccounts',
        });
        const chainId = await provider.request({
          method: 'eth_chainId',
        });
        console.log(account, chainId);
        if (chainId !== '0x1') {
          window.alert('Please switch network to Ethereum Mainnet');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      window.alert(
        'Provider not detected. Please install MetaMask to continue.'
      );
    }
    const web3 = new Web3(provider);
  };

  const loadBlockchain = async () => {
    const web3 = new Web3(window.ethereum);
    const instance = await new web3.eth.Contract(abi, contractAddress);
    const totalSupply = await instance.methods.MAX_NFT_PURCHASE.call();
    console.log(totalSupply);
    let iPrice = await instance.methods.NFT_PRICE.call();
    const iPriceInWei = iPrice;
    // iPrice = web3.utils.fromWei(iPrice, 'ether');
    // const iSupplyTotal = await instance.methods.MAX_NFT_PURCHASE().call();
    // const iPurchaseLimit = await instance.methods.PURCHASE_LIMIT().call();
    // const iPublicSupply = await instance.methods.totalPublicSupply().call();
    // const iGiftSupply = await instance.methods.totalGiftSupply().call();
    // const iSupplyLeft = iSupplyTotal - iPublicSupply - iGiftSupply;
    // console.log(purchaseLimit)
    // setContract(instance);
    // setPrice(iPrice);
    // setPriceInWei(iPriceInWei);
    // setPurchaseLimit(iPurchaseLimit);
    // setSupplyLeft(iSupplyLeft);
    // setSupplyTotal(iSupplyTotal);
    // setLoadingState('loaded');
    // console.log(iSupplyTotal);
  };

  async function purchase() {
    if (typeof window.ethereum !== 'undefined') {
      // await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const instance = new ethers.Contract(contractAddress, abi, signer);
      let quantity = formInput.quantity;
      let txValue = ethers.BigNumber.from(priceInWei).mul(quantity);
      const transaction = await instance.purchase(quantity, {
        value: txValue,
      });
      await transaction.wait();
    }
  }

  // async function requestAccount() {
  //   try {
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   } catch (error) {
  //     console.log('error');
  //     console.error(error);
  //     alert('Login to Metamask first');
  //   }
  // }

  return (
    <Container1>
      <Container maxW='3xl'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Make money from <br />
            <Text as={'span'} color={'purple.400'}>
              your audience
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Box>
            <Button
              colorScheme={'purple'}
              bg={'purple.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'purple.500',
              }}
              onClick={loadweb3}
            >
              Connect wallet
            </Button>
          </Box>
          <Box w='100%'>
            <Text fontSize='xl'>Price: {price} eth</Text>
            <Text fontSize='xl'>Purchase limit: </Text>
            <Text fontSize='xl'>supplyTotal</Text>
          </Box>
          <HStack spacing={8}>
            <Box p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='md'>
              <Heading fontSize='xl'>Plan</Heading>
              <Text mt={4}>
                The future can be even brighter but a goal without a plan is
                just a wish
              </Text>
              <Button
                mt={'0.75em'}
                colorScheme={'gray.500'}
                variant={'outline'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'gray.100',
                }}
              >
                Mint
              </Button>
            </Box>
            <Box p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='md'>
              <Heading fontSize='xl'>Money</Heading>
              <Text mt={4}>
                The future can be even brighter but a goal without a plan is
                just a wish
              </Text>
              <Input
                placeholder='No. of Token'
                size='lg'
                className='mt-8 border rounded p-4'
                onChange={(e) =>
                  updateFormInput({ ...formInput, quantity: e.target.value })
                }
              />
              <Button
                mt={'0.75em'}
                colorScheme={'green'}
                bg={'purple.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'purple.500',
                }}
                onClick={purchase}
              >
                Mint
              </Button>
            </Box>
          </HStack>
        </Stack>
      </Container>
    </Container1>
  );
}
// let test = await instance.PRICE(ethers.utils.formatBytes32String('string'))
// used to query, e.g. whitelist
