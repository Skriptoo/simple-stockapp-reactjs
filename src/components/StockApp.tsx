import { useState } from "react";
import SearchBar from "./SearchBar";
import StockChart from "./StockChart";
export type Data = [number, number, number, number, number];
export type Volume = [number, number]


const StockApp = () => {

    const [currentSearch, setCurrentSearch] = useState('');
    const [data, setData] = useState<Data[]>([]);
    const [volume, setVolume] = useState<Volume[]>([]);
    const [symbol, setSymbol] = useState('');
    const chartTypes = ['Candlestick','OHLC','Line','Area','Column'] as const;
    const [type, setType] = useState<string>('Candlestick');
    const APIKEY = "RQYUSH0MVAP4US3M"
    const MINUTES = "15"

    const handleSearch = (arg: string) => {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${arg}&interval=${MINUTES}min&apikey=${APIKEY}`)
        .then(res => res.json())
        .then(res => {
            let resultKeys = Object.keys(res[`Time Series (${MINUTES}min)`]);
            let stockData: Data[] = [];
            let volumeData: Volume[] = [];
            resultKeys.forEach(key=>{
                let date = new Date(key);
                let resultData: Data = [
                    date.getTime(),
                        parseFloat(res[`Time Series (${MINUTES}min)`][key]['1. open']),
                        parseFloat(res[`Time Series (${MINUTES}min)`][key]['2. high']),
                        parseFloat(res[`Time Series (${MINUTES}min)`][key]['3. low']),
                        parseFloat(res[`Time Series (${MINUTES}min)`][key]['4. close'])
                ];
                let vData: Volume = [
                    date.getTime(),
                    parseInt(res[`Time Series (${MINUTES}min)`][key]['5. volume'])
                ];
                stockData.push(resultData);
                volumeData.push(vData);

            })
            setData(stockData.reverse());
            setVolume(volumeData.reverse());
            setSymbol(arg);
            setCurrentSearch(res)
        })
        .catch(err => console.error('error:' + err));

       
    }

    return (
        <div>
            <div>
                <SearchBar handleSearch={handleSearch}/>
                <select onChange={(e) => setType(e.target.value)}>
                    {chartTypes.map((e) => 
                        <option key={e}>{e}</option>
                    )}
                </select>
            </div>
            
            <StockChart currentCompany={currentSearch} data={data} volume={volume} symbol={symbol} type={type}/>
        </div>
    )
}

export default StockApp;