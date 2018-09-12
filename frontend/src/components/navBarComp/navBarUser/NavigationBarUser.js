import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class NavigationBarUser extends React.Component {
    constructor(props) {
        super(props)

        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut() {
        this.props.onLogOut()
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
                            <LinkContainer to = '/'>
                                <NavItem
                                    onClick = {() => {
                                        this.handleLogOut()
                                    }}
                                >
                                    Log Out
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                            
                        <Nav>
                            <LinkContainer to = '/my-donations'>
                                <NavItem>My donations</NavItem>
                            </LinkContainer>

                            <LinkContainer to = '/charities'>
                                <NavItem>Charities</NavItem>
                            </LinkContainer>

                            <LinkContainer to = '/trending'>
                                <NavItem>Trending</NavItem>
                            </LinkContainer>

                            <LinkContainer to = '/least-trending'>
                                <NavItem>Least trending</NavItem>
                            </LinkContainer>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBarUser