import { useNavigate } from 'react-router-dom';
import '../css/SearchItem.css'

function SearchItem(props) {
  const navigate = useNavigate();

  const searchItemOnClick = (entityRequestMapping, entityId) => {

    navigate(`/entity/${entityRequestMapping}/${entityId}`);
  }

  return(
    <li className="search-list-item" onClick={() => searchItemOnClick(props.entityRequestMapping, props.entityId)} key={props.entityId}>
      <div>
        <span className='entity-tag'>{props.entityClass}</span>
        <span className='entity-name'>{props.entityName}</span>
      </div>
    </li>
  )

}

export default SearchItem;
