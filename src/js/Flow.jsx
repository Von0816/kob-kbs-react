import { useEffect } from "react";
import { Background, Controls, MiniMap, ReactFlow } from "reactflow";

import 'reactflow/dist/style.css'

function Flow() {

  useEffect(() => {

    document.title = "React Flow"
  }, [])

  const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 0, y: 100}, data: {label: '2'}}
  ] 

  const initialEdges = [
    {id: 'e1-2', source: '1', target: '2', data: {label: 'test'}}
  ]

  return(
    <>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodesConnectable={false}>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </>
  )
}

export default Flow;
