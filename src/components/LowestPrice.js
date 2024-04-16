import { useState, useEffect } from "react";
import worker_script from '../workers/worker';

const LowestPrice = () => {

    const [worker, setWorker] = useState(null);

    const [priceCount, setPriceCount] = useState(5000);
    const [sortedPrices, setSortedPrices] = useState(null);

    const [isFetching, setIsFetching] = useState(false);
    const [buttonText, setButtonText] = useState('Click to Get Lowest ETH price');

    useEffect(() => {
        const newWorker = new Worker(worker_script);

        newWorker.onmessage = function (event) {
            setSortedPrices(event.data);
            setIsFetching(false);
        };

        setWorker(newWorker);

        return () => {
            newWorker.terminate(); // Clean up the worker when component unmounts
        };
    }, []);

    useEffect(() => {
        if (isFetching) { setButtonText('Processing Price ...') }
        else {
            setButtonText('Fetch New Price');
        }
    }, [isFetching])

    const handleCountChange = (e) => {
        setPriceCount(e.target.value);
    }

    const handleClick = () => {
        if (worker) {
            setIsFetching(true);
            worker.postMessage(priceCount);
        }
    };

    return (
        <div className="flex flex-col items-center ">
            <div className="flex justify-center items-center">
                <p className="p-2">Input amount of prices you wish to fetch: </p>
                <input
                    className="text-sm mt-1 p-2 w-20 border rounded-md focus:outline-none focus:border-blue-500"
                    type="number"
                    id="numItemsInput"
                    value={priceCount}
                    onChange={handleCountChange}
                />
            </div>
            <div className="flex flex-col items-center">
                <p className="text-sm items-center">Lowest price in Ethereum: {sortedPrices ? sortedPrices[0]?.ethPrice.toFixed(6) : "Click to get lowest price"}</p>
                <button
                    className="mt-1 p-2 w-50 border border-gray-400 p-2 rounded-md items-center"
                    onClick={handleClick}>{buttonText}</button>
                <div className="text-xs">
                    {sortedPrices&&<p>Available Prices: </p>}
                    {sortedPrices?.map((pricePair, index) => {
                        return (<p key={index}>ETH price: {pricePair.ethPrice.toFixed(6)} USD, gas fee: {pricePair.gasFee.toFixed(6)}</p>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default LowestPrice;