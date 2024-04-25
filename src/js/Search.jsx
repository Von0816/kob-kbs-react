import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "../css/Search.css"

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Kuching Old Bazaar Knowledge-based System"
    console.log("useEffect executed");
  }, [])

  const search = (e) => {
    e.preventDefault();
    if(searchKeyword !== "") {
      navigate({
        pathname: "/search",
        search: createSearchParams({q: searchKeyword}).toString()
      })
    }
  }

  const searchOnChange = (e) => {
    const target = e.target;
    target.value === "" ? 
      document.getElementById("search-btn").classList.remove("active") 
      : 
      document.getElementById("search-btn").classList.add("active")
    setSearchKeyword(target.value);
  }

  return(
    <form id="search-form" onSubmit={search}>
      <input type="text" id="search-box" name="search-box" value={searchKeyword} onChange={searchOnChange} placeholder="Kuching old bazaar history"/>
      <button id="search-btn" type="submit">
        <svg id="search-icon" width="20" height="20" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M35.311 35.8465L51.9645 52.5M4 22.5C4 32.7173 12.2827 41 22.5 41C32.7173 41 41 32.7173 41 22.5C41 12.2827 32.7173 4 22.5 4C12.2827 4 4 12.2827 4 22.5Z" 
            strokeWidth="8" 
            strokeLinecap="round"/>
        </svg>
      </button>
    </form>
  )
}

export default Search;
