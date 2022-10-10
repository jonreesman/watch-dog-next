import { useState } from 'react';
import watchdog from '../api/watchdog';

export default (): [any, boolean, boolean, (arg0: number, arg1: string) => Promise<void>] => {
    const [results, setResults] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);

    const getTickerAPI = async (id: number, interval: string) => {
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
            console.log(err);
        }
    }
    return [results, loading, fetched, getTickerAPI]
};