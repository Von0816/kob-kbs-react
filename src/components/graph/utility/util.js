import { Position, MarkerType } from 'reactflow';

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.width / 2;
  const y1 = targetPosition.y + targetNode.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function monthToString(monthInt) {
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

export function createE5Event(event) {
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

export function createE21PersonGraph(person) {
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

export function createE22HMO(hmo) {
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
