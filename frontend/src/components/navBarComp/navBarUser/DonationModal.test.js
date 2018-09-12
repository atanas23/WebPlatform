import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import DonationModal from './DonationModal'

it('renders without crashing', () => {
    expect(JSON.stringify(
        Object.assign({}, DonationModal, { _reactInternalInstance: 'censored' })
      )).toMatchSnapshot()
})

it('test all functions', () => {
    let spy = jest.spyOn(DonationModal.prototype, 'componentDidMount')
    const wrapper = mount(<DonationModal 
                            showModal = {true}
                            closeModal = {() => {}} />)

    wrapper.setState({
        showCharityInfo: false,
        donation: '15'
    })

    wrapper.instance().componentDidMount()
    expect(wrapper.state('showCharityInfo')).toEqual(true)

    const validate = wrapper.instance().validateDonation()
    expect(!isNaN(wrapper.state('donation')) && 
            wrapper.state('donation') > 0).toEqual(true)

    wrapper.instance().handleClose()
    expect(wrapper.state('showCharityInfo')).toEqual(false)

    wrapper.instance().handleShow()
    expect(wrapper.state('showCharityInfo')).toEqual(true)
})