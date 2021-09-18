import react, { Fragment, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Box, Flex } from '@chakra-ui/react';
import detectEthereumProvider from '@metamask/detect-provider';
import { contractAddress } from '../config';
import abi from '../contracts/abi.json';
import Connect from '../components/Connect';
import Group from '../components/Group';
import { GroupDetails } from '../constant/constant';
import BaseTemplate from '../components/Template';
import ConnectionDetails from '../components/ConnectionDetails';
import Heading from '../components/Heading';
import MintCookieForFree from '../components/MintCookieForFree';
import MintCookie from '../components/MintCookie';
import { Heading as ChakraHeading, Text } from '@chakra-ui/layout';
import Dragon from '../components/Dragon';
import CountDownTimer from '../components/CountdownTimer';

export default function Home() {
  const [isConnected, setConnected] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [data, setData] = useState(undefined);

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
        setAccount(account[0].substr(-4));
        console.log(account, chainId);
        //toChange
        if (chainId !== '0x4') {
          window.alert('Please switch network to Ethereum Mainnet');
        }
        setConnected(true);
      } catch (e) {
        console.error(e);
        setConnected(false);
      }
    } else {
      setConnected(false);
    }
    // const web3 = new Web3(provider);
  };

  const loadBlockchain = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = await new web3.eth.Contract(abi, contractAddress);
      const purchaseLimit = await contract.methods.MAX_NFT_PURCHASE().call();
      const supplyTotal = await contract.methods.MAX_SUPPLY().call();
      const price = await contract.methods.NFT_PRICE().call();
      const priceInEth = web3.utils.fromWei(price, 'ether');
      const supplyBought = await contract.methods.totalSupply().call();
      const supplyLeft = supplyTotal - supplyBought;

      const newData = {
        contract,
        purchaseLimit,
        supplyTotal,
        price,
        priceInEth,
        supplyLeft,
      };
      setData(newData);
    } catch (error) {
      setData(undefined);
    }
  };

  const renderDetails = () => {
    return (
      <Fragment>
        <ConnectionDetails {...(data || {})} account={account} />
        <Flex direction={{ base: 'column', md: 'row' }} spacing={8}>
          <MintCookieForFree />
          <MintCookie {...(data || {})} />
        </Flex>
      </Fragment>
    );
  };

  return (
    <BaseTemplate>
      <Flex
        direction='column'
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 20 }}
      >
        <ChakraHeading
          fontWeight={600}
          fontSize={{ base: '2xl', md: '4xl' }}
          lineHeight={'110%'}
          color='orange.300'
          pb='1'
        >
          Fortune Cookie Club
        </ChakraHeading>
        <Text>Dear Mortal, what do you need from me?</Text>
        {!isConnected && <Connect onClick={loadweb3} />}
        <Dragon />
        {isConnected && (
          <Box>
            <Group items={GroupDetails}>{renderDetails()}</Group>
          </Box>
        )}
      </Flex>
    </BaseTemplate>
  );
}
