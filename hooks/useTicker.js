import { useState } from 'react';
import watchdog from '../pages/api/watchdog';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [results, setResults] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState("")

    const getTickerAPI = async (id, interval) => {
        setLoading(true)
        try {
            console.log(`/tickers/${id}/time/${interval}`)
            const response = await watchdog.get(`/tickers/${id}/time/${interval}`, {});
            setResults(response.data)
            console.log(response.data)
            setLoading(false)
            setFetched(true)
        } catch (err) {
            setLoading(false)
            setError(err)
            console.log(err);
        }
    }
    return [results, loading, fetched, getTickerAPI]
};