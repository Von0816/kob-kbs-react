import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Controls, MiniMap, ReactFlow,  useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge" 
import FloatingConnectionLine from "../utility/FloatingConnectionLine"
import axios from "axios";
import EntityDetails from "./EntityDetails";
import DrawGraph from "../utility/DrawGraph";

import '../css/EntityGraph.css'
import 'reactflow/dist/style.css';

export default function EntityGraph() {
  const [node, setNode, onNodeChange] = useNodesState([]);
  const [edge, setEdge, onEdgeChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState({});
  const {entityRequestMapping, entityId} = useParams();
  const nodeTypes = useMemo(() => ({circle: CustomNode}), []);
  const edgeType = useMemo(() => ({floating: FloatingEdge}), []);

  useEffect(() => {
    getEntity();
  }, [entityRequestMapping, entityId]);

  const getEntity = async () => {

    axios.get(`/${entityRequestMapping}/id/${entityId}`).then(response => {
      const entity = response.data;

      const {nodes: generatedNodes, edges: generatedEdges} = DrawGraph(entityRequestMapping, entity);

      document.title = entity.name;

      setNode(generatedNodes);
      setEdge(generatedEdges);
      setSelectedNode({});
    })
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
        {Object.keys(selectedNode).length === 0 ? null : <EntityDetails entity={selectedNode} setEntity={setSelectedNode} />}
        <Controls />
        <MiniMap />
      </ReactFlow>
    </ReactFlowProvider>
  )
}
