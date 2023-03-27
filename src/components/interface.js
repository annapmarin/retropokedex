import PokeApi from "./pokeapi";
import SearchBar from "./searchbar";

function Interface() {
  return(
    <>
    <div className='container'>
      <div className='interface'>
        <div className='interface__camera'>
          <div className='interface__camera__border'>
            <div className='interface__camera__lens'>
              <div className='interface__camera__lens__bright'></div>
            </div>
          </div>
        </div>
        <div className='interface__display'>
          <div className='interface__display__detail'></div>
          <div className='interface__display__detail'></div>
          <div className='interface__display__info'>
            <PokeApi />
          </div>
        </div>
        <div className='interface__buttons'>
            <button className='interface__buttons__blue'></button>
            <button className='interface__buttons__green'></button>
            <button className='interface__buttons__orange'></button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Interface