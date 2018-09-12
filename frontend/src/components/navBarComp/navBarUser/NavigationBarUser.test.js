import React from 'react'
import ReactDOM from 'react-dom'
import NavigationBarUser from './NavigationBarUser'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, NavigationBarUser, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})