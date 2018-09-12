import React from 'react'
import {ListGroup, ListGroupItem, Tab, Tabs, Badge} from 'react-bootstrap'
import DonationModal from './DonationModal'
import trending from './styles/trending.css'

class Trending extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfTrending: [],
            showDonationModal: false,
            modalEventName: '',
            modalEventDesc: ''
        }

        this.loadTrending = this.loadTrending.bind(this)
        this.createContentTable = this.createContentTable.bind(this)
        this.handleCloseParent = this.handleCloseParent.bind(this)
    }

    componentDidMount() {
        this.loadTrending()
    }

    handleCloseParent() {
        this.setState({
            showDonationModal: false
        })
    }

    loadTrending() {
        let header = {
            'Content-Type': 'application/json'
        }

        let body = JSON.stringify({
            user: this.props.email
        })
    
        fetch('/trending', {
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
                listOfTrending: data
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }

    createContentTable() {
        let content = []
        let i = 0
        this.state.listOfTrending.forEach((trending) => {
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
                    Trending
                </h1>
                <ListGroup>
                    {content}
                </ListGroup>
            </div>
        )
    }

    render() {
        if (this.state.listOfTrending && 
            this.state.listOfTrending.length > 0) {
                if(!this.state.showDonationModal) {
                    return(
                        <div className = 'trending'>
                            {this.createContentTable()}
                        </div>
                    )
                } else {
                    return(
                        <div className = 'trendingWithModal'>
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

export default Trending