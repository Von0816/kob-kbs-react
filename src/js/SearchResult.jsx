import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import SearchItem from "./SearchItem";
import "../css/SearchResult.css"

function SearchResult(props) {

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchKeyword = props.searchKeyword;
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    setIsLoading(true);

    controller.abort();

    document.getElementById("search-box").classList.add("has-data");

    setSearchResult(searchResult => []);

    search();

    console.log("useEffect executed");
  }, [searchKeyword]);

  useEffect(() => {

    if(searchResult.length === 0 || searchKeyword === "") document.getElementById("search-box").classList.remove("has-data")
  }, [isLoading, searchKeyword]);

  async function search() {

    setSearchResult([]);

    console.log("Querying neo4j...");

    //get all E5 Event with matching name in search
    await fetch("/e5_event/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="E5 Event" entityRequestMapping="e5_event" entityName={entity.name}/>])
      }
    });

    //get all E21 Person with matching name in search
    await fetch("/e21_person/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="E21 Person" entityRequestMapping="e21_person" entityName={entity.name}/>])
      }
    });

    //get all E22 HMO with matching name in search
    await fetch("/e22_human_made_object/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="E22 Human Made Object" entityRequestMapping="e22_human_made_object" entityName={entity.name}/>])
      }
    });

    //get all E22 HMO with matching type in search
    await fetch("/e22_human_made_object/type/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="E22 Human Made Object" entityRequestMapping="e22_human_made_object" entityName={entity.name}/>])
      }
    });

    //get all E30 Right with matching name in search
    await fetch("/e30_right/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="E30 Right" entityRequestMapping="e30_right" entityName={entity.name}/>])
      }
    });

    //get all E53 Place with matching name in search
    await fetch("/e53_place/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="e53_place" entityRequestMapping="e53_place" entityName={entity.name}/>])
      }
    });

    //get all E74 Group with matching name in search
    await fetch("/e74_group/name/" + searchKeyword, {signal}).then(response => response.json()).then(data => {
      for(let entity of data) {
        setSearchResult(searchResult => [...searchResult, <SearchItem key={entity.id} entityId={entity.id} entityClass="e74_group" entityRequestMapping="e74_group" entityName={entity.name}/>])
      }
    });

    setIsLoading(false);
    console.log("Query completed...");
  }


  return(
    <ul id='search-result-list'>
      {isLoading ? <div id="loading-text">Querying Neo4j...</div> : searchResult}
    </ul>
  )
}

export default SearchResult;
