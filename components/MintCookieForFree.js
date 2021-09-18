import React, { useState, Fragment } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import Heading from './Heading';
import { contractAddress } from '../config';
import abi from '../contracts/abi.json';

const MintCookieForFree = () => {
  const [isMintFreeCookieLoading, setMintFreeCookieLoading] = useState(false);

  const mintCookieForFree = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transaction = await contract.mintCookieForFree({
      value: '',
    });
    await transaction.wait();
  };

  const handleMintFreeCookie = () => {
    setMintFreeCookieLoading(true);
    mintCookieForFree()
      .then(() => {
        setMintFreeCookieLoading(false);
      })
      .catch((error) => {
        setMintFreeCookieLoading(false);
        window.alert('Something went wrong. Have you already minted?');
      });
  };

  return (
    <Flex
      direction='column'
      justifyContent='space-between'
      align='center'
      p='10'
    >
      <Box>
        <Heading
          title={'Mint 1 (Free)'}
          subTitle={
            'The future can be even brighter but a goal without a plan is just a wish'
          }
        />
      </Box>
      <Button
        isLoading={isMintFreeCookieLoading}
        mt={'0.75em'}
        bg='orange.100'
        color='black'
        width='150px'
        px={6}
        height='50px'
        _hover={{
          bg: 'orange.50',
        }}
        onClick={handleMintFreeCookie}
      >
        Mint
      </Button>
    </Flex>
  );
};

export default MintCookieForFree;
