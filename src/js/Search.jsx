import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import SearchResult from './SearchResult.jsx'
import "../css/Search.css"

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Kuching Old Bazaar Knowledge-based System"
    console.log("useEffect executed");
  }, [])

  const searchOnChange = (e) => {
    const target = e.target;
    setSearchKeyword(target.value);
  }

  return(
    <>
      <form id="search-form">
        <input type="text" id="search-box" name="search-box" value={searchKeyword} onChange={searchOnChange} placeholder="Kuching old bazaar history"/>
      </form>
      {searchKeyword === "" ? null : <SearchResult searchKeyword={searchKeyword} />}
    </>
  )
}

export default Search;
