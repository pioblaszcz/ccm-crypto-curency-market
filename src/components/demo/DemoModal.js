import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import closemodal from '../../images/icons/closemodal.png'
import bought from '../../images/icons/bought.svg';
import sold from '../../images/icons/sold.svg';

const DemoModal = ({ type, hide, name, deposit, setDeposit }) => {

    const modalRef = useRef()
    const warningRef = useRef();

    const coins = useSelector(store => store.app.coinsPrices);

    const [inputValue, setInputValue] = useState((1000 / coins[name].usd).toFixed(4));
    const [isBought, setIsBought] = useState(false);
    const [sellValue, setSellValue] = useState(deposit[name] ? parseFloat(deposit[name]).toFixed(4) : null);

    const warning = `U dont have enough free money, your budget is: <span>${(deposit.usd - 2).toFixed(2)}$</span>`;

    useEffect(() => {
        modalRef.current.style.top = window.scrollY + 'px';
        document.body.style.overflow = 'hidden';

        return () => document.body.style.overflow = 'visible';
    }, [modalRef]);

    const handleChangeInput = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }

    const handleConfirm = (type) => {
        if (type === 'buy') {
            if (deposit.usd - 2 - (inputValue * coins[name].usd) < 0) {
                warningRef.current.innerHTML = warning;
                return;
            }
            setDeposit({
                ...deposit,
                usd: deposit.usd - 2 - (inputValue * coins[name].usd),
                [name]: deposit[name] ? parseFloat(deposit[name]) + parseFloat(inputValue) : inputValue
            })
            setIsBought(true);
            setTimeout(() => hide(), 2500);
        } else {
            setDeposit({
                ...deposit,
                usd: deposit.usd + sellValue * coins[name].usd,
                [name]: deposit[name] - sellValue
            })
            setIsBought(true);
            setTimeout(() => hide(), 2500);
        }
    }

    const handleChangeSell = (e) => {
        if (e.target.value > deposit[name] || e.target.value < 0) return;
        setSellValue(e.target.value)
    }

    const content = type === 'buy' ? (
        <div className={`modal__content ${isBought && 'modal__content--hide'}`}>
            <input
                type="number"
                min={0.0001}
                max={1000000 / coins[name].usd}
                value={inputValue}
                step={name === 'bitcoin' ? 0.01 : 0.1}
                onChange={handleChangeInput}
            />
            <p className="modal__price">{(inputValue * coins[name].usd).toFixed(2)}$</p>
            <button className={`modal__confirm ${type === 'buy' && 'modal__confirm--green'}`} onClick={() => handleConfirm('buy')}>confirm</button>
            <p className="modal__warn" ref={warningRef}></p>
        </div>
    ) : type === 'sell' ? (
        <div className={`modal__content ${isBought && 'modal__content--hide'}`}>
            {!deposit[name] || deposit[name] < 0 ?
                (<p className="modal__havePosition">
                    <span className="modal__warnSell" ref={warningRef}>
                        U dont have any <span className="warnSell__name">{name}</span>!
                </span>
                    <span>Buy it to sell it</span>
                </p>)
                :
                (
                    <div className="modal__sell">
                        <p>
                            <input type="number" value={sellValue} onChange={handleChangeSell} /> {name}
                        </p>
                        <span>for {(sellValue * coins[name].usd).toFixed(2)}$</span>
                        <button
                            className={`modal__confirm ${type === 'buy' && 'modal__confirm--green'}`} onClick={() => handleConfirm('sell')}>confirm</button>
                    </div>
                )
            }
        </div>
    ) : <div></div>;

    return (
        <div className="modalContainer" ref={modalRef}>
            <div className="modal">
                <button className="modal__close" onClick={hide}>
                    <img src={closemodal} alt="" />
                </button>
                <p className={
                    `modal__title 
                    ${type === 'buy' && 'modal__title--green'}
                    ${type === 'sell' && 'modal__title--red'}
                    `}>{type}</p>
                {isBought && <img src={type === 'buy' ? bought : sold} alt="bought" className="modal__bought" />}
                {content}
            </div>
        </div>
    );
};

export default DemoModal;