import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import SignIn from './SignIn'


it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, SignIn, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy1 = jest.spyOn(SignIn.prototype, 'loginU')
    let spy2 = jest.spyOn(SignIn.prototype, 'loginM')
    
    const wrapper = mount(<SignIn 
        onLoginU = {() => {}} 
        onLoginM = {() => {}} />)
    
    wrapper.setState({
        showModal: true,
        email: 'atanas.harbaliev12@gmail.com',
        password: '123456789',
    })

    wrapper.instance().loginU()
    expect(spy1).toHaveBeenCalled()

    wrapper.instance().loginM()
    expect(spy2).toHaveBeenCalled()

    wrapper.instance().handleClose()
    expect(wrapper.state('showModal')).toEqual(false)

    wrapper.instance().handleShow()
    expect(wrapper.state('showModal')).toEqual(true)

    const validation = wrapper.instance().validateForm()
    expect(validation).toEqual(false)
})