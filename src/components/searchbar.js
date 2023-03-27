import { useState } from "react";

function SearchBar({sendSearch}) {
  const [search, setSearch] = useState('');
  const [click, setClick] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleClick = () => {
    setClick(search);
    setSearch('');
    sendSearch(search);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleClick();
    }
  }
  
  return(
    <div className="search-bar">
      <input className="search-bar__input" type="search" placeholder="Search by name or number" value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
      <button 
      className="search-bar__button" 
      onClick={handleClick}
      >Search</button>
    </div>
  )
}

export default SearchBar;