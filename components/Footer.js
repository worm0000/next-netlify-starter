import React from 'react';
import { Box, Center, Stack } from '@chakra-ui/layout';
import { Copyright } from './Copyright';

const Footer = () => {
  return (
    <Box as='footer' role='contentinfo' mx='auto' maxW='7xl' py='12'>
      <Center>
        <Copyright
          alignSelf={{
            base: 'center',
            sm: 'start',
          }}
        />
      </Center>
    </Box>
  );
};

export default Footer;
