import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'
import About from './About'

class NavigationBarOff extends React.Component {
    constructor(props) {
        super(props)

        this.handleLoginU = this.handleLoginU.bind(this)
        this.handleLoginM = this.handleLoginM.bind(this)
        
    }

    handleLoginU(userEmail) {
        this.props.onLoginU(userEmail)
    }

    handleLoginM(modEmail) {
        this.props.onLoginM(modEmail)
    }

    render () {
        return(
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to = '/'>
                                AltrHub 
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                        
                        <Nav pullRight>
                            <SignIn onLoginU = {this.handleLoginU} 
                                    onLoginM = {this.handleLoginM}
                            > 
                                Sign In
                            </SignIn>

                            <SignUp>
                                Sign Up
                            </SignUp>
                        </Nav>
                            
                        <Nav>
                            <About>
                                About
                            </About>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBarOff