import * as React from 'react'
import './BottomBarItem.css'

export interface IBottomBarItemProps {
  value: string
  onChange?: any
  selected?: boolean
  icon: React.ReactNode
  label: string
}

function BottomBarItem({
  value,
  label,
  onChange,
  icon,
  selected,
}: IBottomBarItemProps) {
  let classes = 'item'
  if (selected) {
    classes += ' item-selected'
  }
  return (
    <button className={classes} onMouseDown={() => onChange(value)}>
      {icon}
      <p>{label}</p>
    </button>
  )
}

export default BottomBarItem
