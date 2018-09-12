import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import ModAccount from './ModAccount'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, ModAccount, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(ModAccount.prototype, 'componentDidMount')
    const wrapper = mount(<ModAccount 
                            showModal = {true} />)

    wrapper.setState({
        showModal: false,
        accountInfo: []
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()
})