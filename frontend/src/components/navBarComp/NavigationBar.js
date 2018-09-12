import React from 'react'

import NavigationBarOff from './NavigationBarOff';
import NavigationBarUser from './navBarUser/NavigationBarUser';
import NavigationBarMod from './navBarMod/NavigationBarMod';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loginUser: false,
            loginMod: false,
        }

        this.handleLoginU = this.handleLoginU.bind(this)
        this.handleLoginM = this.handleLoginM.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLoginU(userEmail) {
        this.setState({
            loginUser: true,
        })
        this.props.onChangeEmail(userEmail)
    }

    handleLoginM(modEmail) {
        this.setState({
            loginMod: true,
        })
        this.props.onChangeEmail(modEmail)
    }

    handleLogOut() {
        this.setState({
            loginUser: false,
            loginMod: false,
        })
        this.props.onChangeEmail('')
    }

    render() {
        if (!this.state.loginUser && this.state.loginMod) {
            return (
                <NavigationBarMod 
                    onLogOut = {this.handleLogOut} 
                    modEmail = {this.props.email}
                />
            )
        } else if (this.state.loginUser && !this.state.loginMod) {
            return (
                <NavigationBarUser 
                    onLogOut = {this.handleLogOut} 
                    userEmail = {this.props.email}
                />
            )
        } else {
            return (
                <NavigationBarOff 
                    onLoginU = {this.handleLoginU} 
                    onLoginM = {this.handleLoginM}
                />
            )
        }        
    }
}

export default NavigationBar