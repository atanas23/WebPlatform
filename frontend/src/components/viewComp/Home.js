import React from 'react'
import NavigationBar from '../navBarComp/NavigationBar'
import Main from './Main'

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
        
        this.setEmail = this.setEmail.bind(this)
    }

    setEmail(uEmail) {
        this.setState({
            email: uEmail
        })
    }

    render () {
        return (
            <div>
                <NavigationBar 
                    onChangeEmail = {this.setEmail}
                    email = {this.state.email}
                />
                <Main 
                    email = {this.state.email}
                />
            </div>
        )
    }
}

export default Home



 