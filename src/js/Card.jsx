import NeighbourNode from "./NeighbourNode.jsx";
import "../css/Card.css";

function Card(props) {
  return(
    <div className="card">
      <div className="entity-tag">{props.entityTag}</div>
      <div className="card-entity-details">
        <p className="entity-name">{props.name}</p>
      </div>
      <hr/>
      <div className="card-neighbour-node">
        <NeighbourNode name='test props'/>
      </div>
    </div>
  )
}

export default Card;
