import React from 'react'
import ReactDOM from 'react-dom'
import Item from '../Item.tsx'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Item />, div)
})
