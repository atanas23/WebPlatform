import React from 'react'
import {Table} from 'react-bootstrap' 
import myDonations from './styles/myDonations.css'

class MyDonations extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

       this.createContentTable = this.createContentTable.bind(this)
       this.loadDonations = this.loadDonations.bind(this)
    }

    componentWillMount() {
        this.loadDonations()
    }
    
    loadDonations() {
        let email = JSON.stringify({
            email: this.props.email
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/my-donations', {
            method: 'POST',
            headers: header,
            body: email
        })
        .then((response) => {
            if (response.status === 200)
               return response.json()
            else if (response.status === 400)
                alert('Something went wrong, please try agian.') 
            else {
                this.setState({
                    data:''
                })
            }
        }) 
        .then((data) => {
            this.setState({
                data: data
            })
        }) 
        .catch((err) => {
            alert('Something went wrong')
        })
    }

    createContentTable() {
        let content = []
        if (this.state.data.length && this.state.data.length > 0) {
            let rowCount = 1
            this.state.data.forEach((donation) => {
                content.push (
                    <tr key = {rowCount}>
                        <td>{rowCount}</td>
                        <td>{donation.orgName}</td>
                        <td>{donation.eventName}</td>
                        <td>{donation.amount}$</td>
                    </tr>
                )
                rowCount++
            })
        
            return (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Organisation</th>
                            <th>Event</th>
                            <th>Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </Table>
            )
        } else {
            return(
                <h3>No Donations</h3>
            )
        } 
    }
    
    render() {
        if (this.state.data && this.state.data.length > 0) {
            return(
                <div className = 'myDonations'>
                    {this.createContentTable()}                    
                </div>
            )
        } else 
        return(
            <div>No donations, yet...</div>
        )
    } 
}

export default MyDonations