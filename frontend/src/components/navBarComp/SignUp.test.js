import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import SignUp from './SignUp'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, SignUp, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    const wrapper = mount(<SignUp />)

    wrapper.setState({
        showModal: true,
        fName: 'Atanas',
        sName: 'Harbaliev',
        email: 'atanas.harbaliev12@gmail.com',
        password: '123456789',
        repassword: '123456789',
        postCode: 'B15 2QA',
        success: null
    })

    wrapper.instance().handleClose()
    expect(wrapper.state('showModal')).toEqual(false)

    wrapper.instance().handleShow()
    expect(wrapper.state('showModal')).toEqual(true)

    const validation = wrapper.instance().validateForm()
    expect(validation).toEqual(false)
})