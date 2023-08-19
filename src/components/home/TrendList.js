
import btc from '../../images/coins/btc.svg';
import ltc from '../../images/coins/ltc.png';
import eth from '../../images/coins/eth.png';
import dog from '../../images/coins/dog.png';

const TrendList = ({ elements }) => {
    if (!elements) return;

    const { bitcoin, litecoin, ethereum, dogecoin } = elements;
    const btcprice = bitcoin.usd_24h_change.toFixed(2);
    const liteprice = litecoin.usd_24h_change.toFixed(2);
    const ethprice = ethereum.usd_24h_change.toFixed(2);
    const dogeprice = dogecoin.usd_24h_change.toFixed(2);

    return (
        <ul className="trends__list">
            <li>
                <img src={btc} alt="coin" />
                <p>Bitcoin <span>btc</span></p>
                <p className="list__price">${bitcoin.usd} <span className={`${btcprice < 0 && 'red'}`}> {btcprice}%</span></p>
            </li>
            <span className="list__break" />
            <li>
                <img src={ltc} alt="coin" />
                <p>Litecoin <span>ltc</span></p>
                <p className="list__price">${litecoin.usd} <span className={`${liteprice < 0 && 'red'}`}> {liteprice}%</span></p>
            </li>
            <span className="list__break" />
            <li>
                <img src={eth} alt="coin" />
                <p>Ethereum <span>eth</span></p>
                <p className="list__price">${ethereum.usd} <span className={`${ethprice < 0 && 'red'}`}> {ethprice}%</span></p>
            </li>
            <span className="list__break" />
            <li>
                <img src={dog} alt="coin" />
                <p>Dogecoin <span>doge</span></p>
                <p className="list__price">${dogecoin.usd.toFixed(4)} <span className={`${dogeprice < 0 && 'red'}`}> {dogeprice}%</span></p>
            </li>
        </ul>
    );
};

export default TrendList;