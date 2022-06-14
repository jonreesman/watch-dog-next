import React from 'react'
import { useMantineTheme, Card, Text } from '@mantine/core';
import styles from '../styles/Tweet.module.css'

const Tweet = ({tweet}) => {
  const theme = useMantineTheme();
  return (
    <div>
      <a href={tweet.PermanentURL} className={styles.link}>
        <Card shadow="sm" p="lg" style={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[4]}}>
          <Text>{tweet.Expression}</Text>
          <Text>Sentiment Score: {tweet.Polarity}</Text>
        </Card>
      </a>
    </div>
  )
}

export default Tweet