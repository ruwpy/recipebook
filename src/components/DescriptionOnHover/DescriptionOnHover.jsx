import './DescriptionOnHover.scss'

export default function DescriptionOnHover({position, description}) {
  return (
    <span class={`description-on-hover ${position}`}>
      <span>{description}</span>
    </span>
  )
}
