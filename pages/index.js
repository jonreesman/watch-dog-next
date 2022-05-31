import Head from 'next/Head'
import TickerList from '../components/TickerList'
import Chart from '../components/Chart'
import IntervalList from '../components/IntervalList'
import TweetList from '../components/TweetList'
import styles from '../styles/Index.module.css'
import React, {useState, useEffect} from 'react'
import useTickers from '../hooks/useTickers';
import useTicker from '../hooks/useTicker';

export default function Home() {
  const [tickers_results, tickers_loading, tickers_fetched] = useTickers();
  const [ticker_result, ticker_loading, ticker_fetched, getTickerAPI] = useTicker();
  const [timeframe, setTimeframe] = useState("day")
  const [tickerID, setTickerID] = useState(1)
  const setTicker = (newId, time) => {
    if (newId != undefined) {
      setTickerID(newId)
    }
    if (time != undefined) {
      setTimeframe(time)
    }
  }

  useEffect(() => {
    getTickerAPI(tickerID, timeframe)
  },[timeframe, tickerID])

  if (tickers_loading) return <div>Loading...</div>;
  if (ticker_loading) return <div>Loading...</div>;
  if (!tickers_fetched && !tickers_loading) return <div>Unable to communicate with server.</div>;

  return (
    <div className={styles.container} style={{flexDirection: 'column'}}>
      <div className={styles.container}>
        <Head>
          <title>Watch-dog</title>
          <meta name='keywords' content='web dev, test' />
        </Head>
        <TickerList results={tickers_results} setTicker={setTicker}/>
        <Chart tickerResult={ticker_result} fetched={ticker_fetched} timeframe={timeframe} />
      </div>
      <IntervalList setTimeframe={setTimeframe}/>
      <TweetList tweets={ticker_result.statement_history}/>
    </div>
  )
}