import React from 'react'
import ReactDOM from 'react-dom'
import MyDonations from './MyDonations'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, MyDonations, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})