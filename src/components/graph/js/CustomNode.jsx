import { Handle, Position, useNodeId } from "reactflow";

import '../css/CustomNode.css'

export default function CustomNode({data}) {

  return(
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="24" fill="#D9D9D9">
        </circle>
      </svg>
      <p className="react-flow__entity-name">{data.name}</p>
    </div>
  );
}
