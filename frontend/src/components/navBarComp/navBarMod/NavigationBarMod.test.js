import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import NavigationBarMod from './NavigationBarMod'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, NavigationBarMod, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy1 = jest.spyOn(NavigationBarMod.prototype, 'handleLogOut')

    const wrapper = shallow(<NavigationBarMod
                            onLogOut = {() => {}} />)

    wrapper.instance().handleLogOut()
    expect(spy1).toHaveBeenCalled()
})