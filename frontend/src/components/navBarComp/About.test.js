import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import About from './About'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, About, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    const wrapper = mount(<About />)

    wrapper.setState({
        showModal: true,
    })

    wrapper.instance().handleClose()
    expect(wrapper.state('showModal')).toEqual(false)

    wrapper.instance().handleShow()
    expect(wrapper.state('showModal')).toEqual(true)
})