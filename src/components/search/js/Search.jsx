import { useEffect, useState, useRef } from "react";
import banner from '../img/banner.png';
import axios from 'axios';

import SearchItem from './SearchItem';
import "../css/Search.css"

const generateLabel = (label) => {
  if(label === "E52_TimeSpan") {
    return "E52 Time-span";
  }
  else if(label === "E22_HumanMadeObject") {
    return "E22 Human Made Object";
  }
  else {
    return label.replaceAll("_", " ");
  }
}

const generateRequestMapping = (label) => {
  switch (label) {
    case "E22_HumanMadeObject":
      return "e22-hmo";
    case "E52_TimeSpan":
      return "e52-time-span";
    default:
      return label.replaceAll("_", "-").toLowerCase();
  }
}

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const prevController = useRef();

  useEffect(() => {

    document.title = "Kuching Old Bazaar Knowledge-based System"
  }, [])

  useEffect(() => {
    if(prevController.current) {
      prevController.current.abort();
    }

    setSearchResult([]);
    
    search(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {

  }, [isLoading])

  const debounce = (func, timeout = 300) => {
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {func.apply(this, args); }, timeout);
    }
  }


  const search = async (searchKeyword) => {
    if(searchKeyword !== ""){
      const controller = new AbortController();

      prevController.current = controller;

      setIsLoading(true);
      try {
        //get all entity with matching name in search
        await axios.get(`/search?name=${searchKeyword}`, 
                  {headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY
                  }}, 
                  {signal: controller.signal})
          .then(response => {
            if (response.data.length === 0) {
              document.getElementById("search__search-box").classList.remove("has-data");
            }
            for(let entity of response.data) {
              setSearchResult(searchResult => [...searchResult, 
                <SearchItem 
                  key={entity.id} 
                  entityId={entity.id} 
                  entityLabel={generateLabel(entity.label)} 
                  entityRequestMapping={generateRequestMapping(entity.label)}  
                  entityName={entity.name}
                />])
            }
          })
          .catch((error) => {
            if(error.code !== "ERR_CANCELED") console.log(error)
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  }


  const searchOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    if(target.value === "") {
      document.getElementById("search__search-box").classList.remove("has-data");
      setSearchKeyword("");
    }
    else {
      document.getElementById("search__search-box").classList.add("has-data")
      saveKeyword(target);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  const saveKeyword = debounce((target) => setSearchKeyword(target.value));


  return(
    <>
      <img id="site-banner" src={banner} alt="site banner"/>
      <form id="search__search-form" onSubmit={submitHandler}>
        <input type="text" id="search__search-box" name="search__search-box" onChange={searchOnChange} placeholder="Search Kuching old bazaar history"/>
        <ul id='search-result__list'>
          {isLoading 
            ? [ <div key="skeleton-1" className='loading-skeleton'>
                  <div className='loading-skeleton__entity-label'></div>
                  <div className='loading-skeleton__entity-name'></div>
                </div>,
                <div key="skeleton-2" className='loading-skeleton'>
                  <div className='loading-skeleton__entity-label'></div>
                  <div className='loading-skeleton__entity-name'></div>
                </div>,
              ] 
            : searchResult}
        </ul>
      </form>
    </>
  )
}

export default Search;
