import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import PriceList from '../components/prices/PriceList';
import DemoModal from '../components/demo/DemoModal';

import x from '../images/icons/x.png'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const colors = {
    bitcoin: {
        backgroundColor: '#bea339',
        borderColor: '#bea339'
    },
    cardano: {
        backgroundColor: '#0666b6',
        borderColor: '#013057'
    },
    dogecoin: {
        backgroundColor: '#232015',
        borderColor: '#bda239'
    },
    ethereum: {
        backgroundColor: '#6de0ee',
        borderColor: '#2b81cc'
    },
    litecoin: {
        backgroundColor: '#f5804b',
        borderColor: '#f45c32'
    },
    solana: {
        backgroundColor: '#a122d2',
        borderColor: '#82c2ff'
    },
    tether: {
        backgroundColor: '#fff',
        borderColor: '#26a69a'
    },
    tron: {
        backgroundColor: '#fff',
        borderColor: '#61baff'
    }
}

const Demo = () => {

    const coins = useSelector(store => store.app.coinsPrices);

    const [deposit, setDeposit] = useState(JSON.parse(window.localStorage.getItem('deposit')) ? JSON.parse(window.localStorage.getItem('deposit')) : { usd: 10000 });
    const [usd, setUsd] = useState(null);
    const [range, setRange] = useState(29);
    const [profit, setProfit] = useState(0);
    const [name, setName] = useState('bitcoin')
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [type, setType] = useState(null);

    const options = {
        responsive: true,
        aspectRatio: 3 / 2,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }

    useEffect(() => {
        let usdFromCoins = 0;
        let spread = 0;
        let benefit = 0;
        for (let coin in deposit) {
            if (deposit.hasOwnProperty(coin)) {
                if (coin !== 'usd' && !coin.includes('O') && coins) {
                    usdFromCoins += deposit[coin] * coins[coin].usd;
                }
                else if (coin.includes('O')) {
                    spread += deposit[coin].spread;
                    benefit += (coins && (coins[coin.slice(0, coin.indexOf('O'))].usd - deposit[coin].price) * deposit[coin].value) + deposit[coin].spread;
                }
            }
        }
        setProfit(benefit)
        window.localStorage.setItem('deposit', JSON.stringify(deposit));
        setUsd(usdFromCoins + deposit.usd + spread);
    }, [deposit, coins])

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=${range}&interval=daily`;

        fetch(url, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => {
                setData({
                    labels: resp.prices.map(price => moment.unix(price[0] / 1000).format('MM-DD')),
                    datasets: [
                        {
                            label: `${name.toUpperCase()}`,
                            data: resp.prices.map(price => price[1]),
                            borderColor: colors[name].borderColor,
                            backgroundColor: colors[name].backgroundColor,
                        },
                    ],
                })
            })
    }, [name, range])


    const handleShowModal = (type) => {
        setType(type);
        setShowModal(true)
    }

    return (
        <>
            {showModal && <DemoModal
                name={name}
                type={type}
                hide={() => setShowModal(false)}
                deposit={deposit}
                setDeposit={setDeposit}
            />}
            <div className="demo__container">
                <div className={`demo ${showModal && 'demo--blur'}`}>
                    <div className="demo__header">
                        <p className="header__logo">CCM</p>
                        <p className="header__deposit">
                            {usd ? usd.toFixed(2) : 10000} USD
                    <span className="deposit__profit">profit : <span className={profit < 0 ? 'red' : profit > 0 ? 'green' : ''}>${profit.toFixed(2)}</span></span>
                        </p>
                        <Link to="/"> <img src={x} alt="exit" /></Link>
                    </div>
                    {data &&
                        <div className="demo__chart-container">
                            <div className="demo__chart"><Line className="demo__chartInside" options={options} data={data} /></div>
                            <div className="demo__intervals">
                                <button onClick={() => setRange(1)}>1D</button>
                                <button onClick={() => setRange(6)}>7D</button>
                                <button onClick={() => setRange(29)}>30D</button>
                            </div>
                            <div className="demo__actions">
                                <button className="demo__buy" onClick={() => handleShowModal('buy')}>buy</button>
                                <button className="demo__sell" onClick={() => handleShowModal('sell')}>sell</button>
                                <button className="demo__positions" onClick={() => handleShowModal('positions')}>My positions</button>
                            </div>
                        </div>}
                    <PriceList coins={coins} click={setName} />
                </div>
            </div>

        </>
    );
};

export default Demo;