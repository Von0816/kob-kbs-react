import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controls, MiniMap, ReactFlow } from "reactflow";

function EntityDetails() {
  const [node, setNode] = useState([]);
  const [edge, setEdge] = useState([]);
  const {entityRequestMapping, entityId} = useParams();

  useEffect(() => {

    getEntity();
  }, [])

  const getEntity = async () => {

    await fetch(`${process.env.REACT_APP_API_URI}/${entityRequestMapping}/id/${entityId}`)
    .then(response => response.json())
    .then(entity => {
      document.title = entity.name
      setNode(node => [{id: entity.id, position: {x: 0, y: 0}, data: {label: entity.name}}]);
      entity.parent.forEach((parent) => {
        setNode(node => [...node, {id: parent.id, position: {x: 0, y: 100}, data: {label: parent.name}}]);
        setEdge(edge => [...edge, {id: `${entity.id} - ${parent.id}`, source: entity.id, target: parent.id}]);
      }) 
      entity.right.forEach((right) => {
        setNode(node => [...node, {id: right.id, position: {x: 200, y: 0}, data: {label: right.name}}]);
        setEdge(edge => [...edge, {id: `${entity.id} - ${right.id}`, source: entity.id, target: right.id}]);
      })
    })
  }
  

  return(
    <ReactFlow nodes={node} edges={edge}>
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

export default EntityDetails;
