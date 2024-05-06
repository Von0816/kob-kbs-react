import { useEffect, useRef, useState } from 'react';
import '../css/EntityDetails.css'
import { monthToString } from '../utility/util';
import EntityProperty from './EntityProperty';
import EntityRelationship from './EntityRelationship';

export default function EntityDetails(props) {
  const propertiesButton = useRef();
  const relationshipButton = useRef();
  const [isProperties, setIsProperties] = useState(true);
  const entity = props.entity.data;

  useEffect(() => {
    propertiesButton.current = document.getElementById("entity-details__properties-button");
    relationshipButton.current = document.getElementById("entity-details__relationship-button");
  }, [])

  useEffect(() => {
    setIsProperties(true);
    relationshipButton.current.classList.remove("active")
    propertiesButton.current.classList.add("active")
  }, [entity])

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

  const generateTimeSpanName = (type, day, month, year) => {
    if(type === "date") {
      return `${day} ${monthToString(month)} ${year}}`
    }
    else {
      return `${year}`;
    }
  }

  const entityProperties = () => {
    if(entity.class === "E52 Time-span") {
      return(
        <div id='entity-details__properties' className='overflow-scroll'>
          <EntityProperty label="type" value={entity.type}/>
          {entity.day > 0 ? <EntityProperty label="day" value={entity.day}/> : null}
          {entity.month > 0 ? <EntityProperty label="month" value={monthToString(entity.month)}/> : null }
          <EntityProperty label="year" value={entity.year}/>
        </div>
      )
    }
    else if(entity.class === "E22 Human Made Object") {
      return(
        <div id='entity-details__properties' className='overflow-scroll'>
            <EntityProperty label="name" value={entity.name}/>
            <EntityProperty label="type" value={entity.type}/>
        </div>
      )
    }
    else {
      return(
        <div id='entity-details__properties' className='overflow-scroll'>
          <EntityProperty label="name" value={entity.name} />
        </div>
      )
    }
  }

  const entityRelationship = () => {
    switch(entity.label) {
      case "E5 Event":
        const timeSpanList = entity.timeSpan.map((timeSpan) => ({label: "E52 Time-span", requestMapping: "e52-time-span", name:  generateTimeSpanName(timeSpan.type, timeSpan.day, timeSpan.month, timeSpan.year),...timeSpan}));
        const participantList = [...entity.participantPerson.map((person) => ({label: "E21 Person", requestMapping: "e21-person", ...person})), ...entity.participantGroup.map((group) => ({label: "E74 Group", requestMapping: "e74-group", ...group}))];
      const locationList = entity.location.map((location) => ({label: "E53 Place", requestMapping: "e53-place", ...location}))

        return(
          <>
            <EntityRelationship data={{id: "P4", label: "has time-span", entityList: timeSpanList}}/>
            <EntityRelationship data={{id: "P7", label: "took place at", entityList: locationList}}/>
            <EntityRelationship data={{id: "P11", label: "had participant", entityList: participantList}}/>
          </>
        )
      case "E21 Person":
        const parentList = entity.parent.map((parent) => ({label: "E21 Person", requestMapping: "e21-person", ...parent}));
        const residenceList = entity.residence.map((residence) => ({label: "E53 Place", requestMapping: "e53-place", ...residence}));
        const rightList = entity.right.map((right) => ({label: "E30 Right", requestMapping: "e30-right", ...right}));

        return(
          <>
            <EntityRelationship data={{id: "P30", label: "possesses", entityList: rightList}}/>
            <EntityRelationship data={{id: "P51", label: "has current or former residence", entityList: residenceList}}/>
            <EntityRelationship data={{id: "P152", label: "has parent", entityList: parentList}}/>
          </>
        )
      case "E22 Human Made Object":
        const ownerList = [...entity.ownerPerson.map((person) => ({label: "E21 Person", requestMapping: "e21-person", ...person})), ...entity.ownerGroup.map((group) => ({label: "E74 Group", requestMapping: "e74-group", ...group}))];
        const currLocationList = entity.currLoc.map((location) => ({label: "E53 Place", requestMapping: "e53-place", ...location}));
        const currPermaLocationList = entity.currPermaLoc.map((location) => ({label: "E53 Place", requestMapping: "e53-place", ...location}))

        return(
          <>
            <EntityRelationship data={{id: "P51", label: "has current or former owner", entityList: ownerList}}/>
            <EntityRelationship data={{id: "P54", label: "has current permanent location", entityList: currPermaLocationList}}/>
            <EntityRelationship data={{id: "P55", label: "has current location", entityList: currLocationList}}/>
          </>
        )
      case "E52 Time-span":
        const fallsWithinList = entity.fallsWithin.map((timeSpan) => ({label: "E52 Time-span", requestMapping: "e52-time-span", name:  generateTimeSpanName(timeSpan.type, timeSpan.day, timeSpan.month, timeSpan.year), ...timeSpan}))

        return(
          <>
            <EntityRelationship data={{id: "P86", label: "falls within", entityList: fallsWithinList}}/>
          </>
        )
      case "74 Group":
        const memberList = entity.member.map((member) => ({label: "E21 Person", requestMapping: "e21-person", ...member}))

        return(
          <>
            <EntityRelationship data={{id: "P107", label: "has current or fomer member", entityList: memberList}}/>
          </>
        )
      default:
        return(
          <p>This entity has no relationship.</p>
        )
    }
  }

  return(
    <div id="entity-details">
      <button id='entity-details__close-button' onClick={closeOnClick}>X</button>
      <div id='entity-details__top-section'>
        <p id='entity-details__entity-label'>{entity.label} </p>
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
