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

    let positions = [];

    if (type === 'positions') {
        for (let pos in deposit) {
            if (deposit.hasOwnProperty(pos)) {
                if (pos.includes('O')) {
                    positions.push({
                        id: pos.slice(0, pos.indexOf('O')),
                        value: deposit[pos].value
                    })
                }
            }
        }
    }

    const positionsEL = positions && positions.map((pos, id) => {
        if (pos.value > 0) return (
            <div key={id} className="positions__position">
                <p className="position__id">{pos.id}</p>
                <p className="position__value">{pos.value.toFixed(3)}</p>
                <button className="position__close" onClick={() => handleConfirm('sellAll', pos.id, pos.value)}>close</button>
            </div>
        )
        return null;
    });

    useEffect(() => {
        modalRef.current.style.top = window.scrollY + 'px';
        document.body.style.overflow = 'hidden';

        return () => document.body.style.overflowY = 'visible';
    }, [modalRef]);

    const handleChangeInput = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }

    const handleConfirm = (type, nameToOperation = name, valueToSell = sellValue) => {
        const openPrice = nameToOperation + 'O';
        if (deposit.usd - 2 - (inputValue * coins[name].usd) < 0 && !isBought) {
            warningRef.current.innerHTML = warning;
            return;
        }
        if (type === 'buy') {
            setDeposit({
                ...deposit,
                usd: deposit.usd - (inputValue * coins[name].usd),
                [name]: deposit[name] ? parseFloat(deposit[name]) + parseFloat(inputValue) : parseFloat(inputValue),
                [openPrice]: deposit[openPrice] ?
                    {
                        price: (deposit[openPrice].price + coins[name].usd) / 2,
                        value: deposit[openPrice].value + parseFloat(inputValue),
                        spread: deposit[openPrice].spread - 2
                    }
                    : { price: coins[name].usd, value: parseFloat(inputValue), spread: -2 }
            })
            setIsBought(true);
            setTimeout(() => hide(), 2500);
        } else {
            setDeposit({
                ...deposit,
                usd: deposit.usd + valueToSell * coins[nameToOperation].usd + deposit[openPrice].spread,
                [nameToOperation]: deposit[nameToOperation] - valueToSell,
                [openPrice]: {
                    price: deposit[openPrice].value - valueToSell < 0 ? coins[nameToOperation].usd : deposit[openPrice].price,
                    value: deposit[openPrice].value - valueToSell < 0 ? 0 : deposit[openPrice].value - valueToSell,
                    spread: 0
                }
            })
            if (type !== 'sellAll') {
                setIsBought(true);
                setTimeout(() => hide(), 2500);
            }
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
            {(!deposit[name] || deposit[name] < 0) && !sellValue ?
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
    ) : <div className="modal__positions">
                {positionsEL}
            </div>;

    return (
        <div className="modalContainer" ref={modalRef}>
            <div className="modal">
                {!isBought && <button className="modal__close" onClick={hide}>
                    <img src={closemodal} alt="" />
                </button>}
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