import { useEffect, useRef } from 'react';
import '../css/EntityDetails.css'

export default function EntityDetails(props) {
  const propertiesButton = useRef();
  const relationshipButton = useRef();
  const entity = props.entity.data;

  useEffect(() => {
    propertiesButton.current = document.getElementById("entity-details__properties-button");
    relationshipButton.current = document.getElementById("entity-details__relationship-button");
  })

  const closeOnClick = () => {
    props.setEntity({});
  }

  const propertiesBtnOnclick = () => {
    relationshipButton.current.classList.remove("active")
    propertiesButton.current.classList.add("active")
  }

  const relationshipBtnOnClick = () => {
    propertiesButton.current.classList.remove("active")
    relationshipButton.current.classList.add("active")
  }

  const monthToString = (monthInt) => {
    switch(monthInt) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return null;
    }
  }

  const entityProperties = () => {
    if(entity.class === "E52 Time-span") {
      switch(entity.type){
        case "date":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
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
        case "decade":
          return(
            <div id='entity-details__properties' className='overflow-scroll'>
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

  return(
    <div id="entity-details">
      <button id='entity-details__close-button' onClick={closeOnClick}>X</button>
      <div id='entity-details__top-section'>
        <p id='entity-details__entity-class'>{entity.class} </p>
        <p id='entity-details__entity-name'>{entity.class === "E52 Time-span" ? `${entity.day} ${monthToString(entity.month)} ${entity.year}` : entity.name}</p>
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
      {entityProperties()}
    </div>
  )
}
