import React from 'react';
import { Box, Container } from '@chakra-ui/layout';
import Header from './Header';
import Footer from './Footer';

export const BaseTemplate = ({ children }) => {
  return (
    <Container maxW='5xl'>
      {/* <Header /> */}
      {children}
      <Footer />
    </Container>
  );
};

export default BaseTemplate;
