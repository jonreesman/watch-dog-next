import React from 'react'
import { Aside, Center, Container, Loader, Text, MediaQuery, ScrollArea } from '@mantine/core';
import TweetList from '../components/TweetList'

const TweetAside = ({statement_history}) => {
    if (statement_history === undefined || statement_history === null) {
        return (
          <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
            <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Loader size="lg"/>
              <Text size="md">Loading tweets...</Text>
            </Center>
          </Container>
        )
      }
    return (
        <MediaQuery smallerThan="sm" styles={{ display: 'none'}}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300}}>
                <Center><Text>Tweets</Text></Center>
                <ScrollArea scrollbarSize={2}>
                    <TweetList tweets={statement_history}/>
                </ScrollArea>
            </Aside>
        </MediaQuery>
  )
}

export default TweetAside