import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from './index'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, IndexPage, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

