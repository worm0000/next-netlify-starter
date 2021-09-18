import { Badge, Box, HStack, Text } from '@chakra-ui/layout';
import React, { Fragment } from 'react';

const ConnectionDetails = ({
  account,
  priceInEth,
  supplyLeft,
  supplyTotal,
}) => {
  return (
    <Fragment>
      {/* <Text>Price: {priceInEth} eth</Text> */}
      <HStack align='baseline' justifyContent='center'>
        <Text fontSize='3xl' pt='5'>
          {supplyLeft} / {supplyTotal}
        </Text>
        <Text fontSize='md'>left</Text>
      </HStack>
      <Badge>Connected: ..{account}</Badge>
    </Fragment>
  );
};

export default ConnectionDetails;
