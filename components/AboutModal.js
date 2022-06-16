import React from 'react';
import { Text, Button, SimpleGrid } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

const AboutModal = () => {
  return (
    <>
    <Text>This project allows you to view the average public sentiment of different stocks 
        and cryptocurrency versus the price history.
    </Text>
    <Text>Due to many different API restrictions, 
        the project is only aware of tweets that occured while it was running (Twitter's API is 
        rather difficult to work with), and it can only pull the market history from 60 days prior 
        (Yahoo Finance).
    </Text>
    <Text></Text>
    <Text size="lg">Links to repositories:</Text>
      <SimpleGrid cols={2}>
        <Button 
          component="a"
          variant="light"
          leftIcon={<BrandGithub size={18} />}
          href="https://github.com/jonreesman/watch-dog-next"
          rel="noopener noreferrer"
          target="_blank"
        >
          Front-End
        </Button>
        <Button 
          component="a"
          variant="light"
          leftIcon={<BrandGithub size={18} />}  
          href="https://github.com/jonreesman/watch-dog-kafka"
          rel="noopener noreferrer"
          target="_blank"
        >
          Back-end
        </Button>
      </SimpleGrid>
    </>
  )
}

export default AboutModal;