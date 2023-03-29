import { useState } from "react";
import closeImg from '../images/closeimg.svg'

export default function MoreInfo({sendClick}) {
  const[moreInfo, setMoreInfo] = useState(false);

  let handleClick = () => {
    if (moreInfo === true) {
      setMoreInfo(false);
      sendClick(moreInfo);
    } else if (moreInfo === false){
      setMoreInfo(true);
      sendClick(moreInfo);
    }
  }

  if (moreInfo === true) {
    return (
        <div className='more-info__panel'>
          <img onClick={handleClick} className='more-info__close' src={closeImg} />
        </div>
    )
  }

  return(
    <div className='more-info'>
      <button onClick={handleClick} className='more-info__button' type='button'>+ info</button>
    </div>
  )
}