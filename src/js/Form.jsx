import { useState } from "react";

function Form() {

  const [entity, setEntity] = useState({type: "e5_event", name: ""});

  const change = (e) => {
    const target = e.target;
    setEntity({...entity, name: target.value});
  }

  async function submit(e) {
    e.preventDefault();
    await fetch("/" + entity.type, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: entity.name 
    }) 
  }

  return(
    <>
      <p>{entity.type}</p>
      <p>{entity.name}</p>
      <form>
        <select value={entity.type} onChange={e => setEntity({type: e.target.value, name: ""})}>
          <option value="e5_event">E5 Event</option>
          <option value="e21_person">E21 Person</option>
          <option value="e22_human_made_object">E22 Human Made Object</option>
          <option value="e30_right">E30 Right</option>
          <option value="e52_time_span">E52 Time-Span</option>
          <option value="e53_place">E53 Place</option>
          <option value="e74_group">E74 Group</option>
        </select>
        <input type="text" name="person-name" id="person-name" value={entity.name} onChange={change}/>
        <button onClick={submit}>Submit</button>
      </form>
    </>
  )

}

export default Form;
