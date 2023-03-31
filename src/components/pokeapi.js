import { useEffect, useState } from 'react';
import ImgNotFound from '../images/no-image-icon-15.png';
import nextImg from '../images/next.svg';
import SearchBar from './searchbar';
import MoreInfo from './moreinfo';
import GenButtons from './genbuttons';
import { typesImgs } from './typesimg';
import returnArrow from '../images/return-arrow.svg';

export default function PokeApi() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [num, setNum] = useState(1)
  const [notFound, setNotFound] = useState('')
  
  // Method 1 (set initial number & incrementing)
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
      setIsLoading(false)
    })
  }, [num])

  // Method 2.1 (searchbar -> verify if the string is a number id or a name. If it's a number, transform the string into a number and set it. If it's a name, call the function 'searchPokemonByName()').
  const handleSearch = (string) => {
    if (Math.floor(string) >= 1 || Math.floor(string) <= 1010) {
      setNum(Math.floor(string))
      setNotFound('')
    } else {
      searchPokemonByName(string)
    }
  }

  // Method 2.2 (searchbar -> it's a name, so filter the array to find the name and return the array where the name belongs, then map the returned array to access the URL and set the data and the number of the search)
  async function searchPokemonByName(string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1280`)
    let dataPkm = await response.json();
    let filteredArray = dataPkm.results.filter(element => element.name === string);
    
    if(filteredArray.length > 0) {
      let filteredURL = filteredArray.map(element => element.url);
      let stringURL = filteredURL.toString();
      const actualResponse = await fetch(stringURL);
      let actualData = await actualResponse.json();
      setNotFound('')
      setData(actualData);
      setNum(actualData.id);
      setIsLoading(false);
    
    } else if (filteredArray.length === 0) {
      setNotFound(string)
    }
  }

  // Method 2.3 -> Return to the pokemon list
    const returnToPkm = () => {
      setNotFound('');
      setNum(1);
    } 

  // Method 2.4 -> Not found
  if(notFound !== '') {
    return (
      <>
        <SearchBar sendSearch={handleSearch} />
        <div className='PokeApi'>
          <p>'{notFound}' was not found</p>
          <div className="info-pkm">
            <img className='info-pkm__image' src={ImgNotFound} />
            <button className='info-pkm__return'><img src={returnArrow} onClick={returnToPkm} /></button>

            <GenButtons 
        goTo1stGen={() => setNum(1)} 
        goTo2ndGen={() => setNum(152)} 
        goTo3rdGen={() => setNum(252)} 
        goTo4thGen={() => setNum(387)} 
        goTo5thGen={() => setNum(495)}
        goTo6thGen={() => setNum(650)}
        goTo7thGen={() => setNum(722)}
        goTo8thGen={() => setNum(810)}
        goTo9thGen={() => setNum(906)} />
          </div>
        </div>
      </>
    )
  }

  // Next Pokemon
  const nextPkm = () => {
    if(num <= 1010){
      setNum(num + 1);
    }
  }

  // Previous Pokemon
  const prevPkm = () => {
    if(num > 1) {
      setNum(num - 1);
  }
}

 // Show Pokemon data
  const PokemonData = (boolean) => {
    if (boolean === true) { // Closed window
      document.getElementById('pkmn-info').style.display = 'none';
    } else if (boolean === false) { // Opened window
      document.getElementById('pkmn-info').style.display = 'block';
    }
  }

  // Handle Type Image
    const handleImage = () => {
    for (let i = 0; i < typesImgs.length; i++) {
      if (typesImgs[i].name === data.types[0].type.name) {
        return typesImgs[i].image
     }
  }}

  const handleImage2 = () => {
    for (let i = 0; i < typesImgs.length; i++) {
      if (typesImgs[i].name === data.types[1].type.name) {
        return typesImgs[i].image
  }}}


  // Loading state
  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }


  return (
    <>
    <SearchBar sendSearch={handleSearch} />
    
    <div className="PokeApi">
      <h1>{data.name} - {data.id}</h1>
      <div className="info-pkm">
        <button className={num === 1 ? 'button-unactive' : 'prev'} onClick={prevPkm}> 
          <img src={nextImg} /> 
        </button>
        <img className='info-pkm__image' src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : (data.sprites.front_default ? data.sprites.front_default : ImgNotFound)} />
        <button className={num <= 1009 ? 'next' : 'button-unactive'} onClick={nextPkm}>
          <img src={nextImg} />
        </button>
    
      <MoreInfo sendClick={PokemonData} />
        <div id='pkmn-info' className='hidden more-info__data'>
        <p>Weight: {data.weight / 10}kg</p>
        <p>Height: {data.height * 10}cm</p>
        <p>Type:</p>
        <img className='more-info__data__type' src={handleImage()} />
        <img className='more-info__data__type' src={data.types[1] ? handleImage2() : ''} />
        </div>

      <GenButtons 
        goTo1stGen={() => setNum(1)} 
        goTo2ndGen={() => setNum(152)} 
        goTo3rdGen={() => setNum(252)} 
        goTo4thGen={() => setNum(387)} 
        goTo5thGen={() => setNum(495)}
        goTo6thGen={() => setNum(650)}
        goTo7thGen={() => setNum(722)}
        goTo8thGen={() => setNum(810)}
        goTo9thGen={() => setNum(906)} />
      </div>
    </div>
    </>
  )
}