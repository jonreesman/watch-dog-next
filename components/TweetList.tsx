import React, { forwardRef, useState} from 'react'
import { Grid, Card, Group, Text, Space, Tooltip, Divider, Input, Button } from '@mantine/core';
import { IconHeart, IconRefresh, IconUsers, IconTrash, IconBrandTwitter } from "@tabler/icons";
import TweetSearch from './TweetSearch';

const SentimentAnalysisComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props}>
    <IconUsers size={20}/>
  </div>
));
const LikesComponent = forwardRef<HTMLDivElement>((props, ref,) => (
  <div ref={ref} {...props}>
     <IconHeart size={16}/>
  </div>
));
const RetweetsComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props}>
    <IconRefresh size={16} />
  </div>
));

const SpamComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props}>
    <IconTrash size={16} />
  </div>
));

const findOverlap = (tweet: string, queries: Array<string>) => {
  for (const query of queries) {
    if (tweet.includes(query)) {
      return true;
    }
  }
  return false;
}

const TweetList: React.FC<any> = ({tweets}) => {
  const [queryStrings, setQueryStrings] = useState<Array<string>>([]);
  const [queryString, setQueryString] = useState<string>("");
  return (
    <>
    <TweetSearch queryStrings={queryStrings} setQueryStrings={setQueryStrings} />
    <Grid grow justify="center">
        {tweets.map((tweet: any) => {
          if (!findOverlap(tweet.Expression, queryStrings) && queryStrings.length > 0) {
            console.log("no overlap with: ")
            console.log(queryStrings)
            return;
          }
          return (
            <Grid.Col key={tweet.ID} span={12}>
                <Card shadow="sm" p="lg" radius="sm" withBorder>
                    <a href={tweet.PermanentURL} style={{ height: "100%", width: "100%", textDecoration: "none"}}>
                      <Text color="dark">{tweet.Expression}</Text>
                    </a>
                    <Group spacing={0}>
                      <Tooltip label="Likes">
                        <LikesComponent/>
                      </Tooltip>
                      <Text>: {tweet.Likes}</Text>
                      <Space w="sm" />
                      <Divider orientation="vertical" />
                      <Space w="sm" />
                      <Tooltip label="Retweets">
                        <RetweetsComponent/>
                      </Tooltip>
                      <Text>: {tweet.Retweets}</Text>
                      <Space w="sm" />
                      <Divider orientation="vertical" />
                      <Space w="sm" />
                      <Tooltip label="Sentiment">
                        <SentimentAnalysisComponent/>
                      </Tooltip>
                      <Text>: {tweet.Polarity}</Text>
                      <Space w="sm" />
                      <Divider orientation="vertical" />
                      <Space w="sm" />
                      <Tooltip label="Spam Rating">
                        <SpamComponent/>
                      </Tooltip>
                      <Text>: {tweet.Spam ? "Spam" : "Not spam"}</Text>
                    </Group>
                </Card>
              </Grid.Col>
            )
          })}
    </Grid>
    </>
  )
}

export default TweetList