import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, Home, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})
