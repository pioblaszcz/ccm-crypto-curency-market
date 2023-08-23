import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeMenuOpen } from '../redux/actions/appActions';

import coin from '../images/icons/coin.svg';
import uk from '../images/icons/uk.png';

const Navigation = () => {

    const [isMenuActive, setIsMenuActive] = useState(false)

    const dispatch = useDispatch();

    const handleChangeActive = (isMenu) => {
        if (window.innerWidth < 1000) {
            dispatch(changeMenuOpen(!isMenuActive));
            setIsMenuActive(prev => !prev);
        }
        isMenu !== true && window.scrollTo(0, 0);
    }

    return (
        <div className="navigationBox">
            <div className="navigation">
                <div className="navigation__container">
                    <p className="navigation__logo">
                        <img src={coin} className="navigation__logo-img" alt="logo" />
                CCM.com
                <span></span>
                    </p>
                    <img src={uk} alt="changeLang" className="navigation__changeLanguage" />
                    <button
                        className={`navigation__hamburger ${isMenuActive && 'navigation__hamburger--active'}`}
                        onClick={() => handleChangeActive(true)}
                    >
                        <span className="hamburger__box">
                            <span className="hamburger__inner"></span>
                        </span>
                    </button>
                </div>
                <div className={`naviagtion__list ${isMenuActive && 'naviagtion__list--active'}`}>
                    <Link to='/' onClick={handleChangeActive}>Getting started</Link>
                    <Link to='/prices' onClick={handleChangeActive}>Prices</Link>
                    <Link to='/demo' onClick={handleChangeActive}>Demo platform</Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;