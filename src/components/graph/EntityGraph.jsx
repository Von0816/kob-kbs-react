import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Controls, MiniMap, ReactFlow, MarkerType, useNodesState, useEdgesState } from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge" 
import FloatingConnectionLine from "./FloatingConnectionLine"

import './EntityGraph.css'

export default function EntityGraph() {
  const [node, setNode, onNodeschange] = useNodesState([]);
  const [edge, setEdge, onEdgesChange] = useEdgesState([]);
  const {entityRequestMapping, entityId} = useParams();
  const nodeTypes = useMemo(() => ({circle: CustomNode}), []);
  const edgeType = useMemo(() => ({floating: FloatingEdge}), []);

  useEffect(() => {

    getEntity();
  }, [])

  const getEntity = async () => {

    await fetch(`/${entityRequestMapping}/id/${entityId}`)
    .then(response => response.json())
    .then(entity => {
      document.title = entity.name
      setNode(node => [{id: entity.id, type: 'circle', position: {x: 0, y: 0}, data: {label: entity.name}}]);
      entity.parent.forEach((parent) => {
        setNode(node => [...node, {id: parent.id, type: 'circle', position: {x: 0, y: 100}, data: {label: parent.name}}]);
        setEdge(edge => [...edge, {id: `${entity.id} - ${parent.id}`, source: entity.id, target: parent.id, label: 'has_parent', type: 'floating', markerEnd: {type: MarkerType.ArrowClosed}, animated: true}]);
      }) 
      entity.right.forEach((right) => {
        setNode(node => [...node, {id: right.id, type: 'circle', position: {x: 200, y: 0}, data: {label: right.name}}]);
        setEdge(edge => [...edge, {id: `${entity.id} - ${right.id}`, source: entity.id, target: right.id, type: 'floating', markerEnd: {type: MarkerType.ArrowClosed}, animated: true}]);
      })
    })
  }
  

  return(
    <ReactFlow 
      nodes={node} 
      edges={edge} 
      nodeTypes={nodeTypes}
      nodesConnectable={false}
      onNodesChange={onNodeschange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeType}
      connectionLineComponent={FloatingConnectionLine}>
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}
