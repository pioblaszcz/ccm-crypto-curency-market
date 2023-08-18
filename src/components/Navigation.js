import React, { useState } from 'react';

import coin from '../images/icons/coin.svg';
import uk from '../images/icons/uk.png';

const Navigation = () => {

    const [isMenuActive, setIsMenuActive] = useState(false)

    return (
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
                    onClick={() => setIsMenuActive(prev => !prev)}
                >
                    <span className="hamburger__box">
                        <span className="hamburger__inner"></span>
                    </span>
                </button>
            </div>
            <ul className={`naviagtion__list ${isMenuActive && 'naviagtion__list--active'}`}>
                <li>Prices</li>
                <li>Exchange</li>
            </ul>
        </div>
    );
};

export default Navigation;