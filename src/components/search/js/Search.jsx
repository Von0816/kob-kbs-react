import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import SearchResult from './SearchResult.jsx'
import "../css/Search.css"

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

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
      <form id="search-form">
        <input type="text" id="search-box" name="search-box" onChange={searchOnChange} placeholder="Kuching old bazaar history"/>
      </form>
      <SearchResult searchKeyword={searchKeyword} />
    </>
  )
}

export default Search;
