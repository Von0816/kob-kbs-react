import { useEffect, useState } from "react";
import banner from '../img/banner.png'

import SearchResult from './SearchResult.jsx'
import "../css/Search.css"

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {

    document.title = "Kuching Old Bazaar Knowledge-based System"
  }, [])

  const debounce = (func, timeout = 300) => {
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {func.apply(this, args); }, timeout);
    }
  }

  const searchOnChange = (e) => {
    const target = e.target;
    if(target.value === "") {
      setSearchKeyword("");
    }
    else {
      saveKeyword(target);
    }
  }

  const saveKeyword = debounce((target) => setSearchKeyword(target.value));


  return(
    <>
      <img id="site-banner" src={banner} alt="site banner"/>
      <form id="search__search-form">
        <input type="text" id="search__search-box" name="search__search-box" onChange={searchOnChange} placeholder="Search Kuching old bazaar history"/>
        <SearchResult searchKeyword={searchKeyword} />
      </form>
    </>
  )
}

export default Search;
