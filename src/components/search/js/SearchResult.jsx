import { lazy, useEffect, useRef, useState } from 'react'
import axios from 'axios';

import "../css/SearchResult.css"

const SearchItem = lazy(() => import('./SearchItem'));

const genererateLabel = (label) => {
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
      ;
  }
}

function SearchResult(props) {

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchKeyword = props.searchKeyword;
  const prevController = useRef();

  useEffect(() => {
    if(prevController.current) {
      prevController.current.abort();
    }

    setSearchResult(new Array());
    
    search(searchKeyword);
  }, [searchKeyword]);

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
                  entityLabel={genererateLabel(entity.label)} 
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

  return(
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
  )
}

export default SearchResult;
