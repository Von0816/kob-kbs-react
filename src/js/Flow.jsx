import { useEffect, useMemo } from "react";
import { Background, Controls, MiniMap, ReactFlow, MarkerType } from "reactflow";

import 'reactflow/dist/style.css';

function Flow() {

  useEffect(() => {

    document.title = "React Flow"
  }, [])

  const initialNodes = [
    {id: '1', type: 'textUpdater', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', type: 'textUpdater', position: {x: 0, y: 100}, data: {label: '2'}}
  ] 

  const initialEdges = [
    { id: 'e1-2', 
      source: '1', 
      target: '2', 
      markerEnd: {type: MarkerType.ArrowClosed},
      label: 'test'
    }
  ]

  return(
    <>
      <ReactFlow nodes={initialNodes} edges={initialEdges}  >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </>
  )
}

export default Flow;
