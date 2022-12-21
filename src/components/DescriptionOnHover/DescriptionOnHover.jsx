import './DescriptionOnHover.scss'

export default function DescriptionOnHover({position, description}) {
  return (
    <span className={`description-on-hover ${position}`}>
      <span>{description}</span>
    </span>
  )
}
