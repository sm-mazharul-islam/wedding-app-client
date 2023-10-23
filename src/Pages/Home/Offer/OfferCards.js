import React from 'react';
import '../../../Pages/Home/InfoCards/Info.css'
const OfferCards = ({provide}) => {
    const { name , picture} = provide;
    return (
      <div >
        <div className="card-compact  w-auto bg-base-100 rounded-none mx-auto shadow-xl mt-8 p-2   ">
        <div className="card-body">
        <div className='trans2'>
      <img className='pic w-[100%]  h-[400px] object-cover 'src={picture}alt="Shoes" /> 
            </div>   
        </div>
      </div>
        <h2 className="card-title  bg-base-100 rounded-none  shadow-2xl -mt-10 p-4 w-[200px] relative mx-auto t2 ">
            <span className='mx-auto'>{name}</span></h2>
      
      </div>
    );
};

export default OfferCards;

