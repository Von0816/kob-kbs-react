import { useNavigate } from "react-router-dom";

import '../css/EntityRelationship.css'

export default function EntityRelationship(props) {
  const navigate = useNavigate();
  const rel = props.data;
  const entities = rel.entityList;

  const collapse = () => {
    document.getElementById(`entity-relationship__entity-list__${rel.id}`).classList.toggle("collapse");
    document.getElementById(`collapse-icon__${rel.id}`).classList.toggle("rotate90")
  }

  const entityOnClick = (entityRequestMapping, entityId) => {

    navigate(`/entity/${entityRequestMapping}/${entityId}`);
  }

  return(
          <div className='entity-relationship'>
            <span className='entity-relationship__label' onClick={collapse}>
              {rel.label} 
<svg className='entity-relationship__collapse-icon' id={`collapse-icon__${rel.id}`} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L0.803847 9.78799e-07L11.1962 7.02746e-08L6 9Z" fill="#212121"/>
</svg>
            </span>
            <ul className='entity-relationship__entity-list' id={`entity-relationship__entity-list__${rel.id}`}>
              {entities.length > 0 ?
                entities.map((entity) => { 
                  return(
                    <li key={entity.id} className='entity-list__entity' onClick={() => entityOnClick(entity.requestMapping,entity.id)}>
                      <span className='entity-list__entity-label'>{entity.label}</span>
                      <span className='entity-list__entity-name'>{entity.name}</span>
                    </li>
                )})
                : 
                <p className="empty-relationship-text">No related entity.</p>
              }
            </ul>
          </div>
  )
}
