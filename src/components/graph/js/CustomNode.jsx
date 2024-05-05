import { Handle, Position } from "reactflow";

import '../css/CustomNode.css'

export default function CustomNode({data}) {

  return(
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="39.5">
        </circle>
      </svg>
      <span className="react-flow__entity-name">{data.name}</span>
    </div>
  );
}
