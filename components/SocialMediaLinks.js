import * as React from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaDiscord, FaTwitter, FaEthereum } from 'react-icons/fa';

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant='ghost' color='gray.600' {...props}>
    <IconButton
      as='a'
      href='#'
      aria-label='Discord'
      icon={<FaDiscord fontSize='20px' />}
    />
    <IconButton
      as='a'
      href='#'
      aria-label='Twitter'
      icon={<FaTwitter fontSize='20px' />}
    />
    <IconButton
      as='a'
      href='#'
      aria-label='Etherscan'
      icon={<FaEthereum fontSize='20px' />}
    />
  </ButtonGroup>
);
