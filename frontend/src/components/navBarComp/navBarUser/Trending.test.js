import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Trending from './Trending'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, Trending, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(Trending.prototype, 'componentDidMount')
    const wrapper = mount(<Trending 
                            email = {'atanas.harbaliev@gmail.com'} />)

    wrapper.setState({
        listOfTrending: [],
        showDonationModal: false,
        modalEventName: '',
        modalEventDesc: ''
    })

    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalled()

    wrapper.instance().handleCloseParent()
    expect(wrapper.state('showDonationModal')).toEqual(false)
})