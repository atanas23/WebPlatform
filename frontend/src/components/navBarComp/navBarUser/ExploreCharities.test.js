import React from 'react'
import ReactDOM from 'react-dom'
import ExploreCharities from './ExploreCharities'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, ExploreCharities, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})