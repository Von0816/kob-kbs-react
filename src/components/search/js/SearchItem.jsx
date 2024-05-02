import { useNavigate } from 'react-router-dom';
import '../css/SearchItem.css'

function SearchItem(props) {
  const navigate = useNavigate();

  const searchItemOnClick = (entityRequestMapping, entityId) => {

    navigate(`/entity/${entityRequestMapping}/${entityId}`);
  }

  return(
    <li className="search-item__entity" onClick={() => searchItemOnClick(props.entityRequestMapping, props.entityId)} key={props.entityId}>
        <span className='search-item__entity-tag'>{props.entityClass}</span>
        <span className='search-item__entity-name'>{props.entityName}</span>
    </li>
  )

}

export default SearchItem;
