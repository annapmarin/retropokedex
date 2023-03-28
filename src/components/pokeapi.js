import { useEffect, useState } from 'react';
import ImgNotFound from '../images/no-image-icon-15.png';
import nextImg from '../images/next.svg';
import SearchBar from './searchbar';

  // (x) TODO: return 'The pokemon XXXXX is not found' if the search is not found
  // () TODO: return a positive result if the search matches the beginning of the name, or if the search almost matches the name (RegEx)
  // () TODO: create buttons to jump faster into the pokemon generation the user is looking for
  // () TODO: create a '+ info' button and div(fetch data) to access the pokemon details

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

  // Loading state
  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Not found state
  if(notFound !== '') {
    return (
      <>
        <SearchBar sendSearch={handleSearch} />
        <div className='PokeApi'>
          <p>'{notFound}' was not found</p>
          <div className="info-pkm">
            <img className='info-pkm__image' src={ImgNotFound} />
          </div>
        </div>
      </>
    )
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
        <button className='next' onClick={nextPkm}>
          <img src={nextImg} />
        </button>
      {/* <div class="info-pkm__data">
        <p>Weight: {data.weight / 10}kg</p>
        <p>Height: {data.height * 10}cm</p>
      </div> */}
      </div>
    </div>
    </>
  )
}