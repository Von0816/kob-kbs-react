import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EntityDetails.css'
import { monthToString } from '../utility/util';

export default function EntityDetails(props) {
  const navigate = useNavigate();
  const propertiesButton = useRef();
  const relationshipButton = useRef();
  const [isProperties, setIsProperties] = useState(true);
  const entity = props.entity.data;

  useEffect(() => {
    propertiesButton.current = document.getElementById("entity-details__properties-button");
    relationshipButton.current = document.getElementById("entity-details__relationship-button");
  }, [])

  const closeOnClick = () => {
    props.setEntity({});
  }

  const propertiesBtnOnclick = () => {
    relationshipButton.current.classList.remove("active")
    propertiesButton.current.classList.add("active")
    setIsProperties(true);
  }

  const relationshipBtnOnClick = () => {
    propertiesButton.current.classList.remove("active")
    relationshipButton.current.classList.add("active")
    setIsProperties(false);
  }

  const entityProperties = () => {
    if(entity.class === "E52 Time-span") {
      switch(entity.type){
        case "date":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>type</p>
                <p className='properties-item__content'>{entity.type}</p>
              </div>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>day</p>
                <p className='properties-item__content'>{entity.day}</p>
              </div>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>month</p>
                <p className='properties-item__content'>{monthToString(entity.month)}</p>
              </div>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>year</p>
                <p className='properties-item__content'>{entity.year}</p>
              </div>
            </div>
          )
        case "year":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>type</p>
                <p className='properties-item__content'>{entity.type}</p>
              </div>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>year</p>
                <p className='properties-item__content'>{entity.year}</p>
              </div>
            </div>
          )
        case "decade":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>type</p>
                <p className='properties-item__content'>{entity.type}</p>
              </div>

              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>year</p>
                <p className='properties-item__content'>{entity.year}</p>
              </div>
            </div>
          )
        case "century":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>type</p>
                <p className='properties-item__content'>{entity.type}</p>
              </div>
              <div className='entity-details__properties-item'>
                <p className='properties-item__label'>year</p>
                <p className='properties-item__content'>{entity.year}</p>
              </div>
            </div>
          )
        default:
          break;
      }
    }
    else if(entity.class === "E22 Human Made Object") {
      return(
        <div id='entity-details__properties' className='overflow-scroll'>
          <div className='entity-details__properties-item'>
            <p className='properties-item__label'>name</p>
            <p className='properties-item__content'>{entity.name}</p>
          </div>
          <div className='entity-details__properties-item'>
            <p className='properties-item__label'>type</p>
            <p className='properties-item__content'>{entity.type}</p>
          </div>
        </div>
      )
    }
    else {
      return(
        <div id='entity-details__properties' className='overflow-scroll'>
          <div className='entity-details__properties-item'>
            <p className='properties-item__label'>name</p>
            <p className='properties-item__content'>{entity.name}</p>
          </div>
        </div>
      )
    }
  }

  const entityRelationship = () => {
    if(entity.class === "E21 Person") {
      const parentEl = [];
      const residenceEl = [];
      const rightEl = [];

      entity.parent.forEach((parent) => {
        parentEl.push(
        <div className='entity-list__entity' key={parent.id} onClick={() => entityListItemOnClick('e21-person', parent.id)}>
          <span className='entity-list__entity-class'>E21 Person</span>
          <span className='entity-list__entity-name'>{parent.name}</span>
        </div>
        )
      })

      entity.residence.forEach((residence) => {
        residenceEl.push(
        <div className='entity-list__entity' key={residence.id} onClick={() => entityListItemOnClick('e53-place', residence.id)}>
          <span className='entity-list__entity-class'>E53 Place</span>
          <span className='entity-list__entity-name'>{residence.name}</span>
        </div>
        )
      })

      entity.right.forEach((right) => {
        rightEl.push(
        <div className='entity-list__entity' key={right.id} onClick={() => entityListItemOnClick('e30-right', right.id)}>
          <span className='entity-list__entity-class'>E30 Right</span>
          <span className='entity-list__entity-name'>{right.name}</span>
        </div>
        )
      })

      return(
        <div>
          <div id='entity-relationship__p152'>
            <span className='entity-relationship__name'>has parent</span>
            <div className='entity-relationship__entity-list'>
              {parentEl}
            </div>
          </div>
          <div id='entity-relationship__p74'>
            <span className='entity-relationship__name'>has current or former residence</span>
            <div className='entity-relationship__entity-list'>
              {residenceEl}
            </div>
          </div>
          <div id='entity-relationship__p30'>
            <span className='entity-relationship__name'>possesses</span>
            <div className='entity-relationship__entity-list'>
              {rightEl}
            </div>
          </div>
        </div>
      )
    }
  }

  const entityListItemOnClick = (entityRequestMapping, entityId) => {

    navigate(`/entity/${entityRequestMapping}/${entityId}`);
  }

  return(
    <div id="entity-details">
      <button id='entity-details__close-button' onClick={closeOnClick}>X</button>
      <div id='entity-details__top-section'>
        <p id='entity-details__entity-class'>{entity.class} </p>
        <p id='entity-details__entity-name'>{entity.name}</p>
      </div>
      <hr id='entity-details__hr'/>
      <div id='entity-details__button-tab'>
        <button id='entity-details__properties-button' className='button-tab__button active' onClick={propertiesBtnOnclick}>
          <span className='button-tab__button-label'>Properties</span>
          <span className='button-tab__underline' />
        </button>
        <button id='entity-details__relationship-button' className='button-tab__button' onClick={relationshipBtnOnClick}>
          <span className='button-tab__button-label'>Relationship</span>
          <span className='button-tab__underline' />
        </button>
      </div>
      {isProperties ? entityProperties() : entityRelationship()}
    </div>
  )
}
