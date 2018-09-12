import React from 'react'
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import modAccount from './styles/modAccount.css'

class ModAccount extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            accountInfo: []
        }

        this.loadInfo = this.loadInfo.bind(this)
        this.createContentTable = this.createContentTable.bind(this)
    }

    componentDidMount() {
        this.loadInfo()
    }

    loadInfo() {
        let e = JSON.stringify({
            email: this.props.email 
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/mod-account', {
            method: 'POST',
            headers: header,
            body: e
        })
        .then((response) => {
            if (response.status === 200)
                return response.json()
            else
                alert('Something went wrong, please try again')
        })
        .then((data) => {
            this.setState({
                accountInfo: data
            })
            
        })
        .catch((error) => {
            console.error(error)
        })
    }

        createContentTable() {
            return (
                <div>
                    <h2>Moderator's details</h2>
                    <ListGroup>
                        <h4><Label bsStyle="info">First Name</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].firstName}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Last name</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].lastName}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Email</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].email}        
                        </ListGroupItem>
                    </ListGroup>


                    <h2>Organisation's details</h2>
                    <ListGroup>
                    <h4><Label bsStyle="info">Bio</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].orgBio}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Prime Tag</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].orgPrimeTag}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Facebook</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].orgFB}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Email</Label></h4>
                        <ListGroupItem>
                            {this.state.accountInfo[0].orgEmail}        
                        </ListGroupItem>
                    </ListGroup>
                </div>
            )
        }

    render() {
        if (this.state.accountInfo &&
            this.state.accountInfo.length > 0) {
            return(
                <div className = 'modAccount'>
                    <h1>
                        {this.state.accountInfo[0].orgName}
                    </h1>
                    {this.createContentTable()}
                </div>
            )
        } else {
            return(
                <div>Waiting for data...</div>
            )
        }   
    }
}

export default ModAccount