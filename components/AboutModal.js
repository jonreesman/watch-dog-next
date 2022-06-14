import React from 'react';
import { Text } from '@mantine/core';

const AboutModal = () => {
  return (
    <>
    <Text>This project allows you to view the average public sentiment of different stocks 
        and cryptocurrency versus the price history.</Text>
    <Text>Due to many different API restrictions, 
        the project is only aware of tweets that occured while it was running (Twitter's API is 
        rather difficult to work with), and it can only pull the market history from 60 days prior 
        (Yahoo Finance).</Text>
    </>
  )
}

export default AboutModal;