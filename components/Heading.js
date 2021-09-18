import React, { Fragment } from 'react';
import { Heading as ChakraHeading, Text } from '@chakra-ui/layout';

const Heading = ({ title, subTitle }) => {
  return (
    <Fragment>
      <ChakraHeading fontSize='3xl'>{title}</ChakraHeading>
      <Text mt={4}>{subTitle}</Text>
    </Fragment>
  );
};

export default Heading;
