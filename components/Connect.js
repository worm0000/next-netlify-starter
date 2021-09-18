import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

const Connect = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Box m={5} p='5' bg='orange.50' color='black' flex='1' rounded={'5'}>
      <Text fontSize='lg' mb='3'>
        Connect wallet to continue
      </Text>
      <Button
        colorScheme={'orange'}
        bg={'orange.200'}
        px={6}
        color='black'
        _hover={{
          bg: 'orange.300',
        }}
        onClick={handleClick}
      >
        Connect
      </Button>
    </Box>
  );
};

export default Connect;
