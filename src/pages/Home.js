import React, { useEffect, useState } from 'react';
import bgcvid from '../images/bgc/bgcvid.mp4';

const requestUrl = `https://api.coingecko.com/api/v3/search/trending`;

const Home = () => {

    const [trandingCoins, setTrandingCoins] = useState(null);
    const [trandingNFTS, setTrandingNFTS] = useState(null);

    useEffect(() => {
        fetch(requestUrl, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => setTrandingCoins(resp.coins))
            .catch(err => console.log(err))
    }, [])

    const coins = trandingCoins && trandingCoins.map(coin => console.log(coin.item))

    return (
        <div className="home">
            <video className='home__video' autoPlay loop muted>
                <source src={bgcvid} type='video/mp4' />
            </video>
            <h1 className="home__title">The World's Best Crypto Plaform</h1>
            <ul className="home__list">
                <li className="home__listElement"> This is a <span className="highlite">demo platform</span>, you don't need to invest <span className="highlite">anything</span></li>
                <li className="home__listElement"> You can check the <span className="highlite">current prices</span> in the cryptocurrency markets</li>
                <li className="home__listElement"> You can check your <span className="highlite">investment skills</span></li>
            </ul>
            <div className="home__trends">
                <p className="trends__title">Trendings 24h</p>
                {/* {coins} */}
            </div>
        </div>
    )
}

export default Home;