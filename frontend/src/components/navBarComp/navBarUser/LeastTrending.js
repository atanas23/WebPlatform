import React from 'react'
import {ListGroup, ListGroupItem, Tab, Tabs, Badge} from 'react-bootstrap'
import DonationModal from './DonationModal'
import leastTrending from './styles/leastTrending.css'

class LeastTrending extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfLeastTrending: [],
            showDonationModal: false,
            modalEventName: '',
            modalEventDesc: ''
        }

        this.loadLeastTrending = this.loadLeastTrending.bind(this)
        this.createContentTable = this.createContentTable.bind(this)
        this.charityDetailsShow = this.charityDetailsShow.bind(this)
        this.handleCloseParent = this.handleCloseParent.bind(this)
    }

    componentDidMount() {
        this.loadLeastTrending()
    }

    handleCloseParent() {
        this.setState({
            showDonationModal: false
        })
    }

    loadLeastTrending() {
        let header = {
            'Content-Type': 'application/json'
        }

        let body = JSON.stringify({
            user: this.props.email
        })
    
        fetch('/least-trending', {
            method: 'POST',
            headers: header,
            body: body
        })
        .then((response) => {
            if (response.status === 200)
                return response.json()
            else
                alert('Something went wrong, please try again')
        })
        .then((data) => {
            this.setState({
                listOfLeastTrending: data
            })
        })
        .catch((error) => {
            console.error(error)
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

    createContentTable() {
        let content = []
        let i = 0
        this.state.listOfLeastTrending.forEach((trending) => {
            content.push(
                <ListGroupItem 
                    onClick = {() => {
                        this.setState({
                            modalEventName: trending['eventName'],
                            modalEventDesc: trending['eventDesc'],
                            showDonationModal: true
                        })
                    }}
                    key = {i++}
                >
                    {trending.eventName}
                </ListGroupItem>
            )
        })

        return(
            <div>
                <h1>
                    Least Trending
                </h1>
                <ListGroup>
                    {content}
                </ListGroup>
            </div>
        )
    }

    render() {
        if (this.state.listOfLeastTrending && 
            this.state.listOfLeastTrending.length > 0) {
                if(!this.state.showDonationModal) {
                    return(
                        <div className = 'leastTrending'>
                            {this.createContentTable()}
                        </div>
                    )
                } else {
                    return(
                        <div className = 'leastTrendingWithModal'>
                            {this.createContentTable()}
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

export default LeastTrending