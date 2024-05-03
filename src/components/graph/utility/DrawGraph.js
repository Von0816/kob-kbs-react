import { MarkerType } from "reactflow";
import { monthToString } from "./util";

const drawE5EventGraph = (event) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const relCount = event.timeSpan.length + event.location.length + event.participantPerson.length + event.participantGroup;

  let i = 0;


  nodes.push({id: event.id, position: center, type: 'circle', data: {class: 'E5 Event', name: event.name, location: event.location, participantGroup: event.participantGroup, participantPerson: event.participantPerson, timeSpan: event.timeSpan}});

  event.location.forEach( (location) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: location.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E53 Place', name: location.name}});
    edges.push({  id: `${event.id} - ${location.id}`, 
                  source: event.id, 
                  target: location.id, 
                  data: {label: 'took place at'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  event.timeSpan.forEach( (timeSpan) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: timeSpan.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E52 Time-span', type: timeSpan.type, name: `${timeSpan.day} ${monthToString(timeSpan.month)} ${timeSpan.year}`, day: timeSpan.day, month: timeSpan.month, year: timeSpan.year, fallsWithin: timeSpan.fallsWithin}});
    edges.push({  id: `${event.id} - ${timeSpan.id}`, 
                  source: event.id, 
                  target: timeSpan.id, 
                  data: {label: 'falls within'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  event.participantGroup.forEach( (participantGroup) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: participantGroup.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E74 Group', name: participantGroup.name, member: participantGroup.member}});
    edges.push({  id: `${event.id} - ${participantGroup.id}`, 
                  source: event.id, 
                  target: participantGroup.id, 
                  data: {label: 'had participant'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  event.participantPerson.forEach( (participantPerson) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: participantPerson.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E21 Person', name: participantPerson.name, parent: participantPerson.parent, residence: participantPerson.residence, right: participantPerson.right}});
    edges.push({  id: `${event.id} - ${participantPerson.id}`, 
                  source: event.id, 
                  target: participantPerson.id, 
                  data: {label: 'had participant'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  return {nodes, edges};
}

const drawE21PersonGraph = (person) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const relCount = person.parent.length + person.residence.length + person.right.length;

  let i = 0;


  nodes.push({id: person.id, position: center, type: 'circle', data: {class: 'E21 Person', name: person.name, parent: person.parent, residence: person.residence, right: person.right}});

  person.parent.forEach( (parent) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: parent.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E21 Person', name: parent.name, parent: parent.parent, residence: parent.residence, right: parent.right}});
    edges.push({  id: `${person.id} - ${parent.id}`, 
                  source: person.id, 
                  target: parent.id, 
                  data: {label: 'has parent'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  person.residence.forEach( (residence) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: residence.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E53 Place', name: residence.name}});
    edges.push({  id: `${person.id} - ${residence.id}`, 
                  source: person.id, 
                  target: residence.id, 
                  data: {label: 'has current or former residence'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  person.right.forEach( (right) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: right.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E30 Right', name: right.name}});
    edges.push({  id: `${person.id} - ${right.id}`, 
                  source: person.id, 
                  target: right.id, 
                  data: {label: 'possesses'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  return {nodes, edges};
}

const drawE22HMOGraph = (hmo) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const relCount = hmo.currPermaLoc.length + hmo.currLoc.length + hmo.ownerPerson.length + hmo.ownerGroup;

  let i = 0;


  nodes.push({id: hmo.id, position: center, type: 'circle', data: {class: 'E22 Human Made Object', name: hmo.name, type: hmo.type, currLocation: hmo.currLoc, currPermaLocation: hmo.currPermaLoc, ownerGroup: hmo.ownerGroup, ownerPerson: hmo.ownerPerson}});

  hmo.currLoc.forEach( (currLoc) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: currLoc.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E53 Place', name: currLoc.name}});
    edges.push({  id: `${hmo.id} - ${currLoc.id}`, 
                  source: hmo.id, 
                  target: currLoc.id, 
                  data: {label: 'has current location'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  hmo.currPermaLoc.forEach( (currPermaLoc) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: currPermaLoc.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E53 Place', name: currPermaLoc.name}});
    edges.push({  id: `${hmo.id} - ${currPermaLoc.id}`, 
                  source: hmo.id, 
                  target: currPermaLoc.id, 
                  data: {label: 'has current permanent location'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  hmo.ownerGroup.forEach( (ownerGroup) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: ownerGroup.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E74 Group', name: ownerGroup.name, member: ownerGroup.member}});
    edges.push({  id: `${hmo.id} - ${ownerGroup.id}`, 
                  source: hmo.id, 
                  target: ownerGroup.id, 
                  data: {label: 'has former or current owner'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  hmo.ownerPerson.forEach( (ownerPerson) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: ownerPerson.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E21 Person', name: ownerPerson.name, parent: ownerPerson.parent, residence: ownerPerson.residence, right: ownerPerson.right}});
    edges.push({  id: `${hmo.id} - ${ownerPerson.id}`, 
                  source: hmo.id, 
                  target: ownerPerson.id, 
                  data: {label: 'has former or current owner'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  return {nodes, edges};
}

const drawE30RighGraph = (right) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};

  nodes.push({id: right.id, position: center, type: 'circle', data: {class: 'E30 Right', name: right.name}});

  return {nodes, edges}
}

const drawE52TimeSpanGraph = (timeSpan) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const relCount = timeSpan.fallsWithin.length;

  let i = 0;


  nodes.push({id: timeSpan.id, position: center, type: 'circle', data: {class: 'E52 Time-span', name: `${timeSpan.day} ${monthToString(timeSpan.month)} ${timeSpan.year}`, type: timeSpan.type, day: timeSpan.day, month: timeSpan.month, year: timeSpan.year}});

  timeSpan.fallsWithin.forEach( (fallsWithin) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: fallsWithin.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E52 Time-span', name: `${fallsWithin.day} ${monthToString(fallsWithin.month)} ${fallsWithin.year}`, fallsWithin: fallsWithin.fallsWithin}});
    edges.push({  id: `${timeSpan.id} - ${fallsWithin.id}`, 
                  source: timeSpan.id, 
                  target: fallsWithin.id, 
                  data: {label: 'has former or current owner'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  return {nodes, edges};
}

const drawE53PlaceGraph = (place) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};

  nodes.push({id: place.id, position: center, type: 'circle', data: {class: 'E53 Place', name: place.name}});

  return {nodes, edges};
}

const drawE74GroupGraph = (group) => {
  const nodes = [];
  const edges = [];
  const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const relCount = group.member.length;

  let i = 0;


  nodes.push({id: group.id, position: center, type: 'circle', data: {class: 'E74 Group', name: group.name, member: group.member}});

  group.member.forEach( (member) => {
    const degrees = i * (360 / relCount);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({  id: member.id, 
                  type: 'circle', 
                  position: { x, y},
                  data: {class: 'E21 Person', name: member.name, parent: member.parent, residence: member.residence, right: member.right}});
    edges.push({  id: `${group.id} - ${member.id}`, 
                  source: group.id, 
                  target: member.id, 
                  data: {label: 'has former or current owner'}, 
                  type: 'floating', 
                  markerEnd: {type: MarkerType.ArrowClosed}});
    i++;
  })

  return {nodes, edges};
}

export default function DrawGraph(entityClass, entity) {
  switch(entityClass) {
    case "e5-event":
      return drawE5EventGraph(entity);
    case "e21-person":
      return drawE21PersonGraph(entity);
    case "e22-hmo":
      return drawE22HMOGraph(entity);
    case "e30-right":
      return drawE30RighGraph(entity);
    case "e52-time-span":
      return drawE52TimeSpanGraph(entity);
    case "e53-place":
      return drawE53PlaceGraph(entity) 
    case "e74-group":
      return drawE74GroupGraph(entity);
    default:
      return {nodes: null, edges: null};
  }
}
