import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'
import DonationModal from './DonationModal'
import charity from './styles/charity.css'


class Charity extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            charityData: [],
            showDonationModal: false,
            modalEventName: '',
            modalEventDesc: ''
        }

        this.loadData = this.loadData.bind(this)
        this.createContentTable = this.createContentTable.bind(this)
        this.charityDetailsShow = this.charityDetailsShow.bind(this)
        this.handleCloseParent = this.handleCloseParent.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    handleCloseParent() {
        this.setState({
            showDonationModal: false
        })
    }

    charityDetailsShow = (email, name, info) => {
        return (
            <DonationModal
                email = {email}
                charityName = {name}
                charityDetails = {info}
            />
        )
    }

    loadData() {
        let orgID = window.location.href.substr(32,3).trim()
        let id = JSON.stringify({
            id: orgID
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch(`/charities/${orgID}`, {
            method: 'POST',
            headers: header,
            body: id
        })
        .then((response) => {
            if (response.status === 200)
                return response.json()
            else
                alert('Something went wrong, please try again')
        })
        .then((data) => {
            this.setState({
                charityData: data
            })
            
        })
        .catch((error) => {
            console.error(error)
        })
    }

    createContentTable() {
        let key = 0;
        let content = []
        let orgName = this.state.charityData[0].orgName
        this.state.charityData.forEach((org) => {
                content.push(
                    <ListGroupItem 
                        key = {key++}
                        onClick = {() => {
                            this.setState({
                                modalEventName: org['eventName'],
                                modalEventDesc: org['eventDesc'],
                                showDonationModal: true
                            })
                        }}
                    >
                        {org.eventName}
                    </ListGroupItem>
                )
        })
        
        return(
            <div>
                <h1>
                    {orgName}
                </h1>
                <ListGroup>
                    {content}
                </ListGroup>
            </div>
        )
        
    }

    render() {
        if (this.state.charityData && 
            this.state.charityData.length > 0) {
                if(!this.state.showDonationModal) {
                    return(
                        <div className = 'charity'>
                            {this.createContentTable()}
                            <div>
                            <SocialIcon url = {this.state.charityData[0].orgFB} />
                            <SocialIcon network = 'email' url = {this.state.charityData[0].orgEmail} />
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div className = 'charityWithModal'>
                            <div>
                                {this.createContentTable()}
                                <div>
                                <SocialIcon url = {this.state.charityData[0].orgFB} />
                                <SocialIcon network = 'email' url = {this.state.charityData[0].orgEmail} />
                                </div>
                            </div>
                            <DonationModal 
                                email = {this.props.email}
                                eventName = {this.state.modalEventName}
                                eventDesc = {this.state.modalEventDesc}
                                showModal = {this.state.showDonationModal}
                                closeModal = {this.handleCloseParent}
                            />
                        </div>
                    )
                }
               
        } else {
            return(
                <div>Waiting for data...</div>
            )
        }
        
    }
}

export default Charity