import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import NavigationBarOff from './NavigationBarOff'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, NavigationBarOff, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy1 = jest.spyOn(NavigationBarOff.prototype, 'handleLoginU')
    let spy2 = jest.spyOn(NavigationBarOff.prototype, 'handleLoginM')
    const wrapper = shallow(<NavigationBarOff
                            onLoginU = {() => {}} 
                            onLoginM = {() => {}}/>)

    wrapper.instance().handleLoginU()
    expect(spy1).toHaveBeenCalled()

    wrapper.instance().handleLoginM()
    expect(spy2).toHaveBeenCalled()
})