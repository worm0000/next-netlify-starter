import { Button } from '@chakra-ui/button';
import { Box, SimpleGrid, Spacer, Text } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import CountDownTimer from './CountdownTimer';

const Group = ({ items, children }) => {
  const [selectedTab, setSelectedTab] = useState(undefined);
  const [selectedContent, setSelectedContent] = useState(undefined);
  const hoursMinSecs = { hours: 50, minutes: 20, seconds: 40 };

  React.useEffect(() => {
    if (selectedTab) {
      const { items } = selectedTab;
      const content = items[Math.floor(Math.random() * items.length)];
      setSelectedContent(content);
    } else {
      setSelectedContent(undefined);
    }
  }, [selectedTab]);

  const renderTabs = () => {
    return (
      <SimpleGrid columns={[1, 3, 3, 3]} spacing={[3, 5, 10, 10]}>
        {items.map((group) => {
          return (
            <Box key={group.heading}>
              <Button
                size='md'
                height={{ base: '50px', md: '75px' }}
                isFullWidth='true'
                background='orange.100'
                color='black'
                onClick={() => setSelectedTab(group)}
                _hover={{
                  bg: 'orange.50',
                }}
              >
                {group.heading}
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
    );
  };

  return (
    <Fragment>
      {!selectedTab && renderTabs()}
      {selectedContent && (
        <SlideFade in={true} offsetY='20px'>
          <Box p={5} bg='#2b2a27' borderRadius='5' flex='1'>
            <Text fontSize='lg'>
              I will give you a blessed fortune cookie to help you.
            </Text>
            <Text>The content of cookie will be revealed in</Text>
            <Text fontSize='2xl' pb='5'>
              <CountDownTimer hoursMinSecs={hoursMinSecs} />
            </Text>
            <Text as='i' fontSize='3xl'>
              &quot;{selectedContent}&quot;
            </Text>
          </Box>
          {children}
        </SlideFade>
      )}
    </Fragment>
  );
};

export default Group;
