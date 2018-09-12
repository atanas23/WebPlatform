import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import NavigationBar from './NavigationBar'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, NavigationBar, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    const wrapper = shallow(<NavigationBar 
                            onChangeEmail = {() => {}} />)

    wrapper.setState({
        loginUser: false,
        loginMod: false,
    })

    wrapper.instance().handleLoginU()
    expect(wrapper.state('loginUser')).toEqual(true)

    wrapper.instance().handleLoginM()
    expect(wrapper.state('loginMod')).toEqual(true)

    wrapper.instance().handleLogOut()
    expect(wrapper.state('loginUser')).toEqual(false)
    expect(wrapper.state('loginMod')).toEqual(false)
})