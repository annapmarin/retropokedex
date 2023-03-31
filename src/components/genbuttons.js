import React from "react"

export default function GenButtons({goTo1stGen, goTo2ndGen, goTo3rdGen, goTo4thGen, goTo5thGen, goTo6thGen, goTo7thGen, goTo8thGen, goTo9thGen}) {

  return(
    <div className='interface__buttons'>
      <button onClick={goTo1stGen} className='interface__buttons__blue'>1st</button>
      <button onClick={goTo2ndGen} className='interface__buttons__green'><p>2nd</p></button>
      <button onClick={goTo3rdGen} className='interface__buttons__orange'><p>3rd</p></button>
      <button onClick={goTo4thGen} className='interface__buttons__yellow'><p>4th</p></button>
      <button onClick={goTo5thGen} className='interface__buttons__cian'><p>5th</p></button>
      <button onClick={goTo6thGen} className='interface__buttons__white'><p>6th</p></button>
      <button onClick={goTo7thGen} className='interface__buttons__pink'><p>7th</p></button>
      <button onClick={goTo8thGen} className='interface__buttons__turquoise'><p>8th</p></button>
      <button onClick={goTo9thGen} className='interface__buttons__brown'><p>9th</p></button>
    </div>
  )
}