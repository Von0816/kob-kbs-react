import { useNavigate } from 'react-router-dom';
import '../css/SearchItem.css'

function SearchItem(props) {
  const navigate = useNavigate();

  const searchItemOnClick = () => {

    navigate(`/entity/${props.entityRequestMapping}/${props.entityId}`);
  }

  return(
    <li className="search-item__entity" onClick={searchItemOnClick} key={props.entityId}>
        <span className='search-item__entity-tag'>{props.entityLabel}</span>
        <span className='search-item__entity-name'>{props.entityName}</span>
    </li>
  )

}

export default SearchItem;
