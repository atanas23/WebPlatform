import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import ModCharities from './ModCharities'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, ModCharities, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(ModCharities.prototype, 'componentDidMount')
    const wrapper = mount(<ModCharities 
                            showModal = {true} />)

    wrapper.setState({
        charitiesList: [],
        showModal: false
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().openCreateCharityEvent()
    expect(wrapper.state('showModal')).toEqual(true)

    wrapper.instance().handleCloseModal()
    expect(wrapper.state('showModal')).toEqual(false)
})