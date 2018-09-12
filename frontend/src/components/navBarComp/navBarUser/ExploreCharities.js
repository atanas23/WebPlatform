import React from 'react'
import { Switch } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Charities from './Charities'
import Charity from './Charity'


class ExploreCharities extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Switch>
                <Route exact path = '/charities' render = {() => (
                    <Charities email = {this.props.email} />
                )}/>
                <Route path = '/charities/:orgID' render = {() => (
                    <Charity email = {this.props.email} />
                )}/>
            </Switch>
        )
    }
}

export default ExploreCharities
