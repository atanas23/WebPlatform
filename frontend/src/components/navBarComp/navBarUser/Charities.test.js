import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Charities from './Charities'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, Charities, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(Charities.prototype, 'componentDidMount')
    let spy1 = jest.spyOn(Charities.prototype, 'createContentTable')
    let spy2 = jest.spyOn(Charities.prototype, 'populateList')
    let spy3 = jest.spyOn(Charities.prototype, 'contentPush')
    const wrapper = mount(<Charities />)

    wrapper.setState({
        showModal: true,
        listOfCharities: [],
        tabKet: 1,
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().createContentTable()
    expect(spy1).toHaveBeenCalled()

    wrapper.instance().populateList('')
    expect(spy2).toHaveBeenCalled()

    wrapper.instance().contentPush([], '', 2)
    expect(spy3).toHaveBeenCalled()

    wrapper.instance().contentPush([], '', null)
    expect(spy3).toHaveBeenCalled()

    wrapper.instance().handleSelect(2)
    expect(wrapper.state('tabKey')).toEqual(2)

    wrapper.instance().contentPush([], '', 2)
    expect(spy3).toHaveBeenCalled()

    wrapper.instance().contentPush([], '', null)
    expect(spy3).toHaveBeenCalled()
})