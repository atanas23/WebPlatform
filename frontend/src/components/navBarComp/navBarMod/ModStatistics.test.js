import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import ModStatistics from './ModStatistics'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, ModStatistics, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(ModStatistics.prototype, 'componentDidMount')
    let spy1 = jest.spyOn(ModStatistics.prototype, 'createContent')
    const wrapper = mount(<ModStatistics 
                            showModal = {true} />)

    wrapper.setState({
        donationsByDay: [],
        donationsByPostCode: [],
        tabKey: 'donC'
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().handleSelect('postC')
    expect(wrapper.state('tabKey')).toEqual('postC')

    wrapper.instance().createContent('dC')
    expect(spy1).toHaveBeenCalled()

    wrapper.instance().createContent('pC')
    expect(spy1).toHaveBeenCalled()
})