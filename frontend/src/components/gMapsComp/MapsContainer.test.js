import React from 'react'
import ReactDOM from 'react-dom'
import MapsContainer from './MapsContainer'

it('renders without crashing', () => {
expect(JSON.stringify(
    Object.assign({}, MapsContainer, { _reactInternalInstance: 'censored' })
    )).toMatchSnapshot()
})