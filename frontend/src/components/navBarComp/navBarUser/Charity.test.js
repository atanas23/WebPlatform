import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Charity from './Charity'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, Charity, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(Charity.prototype, 'componentDidMount')
    const wrapper = mount(<Charity />)

    wrapper.setState({
        charityData: [],
        showDonationModal: true,
        modalEventName: '',
        modalEventDesc: ''
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().handleCloseParent()
    expect(wrapper.state('showDonationModal')).toEqual(false)
})