import React, { useEffect } from 'react';
import WeddingShopSingleItemCard from './WeddingShopSingleItemCard';


const WeddingShopSingleItem = ({detail, setDetail}) => {


  useEffect(() => {
      fetch(`/weddingShopData.json`)
      .then(res => res.json())
      .then(data => setDetail(data))

  }, [])


    return (
        
      
        
          <div>
              {
                detail.map(single => 
                 (<WeddingShopSingleItemCard
                  key={single.id}
             single={single}
                  >
            </WeddingShopSingleItemCard>

                  ))
              }   
           </div>


    );
};

export default WeddingShopSingleItem;