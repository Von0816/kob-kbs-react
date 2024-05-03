import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Controls, MiniMap, ReactFlow,  useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge" 
import FloatingConnectionLine from "../utility/FloatingConnectionLine"
import '../css/EntityGraph.css'
import { createE21PersonGraph, createE22HMO, createE5Event } from "../utility/util";
import axios from "axios";
import EntityDetails from "./EntityDetails";

export default function EntityGraph() {
  const [node, setNode, onNodeChange] = useNodesState([]);
  const [edge, setEdge, onEdgeChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState({});
  const {entityRequestMapping, entityId} = useParams();
  const nodeTypes = useMemo(() => ({circle: CustomNode}), []);
  const edgeType = useMemo(() => ({floating: FloatingEdge}), []);

  useEffect(() => {

    getEntity();
  }, []);

  useEffect(() => {

  }, [selectedNode]);

  const getEntity = async () => {

    axios.get(`${process.env.REACT_APP_API_URI}/${entityRequestMapping}/id/${entityId}`).then(response => {
      const entity = response.data;
      generateNodesAndEdges(entity);
      document.title = entity.name;

    })
  }

  const generateNodesAndEdges = (entity) => {
    switch(entityRequestMapping) {
      case "e5-event":
        {
          console.log(entity);
          const {nodes: generatedNodes, edges: generatedEdges} = createE5Event(entity);
          setNode(generatedNodes);
          setEdge(generatedEdges);
          break;
        }
      case "e21-person":
        {
          console.log(entity);
          const {nodes: generatedNodes, edges: generatedEdges} = createE21PersonGraph(entity);
          setNode(generatedNodes);
          setEdge(generatedEdges);
          break;
        }
      case "e22-hmo":
        {
          console.log(entity);
          const {nodes: generatedNodes, edges: generatedEdges} = createE22HMO(entity);
          setNode(generatedNodes);
          setEdge(generatedEdges);
          break;
        }
      case "e52-time-span":
        console.log(entity);
        break;
      case "e52-place":
        console.log(entity);
        break;
      case "e74-group":
        console.log(entity);
        break;
      default:
        return {nodes: null, edges: null};
    }
  }

  const onNodeClick = (e, node) => {
    setSelectedNode(selectedNode => ({...node}));
  }

  return(
    <ReactFlowProvider>
      <ReactFlow 
        nodes={node} 
        edges={edge} 
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onNodeClick={onNodeClick}
        edgeTypes={edgeType}
        connectionLineComponent={FloatingConnectionLine}
        fitView>
        {selectedNode.haske}
        {Object.keys(selectedNode).length === 0 ? null : <EntityDetails entity={selectedNode} setEntity={setSelectedNode} />}
        <Controls />
        <MiniMap />
      </ReactFlow>
    </ReactFlowProvider>
  )
}
