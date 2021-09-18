import React from 'react';
import { Button, Flex, Box, Stack, Image } from '@chakra-ui/react';
import NextLink from 'next/link';

import styled from '@emotion/styled';

import { Copyright } from './Copyright';
import { Logo } from './Logo';
import { SocialMediaLinks } from './SocialMediaLinks';

const Container1 = ({ children }) => {
  const StickNav = styled(Flex)`
        position: sticky;
        z-index: 10,
        top: 0;
        backdrop-filter: saturate(180%) blur(20px);
        transition: height .5s, line-height: .5s;
    `;

  return (
    <>
      {/* <StickNav
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        maxWidth='800px'
        minWidth='356px'
        width='100%'
        as='nav'
        px={[2, 6, 6]}
        py={2}
        mt={8}
        mb={[0, 0, 8]}
        mx='auto'
      >
        <Box>
          <NextLink href='/' passHref>
            <Button
              as='a'
              variant='ghost'
              p={(1, 2, 4)}
              _hover={{ backgroundColor: 'gray.100' }}
            >
              Home
            </Button>
          </NextLink>
          <NextLink href='/whitelist' passHref>
            <Button
              as='a'
              variant='ghost'
              p={(1, 2, 4)}
              _hover={{ backgroundColor: 'gray.100' }}
            >
              Whitelist
            </Button>
          </NextLink>
        </Box>
      </StickNav> */}
      <Flex
        as='main'
        justifyContent='center'
        flexDirection='column'
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        {children}
      </Flex>

      <Box
        as='footer'
        role='contentinfo'
        mx='auto'
        maxW='7xl'
        py='12'
        px={{
          base: '4',
          md: '8',
        }}
      >
        <Stack
          direction='row'
          spacing='4'
          align='center'
          justify='space-between'
        >
          <Copyright
            alignSelf={{
              base: 'center',
              sm: 'start',
            }}
          />
          <SocialMediaLinks />
        </Stack>
      </Box>
    </>
  );
};

export default Container1;
