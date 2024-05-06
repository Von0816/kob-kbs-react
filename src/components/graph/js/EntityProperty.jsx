export default function EntityProperty(props) {

  return(
    <div className='entity-details__properties-item'>
      <p className='properties-item__label'>{props.label}</p>
      <p className='properties-item__content'>{props.value}</p>
    </div>
  )
}
