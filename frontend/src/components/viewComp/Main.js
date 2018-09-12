import React from 'react'
import { Switch } from 'react-router-dom'
import Route from 'react-router-dom/Route'

import MapsContainer from '../gMapsComp/MapsContainer'  
import MyDonations from '../navBarComp/navBarUser/MyDonations'
import ExploreCharities from '../navBarComp/navBarUser/ExploreCharities'
import Trending from '../navBarComp/navBarUser/Trending'
import LeastTrending from '../navBarComp/navBarUser/LeastTrending'
import ModAccount from '../navBarComp/navBarMod/ModAccount'
import ModCharities from '../navBarComp/navBarMod/ModCharities'
import ModStatistics from '../navBarComp/navBarMod/ModStatistics'

class Main extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Switch>
                <Route exact path = '/' render = {() => (
                    <MapsContainer email = {this.props.email} />
                )}/>
                <Route path = '/my-donations' render = {() => (
                    <MyDonations email = {this.props.email} />
                )}/>
                <Route path = '/charities' render = {() => (
                    <ExploreCharities email = {this.props.email} />
                )}/>
                <Route path = '/trending' render = {() => (
                    <Trending email = {this.props.email} />
                )}/>
                 <Route path = '/least-trending' render = {() => (
                    <LeastTrending email = {this.props.email} />
                )}/>
                <Route path = '/mod-account' render = {() => (
                    <ModAccount email = {this.props.email} />
                )}/>
                <Route path = '/mod-charities' render = {() => (
                    <ModCharities email = {this.props.email} />
                )}/>
                <Route path = '/statistics' render = {() => (
                    <ModStatistics email = {this.props.email} />
                )}/>
            </Switch>
        )
    }
}

export default Main

