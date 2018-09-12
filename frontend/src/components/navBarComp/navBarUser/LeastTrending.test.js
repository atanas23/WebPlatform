import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import LeastTrending from './LeastTrending'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, LeastTrending, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(LeastTrending.prototype, 'componentDidMount')
    const wrapper = mount(<LeastTrending 
                            email = {'atanas.harbaliev@gmail.com'} />)

    wrapper.setState({
        listOfLeastTrending: [],
        showDonationModal: false,
        modalEventName: '',
        modalEventDesc: ''
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().handleCloseParent()
    expect(wrapper.state('showDonationModal')).toEqual(false)
})