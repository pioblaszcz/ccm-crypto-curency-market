const Trending = ({ item, btcUsd }) => {
    return (
        <div className="trendings__element">
            <img src={item.small} alt="" />
            <p className="element__name">{item.name} <span>{item.symbol}</span> </p>
            <p className="element__price">${(item.price_btc * btcUsd).toFixed(2)}</p>
        </div>
    );
};

export default Trending;