import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Main from './Main'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, Main, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})