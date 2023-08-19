import up from '../../images/icons/up.png'

const TrendingNft = ({ nft }) => {
    return (
        <div className="trendings__element">
            <img src={nft.thumb} alt="" />
            <p className="element__name">{nft.name} <span>{nft.symbol}</span> </p>
            <p className="element__priceNft">{nft.floor_price_24h_percentage_change.toFixed(2)}% <img src={up} alt="up" /></p>
        </div>
    );
};

export default TrendingNft;