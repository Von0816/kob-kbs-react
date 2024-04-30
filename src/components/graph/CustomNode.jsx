import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import './CustomNode.css'

const handleStyle = {left: 10};

export default function CustomNode({data}) {
  const onChange = useCallback(e => {
    console.log(e.target.value);
  }, [])

  return(
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="24.5" fill="#D9D9D9">
        </circle>
      </svg>
      <p className="entity-name">{data.label}</p>
    </div>
  );
}
