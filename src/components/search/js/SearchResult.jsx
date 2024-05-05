import { useEffect, useRef, useState } from 'react'
import axios from 'axios';

import SearchItem from "./SearchItem";
import "../css/SearchResult.css"

function SearchResult(props) {

  const [searchResult, setSearchResult] = useState([]);

  const searchKeyword = props.searchKeyword;
  const prevController = useRef();

  useEffect(() => {
    if(prevController.current) {
      prevController.current.abort();
    }

    setSearchResult(searchResult => []);

    if(searchKeyword !== ""){
      const controller = new AbortController();

      prevController.current = controller;

      //get all entity with matching name in search
      axios.get("/search?name=" + searchKeyword, {signal: controller.signal})
        .then(response => {
          for(let entity of response.data) {
            setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass={entity.label} entityRequestMapping={entity.requestMapping} entityName={entity.name}/>])
        }
      })
        .catch((error) => {
          if(error.code !== "ERR_CANCELED") console.log(error)
        });


    }
  }, [searchKeyword]);

  useEffect(() => {
    if(searchResult.length > 0) {
      document.getElementById("search__search-box").classList.add("has-data");
    }
    else {
      document.getElementById("search__search-box").classList.remove("has-data");
    }
  }, [searchResult])

  return(
    <ul id='search-result__list'>
      {searchResult}
    </ul>
  )
}

export default SearchResult;
