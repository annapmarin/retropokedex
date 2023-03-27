import { useEffect, useState } from 'react';
import noFound from '../images/no-image-icon-15.png';
import nextImg from '../images/next.svg';
import SearchBar from './searchbar';

  // TODO: return a error404 page result if the search is not found
  // TODO: return a result if the search matches the beginning of the name, or if the search almost matches the name (RegEx)
  // TODO: create buttons to jump faster into the pokemon generation the user is looking for
  // TODO: create a '+ info' button to access the pokemon details

export default function PokeApi() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [num, setNum] = useState(1)
  
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
    } else {
      searchPokemonByName(string)
    }
  }

  // Method 2.2 (searchbar -> it's a name, so filter array to find the name and return the result, then map the returned array to access the URL and set the data and the number of the search)
  async function searchPokemonByName(string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1280`)
    let data = await response.json();
    let filteredArray = data.results.filter(element => element.name === string);

    let filteredURL = filteredArray.map(element => element.url)
    let stringURL = filteredURL.toString();
    const actualResponse = await fetch(stringURL);
    let actualData = await actualResponse.json();
    
    setData(actualData);
    setNum(actualData.id)
    
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
        <img className='info-pkm__image' src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : (data.sprites.front_default ? data.sprites.front_default : noFound)} />
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