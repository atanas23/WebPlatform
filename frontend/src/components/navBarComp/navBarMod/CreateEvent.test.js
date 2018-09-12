import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import CreateEvent from './CreateEvent'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, CreateEvent, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(CreateEvent.prototype, 'componentDidMount')
    const wrapper = mount(<CreateEvent 
                            showModal = {true}
                            closeModal = {() => {}} />)

    wrapper.setState({
        showModal: false,
        eventName: 'Test',
        eventDesc: 'test',
        eventLoc: 'London',
        eventLat: '12.123456',
        eventLong: '12.123456',
        eventTag: 'elderly'
    })

    wrapper.instance().componentDidMount()
    expect(wrapper.state('showModal')).toEqual(true)

    const validate = wrapper.instance().validateForm()
    expect(validate).toEqual(true)

    wrapper.instance().handleClose()
    expect(wrapper.state('showModal')).toEqual(false)

    wrapper.instance().handleShow()
    expect(wrapper.state('showModal')).toEqual(true)
})