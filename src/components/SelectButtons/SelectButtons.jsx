import './SelectButtons.scss'

export default function SelectButtons({
  initialListOfItems, 
  listOfItems, 
  setListOfItems, 
  buttonSize, 
  isOnlyOneSelectable,
  item,
  setItem
}) {

  const selectMultiple = (id) => {
    const newListOfItems = listOfItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected
        }
      } else {
        return item
      }
    })

    setListOfItems(newListOfItems)
  }

  const selectSingle = (id) => {
    const newListOfItems = initialListOfItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected
        }
      } else {
        return item
      }
    })

    setListOfItems(newListOfItems)

    const singleItem = newListOfItems.filter(item => id === item.id)
    setItem(singleItem)
  }
  
  const handleSelect = (id) => {
    if(isOnlyOneSelectable) {
      selectSingle(id)
    } else {
      selectMultiple(id)
    }
  }

  return (
    <div className="selectbuttons">
      {
        listOfItems.map((item) => {
          return (
            <span 
              onClick={() => handleSelect(item.id)} 
              id={item.name}
              className={`selectbuttons__button ${item.selected ? 'selected' : ''} ${buttonSize === 'big' ? 'big' : ''}`}
              value={item.selected}
              key={item.name}
            >
              {item.name}
            </span>
          )
        })
      }
    </div>
  )
}
