import React from 'react'
import ReactDOM from 'react-dom'
import MapComp from './MapComp'

it('renders without crashing', () => {
expect(JSON.stringify(
    Object.assign({}, MapComp, { _reactInternalInstance: 'censored' })
    )).toMatchSnapshot()
})