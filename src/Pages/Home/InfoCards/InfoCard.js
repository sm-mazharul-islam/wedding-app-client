import React from 'react';
import './Info.css'

const InfoCard = ({card}) => {
    const {name, description, image, date} =  card;
    return (
        <div className="card flex-col lg:flex-row card-side bg-base-100 w-106 m-2  ">
  
<div className='trans1'>

    <img src={image} style={{width:'100%'}} alt="Movie" className='pic'/>
    </div>
        <div className="card-body">
          <h2 className="t2 card-title">{name}</h2>
          <h2 className="t2 card-title">{description}</h2>
          <h2 className='t1'>{date}</h2>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div> */}
        

      
        </div>
      </div>
    );
};

export default InfoCard;
