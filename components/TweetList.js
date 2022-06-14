import React from 'react'
import { Text, Container, Center, Loader, Grid } from '@mantine/core';
import Tweet from './Tweet'

const TweetList = ({tweets}) => {
  
  return (
    <Grid justify="center">
        {tweets.map((tweet) => {
            return (
            <Grid.Col key={tweet.ID} span={12}>
              <Tweet key={tweet.ID} tweet={tweet}/>
            </Grid.Col>
            )
        })}
    </Grid>
  )
}

export default TweetList