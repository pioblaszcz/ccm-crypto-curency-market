import React, { useState } from 'react';

import up from '../../images/icons/up.png';
import down from '../../images/icons/down.png';

import cardanoI from '../../images/coins/cardano.svg';
import bitcoinI from '../../images/coins/btc.svg';
import dogeI from '../../images/coins/dog.png';
import ethI from '../../images/coins/eth.png';
import litecoinI from '../../images/coins/ltc.png';
import solanaI from '../../images/coins/solana.svg';
import tetherI from '../../images/coins/tether.svg';
import tronI from '../../images/coins/tron.png';
import chart from '../../images/icons/chart.png';

const PriceList = ({ coins, click }) => {
    const [active, setActive] = useState('bitcoin');
    const classElement = click ? 'demo' : 'today';

    if (!coins) return;
    const { cardano, solana, tether, tron, bitcoin, litecoin, ethereum, dogecoin } = coins;

    return (
        <ul className={`${classElement}__list`}>
            <li onClick={() => { if (click) { click('bitcoin'); setActive('bitcoin') } }}>
                <img src={bitcoinI} alt="btc" className="list__logo" />
                <p className="lsit__name">
                    <span className="list__nameCoin">Bitcion{active === 'bitcoin' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span>
                    <span>BTC</span>
                </p>

                <p className="list__price">${bitcoin.usd}
                    <span className={`${bitcoin.usd_24h_change < 0 && 'red'}`}> {bitcoin.usd_24h_change.toFixed(2)}%
                    <img src={bitcoin.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('cardano'); setActive('cardano') } }}>
                <img src={cardanoI} alt="cardano" className="list__logo" />
                <p className="lsit__name">
                    <span className="list__nameCoin">Cardano{active === 'cardano' && click ? <img className="list__img" alt='chart' src={chart} /> : null}</span>
                    <span>ADA</span></p>
                <p className="list__price">${cardano.usd}
                    <span className={`${cardano.usd_24h_change < 0 && 'red'}`}> {cardano.usd_24h_change.toFixed(2)}%
                    <img src={cardano.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('dogecoin'); setActive('dogecoin') } }}>
                <img src={dogeI} alt="dogecoin" className="list__logo" />
                <p className="lsit__name">
                    <span className="list__nameCoin">Dogecoin{active === 'dogecoin' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span>
                    <span>DOGE</span></p>
                <p className="list__price">${dogecoin.usd}
                    <span className={`${dogecoin.usd_24h_change < 0 && 'red'}`}> {dogecoin.usd_24h_change.toFixed(2)}%
                    <img src={dogecoin.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('ethereum'); setActive('ethereum') } }}>
                <img src={ethI} alt="ethereum" className="list__logo" />
                <p className="lsit__name">
                    <span className="list__nameCoin">Etherum{active === 'ethereum' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span> <span>ETH</span></p>
                <p className="list__price">${ethereum.usd}
                    <span className={`${ethereum.usd_24h_change < 0 && 'red'}`}> {ethereum.usd_24h_change.toFixed(2)}%
                    <img src={ethereum.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('litecoin'); setActive('litecoin') } }}>
                <img src={litecoinI} alt="litecoin" className="list__logo" />
                <p className="lsit__name"><span className="list__nameCoin">Litecoin{active === 'litecoin' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span> <span>LTC</span></p>
                <p className="list__price">${litecoin.usd}
                    <span className={`${litecoin.usd_24h_change < 0 && 'red'}`}> {litecoin.usd_24h_change.toFixed(2)}%
                    <img src={litecoin.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('solana'); setActive('solana') } }}>
                <img src={solanaI} alt="solana" className="list__logo" />
                <p className="lsit__name"><span className="list__nameCoin">Solana{active === 'solana' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span>  <span>SOL</span></p>
                <p className="list__price">${solana.usd}
                    <span className={`${solana.usd_24h_change < 0 && 'red'}`}> {solana.usd_24h_change.toFixed(2)}%
                    <img src={solana.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('tether'); setActive('tether') } }}>
                <img src={tetherI} alt="tether" className="list__logo" />
                <p className="lsit__name"><span className="list__nameCoin">Tether{active === 'tether' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span> <span>USDt</span></p>
                <p className="list__price">${tether.usd}
                    <span className={`${tether.usd_24h_change < 0 && 'red'}`}> {tether.usd_24h_change.toFixed(2)}%
                    <img src={tether.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
            <span className={`${classElement}__stroke`} />
            <li onClick={() => { if (click) { click('tron'); setActive('tron') } }}>
                <img src={tronI} alt="tron" className="list__logo" />
                <p className="lsit__name"><span className="list__nameCoin">Tron{active === 'tron' && click ? <img className="list__img" src={chart} alt='chart' /> : null}</span> <span>TRX</span></p>
                <p className="list__price">${tron.usd}
                    <span className={`${tron.usd_24h_change < 0 && 'red'}`}> {tron.usd_24h_change.toFixed(2)}%
                    <img src={tron.usd_24h_change < 0 ? down : up} alt="up" className="price__direction" />
                    </span>
                </p>
            </li>
        </ul>
    );
};

export default PriceList;