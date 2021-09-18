import React, { useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/button';
import { Badge, Center, Flex, HStack, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import Heading from './Heading';
import { contractAddress } from '../config';
import abi from '../contracts/abi.json';
import { Box, Spacer } from '@chakra-ui/react';

const MintCookie = ({ purchaseLimit, price, priceInEth }) => {
  const [isMintCookieLoading, setMintCookieLoading] = useState(false);
  const [formInput, updateFormInput] = useState('');

  const handleInputChange = (e) => {
    if (parseInt(e.target.value) > (purchaseLimit || 0)) {
      e.target.value = `${purchaseLimit || 1}`;
    } else if (parseInt(e.target.value) <= 0) {
      e.target.value = '1';
    }
    updateFormInput({ ...formInput, quantity: e.target.value });
  };

  const mintCookie = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let quantity = formInput.quantity;
        let txValue = ethers.BigNumber.from(price).mul(quantity);
        console.log(txValue);
        const transaction = await contract.mintCookie(quantity, {
          value: txValue,
        });
        await transaction.wait();
        resolve(true);
      } catch (error) {
        if (error.code === 4001) {
          reject(false);
          window.alert('Transaction rejected');
        } else {
          reject(false);
          window.alert(
            'Something went wrong. Have you reached the mint limit?'
          );
        }
      }
    });
  };

  const handleMintCookie = () => {
    setMintCookieLoading(true);
    mintCookie()
      .then(() => {
        setMintCookieLoading(false);
      })
      .catch(() => {
        setMintCookieLoading(false);
      });
  };

  return (
    <Flex
      direction='column'
      justifyContent='space-between'
      align='center'
      p='10'
    >
      <Heading
        title={'Mint 1-20'}
        subTitle={
          'The future can be even brighter but a goal without a plan is just a wish'
        }
      />
      <Flex pt='1' pb='3' justifyContent='center'>
        <Text fontSize='sm' px='2'>
          <Badge>{purchaseLimit} cookies</Badge> per address
        </Text>
        <Text fontSize='sm' px='2'>
          <Badge>{priceInEth} eth</Badge> per cookie
        </Text>
      </Flex>
      <HStack>
        <Input
          placeholder='No. of Cookies'
          size='lg'
          height='50px'
          type='number'
          className='mt-8 border rounded p-4'
          onChange={handleInputChange}
          textAlign='center'
          fontWeight='700'
          width='150px'
        />
        <Button
          isLoading={isMintCookieLoading}
          mt={'0.75em'}
          colorScheme={'orange'}
          color='black'
          bg={'orange.300'}
          px={6}
          height='50px'
          _hover={{
            bg: 'orange.200',
          }}
          onClick={handleMintCookie}
          width='150px'
          disabled={
            !formInput || !formInput.quantity || formInput.quantity.length <= 0
          }
        >
          Mint
        </Button>
      </HStack>
    </Flex>
  );
};

export default MintCookie;
