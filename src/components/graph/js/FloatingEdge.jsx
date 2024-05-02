import { useCallback } from 'react';
import { useStore, EdgeLabelRenderer, getStraightPath } from 'reactflow';
import { getEdgeParams } from '../utility/util';
import "../css/FloatingEdge.css" 

function FloatingEdge({ id, source, target, markerEnd, style, data}) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          className="nodrag nopan react-flow__edge-label"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
