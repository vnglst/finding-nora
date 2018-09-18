import React from 'react'
import ReactDOM from 'react-dom'
import GridItem from '../GridItem.tsx'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<GridItem />, div)
})
