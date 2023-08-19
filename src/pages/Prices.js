import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Trending from '../components/prices/Trending';
import TrendingNft from '../components/prices/TrendingNft';
import PriceList from '../components/prices/PriceList';

import find from '../images/icons/find.svg'
import bgcvid from '../images/bgc/bgcvid.mp4';

const Prices = () => {

    const [isNfts, setIsNfts] = useState(false)
    const [btcUsd, setBtcUsd] = useState(null);
    const [trendings, setTrendings] = useState(null);

    const coins = useSelector(store => store.app.coinsPrices);

    useEffect(() => {
        Promise.all([
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', { method: 'GET' }),
            fetch('https://api.coingecko.com/api/v3/search/trending', { method: 'GET' }),
        ])
            .then(([usdRate, trendings]) =>
                Promise.all([usdRate.json(), trendings.json()])
            )
            .then(([dataRate, dataTrendings]) => {
                setBtcUsd(dataRate.bitcoin.usd);
                setTrendings(dataTrendings);
            });
    }, []);

    const handleChangeTrendings = (e) => {
        if (e.target.value === 'nfts') setIsNfts(true);
        else setIsNfts(false);
    }

    const trendingsCoinEl = trendings && trendings.coins.map(({ item }) => <Trending key={item.id} item={item} btcUsd={btcUsd} />);
    const trendingNftsEl = trendings && trendings.nfts.map(nft => <TrendingNft key={nft.id} nft={nft} />);

    return (
        <div className="prices">
            <video className='prices__video' autoPlay loop muted>
                <source src={bgcvid} type='video/mp4' />
            </video>
            <div className="prices__trendings">
                <p className="trendings__title">
                    Trendings:
                    <select onChange={handleChangeTrendings}>
                        <option value="coins">Coins</option>
                        <option value="nfts">NFTs</option>
                    </select>
                </p>
                <div className="tredings__container">
                    {isNfts ? trendingNftsEl : trendingsCoinEl}
                </div>
            </div>
            <div className="prices__today">
                <p className="today__title">Today prices <img src={find} alt="" /></p>
                <PriceList coins={coins} />
            </div>
        </div>
    );
};

export default Prices;