import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Aos from 'aos';

import 'aos/dist/aos.css';

import TrendList from '../components/home/TrendList';

import bgcvid from '../images/bgc/bgcvid.mp4';
import phone from '../images/home/phone.png';

const Home = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const menuInfo = useSelector(store => store.app.isMenuOpen);
    const coins = useSelector(store => store.app.coinsPrices);

    return (
        <>
            <div className={`${menuInfo && 'blur'}`}>
                <div className='home'>
                    <video className='home__video' autoPlay loop muted>
                        <source src={bgcvid} type='video/mp4' />
                    </video>
                    <div className="home__title">
                        <p className="home__titleText">The World's Best Crypto Plaform</p>
                        <p className="home__titleText">The World's Best Crypto Plaform</p>
                    </div>
                    <ul className="home__list">
                        <li className="home__listElement"> This is a <span className="highlite">demo platform</span>, you don't need to invest <span className="highlite">anything</span></li>
                        <li className="home__listElement"> You can check the <span className="highlite">current prices</span> in the cryptocurrency markets</li>
                        <li className="home__listElement">Refreshing prices every <span className="highlite">5 minutes</span></li>
                    </ul>
                    <div className="home__trends">
                        <p className="trends__title">Poupular</p>
                        <TrendList elements={coins} />
                    </div>
                    <div className="home__demo">
                        <p className="demo__title">Try Our <span>Demo Platform</span></p>
                        <img src={phone} alt="phone" data-aos="flip-right" className="demo__phone" />
                        <Link to='/demo' className="demo__button"><button data-aos="fade-up ">click here</button></Link>
                    </div>
                    <div className="home__footer" >
                        <p>Designed by <span>piotrblaszczak.com</span> </p>
                        <p className="copy">&copy; 2023 </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;