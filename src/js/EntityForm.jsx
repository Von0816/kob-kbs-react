import { useState } from "react";
import "../css/EntityForm.css" 

function EntityForm() {

  //component state
  const [entity, setEntity] = useState({type: "e5_event", name: "", date: {type: "date", year: "", month: null, day: null}, hmoType: "building"});
  const [maxDay, setMaxDay] = useState();

  //form submit handler
  async function submit(e) {
    e.preventDefault();
    
    let bodyData = null;

    switch(entity.type) {
      case "e52_time-span":
        bodyData = JSON.stringify({type: entity.date.type, year: entity.date.year, month: entity.date.month, day: entity.date.day});
        break;
      case "e22_human_made_object":
        bodyData = JSON.stringify({name: entity.name, type: entity.hmoType});
        break;
      default:
        bodyData = entity.name
        break;
    }

    await fetch(`${process.env.REACT_APP_API_URI}/` + entity.type, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData 
    }) 
    .then(response => {
      if(response.status === 201) {
        alert("Entity Created")
      }
    })
    .catch(error => alert(error))
  }

  //onChange handler
  const entityTypeOnChange = e => {
    const target = e.target;
    if(entity.type !== "e52_time-span") {
      document.getElementById("entity-name").classList.add("valid")
    }
    else {
      document.getElementById("time-span-year").classList.add("valid");
    }
    setEntity({type: target.value, name: "", date: {type: "date", year: "", month: null, day: null}, hmoType: "building"});
  }

  const entityNameOnChange = e => {
    const target = e.target;
    if (target.value === "") {
      document.getElementById("entity-name").classList.remove("valid");
    }
    else {
      document.getElementById("entity-name").classList.add("valid");
      setEntity({...entity, name: target.value});
    }
  }
  
  const timeSpanTypeOnChange = e => {
    const target = e.target;
    setEntity({...entity, date: {type: target.value, year: "", month: null, day: null}});
  }

  const timeSpanYearOnChange = e => {
    const target = e.target;
    let lastDay = new Date(target.value, entity.date.month === null ? 1 : entity.date.month , 0);
    setMaxDay(lastDay.getDate().toString());
    if (target.value === "") {
      document.getElementById("time-span-year").classList.remove("valid");
    }
    else {
      document.getElementById("time-span-year").classList.add("valid");
    setEntity({...entity, date: {...entity.date, year: target.value}});
    }
  }

  const timeSpanMonthOnChange = e => {
    const target = e.target;
    let lastDay = new Date(entity.date.year, target.value, 0);
    setMaxDay(lastDay.getDate().toString());
    setEntity({...entity, date: {...entity.date, month: target.value}});
  }

  const timeSpanDayOnChange = e => {
    const target = e.target;
    setEntity({...entity, date: {...entity.date, day: target.value}})
  }

  const hmoTypeOnChange = e => {
    const target = e.target;
    setEntity({...entity, hmoType: target.value})
  }

  //modular html element
  const entityName = 
    <div className="form-item valid" id="entity-name">
      <label className="input-label" id="entity-name-label">Name</label>
      <input className="form-input valid" type="text" name="entity-name-input" id="entity-name-input" onChange={entityNameOnChange} required/>
      <p className="input-error-msg" id="entity-name-error">Please enter entity name.</p>
    </div>

  const timeSpanMonth = 
      <div className="form-item" id="time-span-month">
        <label className="input-label" id="time-span-month-label">Month</label>
        <select className="form-input" id="time-span-month-dropdown" name="time-span-month-dropdown" onChange={timeSpanMonthOnChange}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

  const timeSpanDay = 
      <div className="form-item" id="time-span-day">
        <label className="input-label" id="time-span-day-label">Day</label>
        <input type="number" min="1" max={maxDay} id="time-span-day-input" name="time-span-day-input" className="form-input" onChange={timeSpanDayOnChange}/>
      </div>

  const timeSpan = 
    <div>
      <div className="form-item" id="time-span-type">
        <label className="input-label" id="time-span-type-label">Time-span Type</label>
        <select className="form-input" id="time-span-type-dropdown" name="time-span-type-dropdown" onChange={timeSpanTypeOnChange}>
          <option value="date">Date</option>
          <option value="decade">Decade</option>
          <option value="century">Century</option> 
        </select>
      </div>
      <div className="form-item valid" id="time-span-year">
        <label className="input-label" id="time-span-year-label">Year</label>
        <input className="form-input" type="number" min="0" max={new Date().getFullYear()} name="time-span-year-input" id="time-span-year-input" onChange={timeSpanYearOnChange}/>
        <p className="input-error-msg" id="time-span-year-error">Please enter year</p>
      </div>
      {entity.date.type === "date" ? timeSpanMonth : null}
      {entity.date.type === "date" ? timeSpanDay : null}
    </div>

  const hmoType = 
    <div className="form-item" id="hmo-type">
      <label className="input-label" id="hmo-type-label">HMO Type</label>
      <select className="form-input" id="hmo-type-dropdown" name="hmo-type-dropdown" value={entity.hmoType} onChange={hmoTypeOnChange} required>
        <option value="building">Building</option>
        <option value="scripture">Scripture</option>
      </select>
    </div>



  //return component
  return(
    <form id="create-entity-form">
      <div className="form-item" >
        <label className="input-label">Entity Type</label>
        <select className="form-input" id="entity-type-dropdown" value={entity.type} onChange={entityTypeOnChange}>
          <option value="e5_event">E5 Event</option>
          <option value="e21_person">E21 Person</option>
          <option value="e22_human_made_object">E22 Human Made Object</option>
          <option value="e30_right">E30 Right</option>
          <option value="e52_time-span">E52 Time-span</option>
          <option value="e53_place">E53 Place</option>
          <option value="e74_group">E74 Group</option>
        </select>
      </div>
      {entity.type === "e52_time-span" ? timeSpan : entityName}
      {entity.type === "e22_human_made_object" ? hmoType : null}
      <button id="form-submit-btn" onClick={submit}>Submit</button>
    </form>
  )
}

export default EntityForm;
