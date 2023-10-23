import React, { useState } from 'react';
import WeddingShopSingleItem from './WeddingShopSingleItem';

const WeddingShopHome = () => {
    const [detail, setDetail] = useState([]);
    return (
        <div>
            <WeddingShopSingleItem
            detail={detail}
            setDetail={setDetail}
            ></WeddingShopSingleItem>
        

        </div>
    );
};

export default WeddingShopHome;