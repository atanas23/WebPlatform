import React from 'react'
import { ListGroup, ListGroupItem, Label, Button, ButtonGroup } from 'react-bootstrap';
import CreateEvent from './CreateEvent'
import modCharities from './styles/modCharities.css'

class ModCharities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            charitiesList: [],
            showModal: false
        }

        this.loadCharities = this.loadCharities.bind(this)
        this.createContentTable = this.createContentTable.bind(this)
        this.openCreateCharityEvent = this.openCreateCharityEvent.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    componentDidMount() {
        this.loadCharities()
    }

    loadCharities() {
        let e = JSON.stringify({
            email: this.props.email 
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/mod-charities', {
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
                charitiesList: data
            })
            
        })
        .catch((error) => {
            console.error(error)
        })
    }

    createContentTable() {
        let content = []
        let key = 0
        this.state.charitiesList.forEach((event) => {
                content.push(
                <div key = {key++}>
                    <ListGroup>
                    <h4><Label bsStyle="info">Event</Label></h4>
                        <ListGroupItem key = {'eventName'}>
                            {event['eventName']}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Event Description</Label></h4>
                        <ListGroupItem key = {'eventDesc'}>
                            {event['eventDesc']}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Event Lat/Long</Label></h4>
                        <ListGroupItem key = {'latLong'}>
                            {event['eventLat']}
                            {' / '}
                            {event['eventLong']}       
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Event Location</Label></h4>
                        <ListGroupItem key = {'eventLoc'}>
                            {event['eventLoc']}        
                        </ListGroupItem>

                        <h4><Label bsStyle="info">Event Tag</Label></h4>
                        <ListGroupItem key = {'eventTag'}>
                            {event['eventTag']}        
                        </ListGroupItem>
                    </ListGroup>
                    <hr />
                </div>
                ) 
        })
        
        return (
            <div> {content} </div>
        )
    }

    openCreateCharityEvent() {
        this.setState({
            showModal: true
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        if (this.state.charitiesList &&
            this.state.charitiesList.length > 0) {
            if (this.state.showModal) {
                return(
                    <div>
                        <div className = 'modCharitiesWithModal'>
                            <h1>
                                {this.state.charitiesList[0]['orgName']}
                            </h1>
                            {this.createContentTable()}
                            <CreateEvent 
                                orgName = {this.state.charitiesList[0]['orgName']}
                                showModal = {this.state.showModal}
                                closeModal = {this.handleCloseModal}
                            />
                        </div>
                        <div className = 'button'>
                            <Button
                                block
                                bsStyle = 'info'
                                onClick = {this.openCreateCharityEvent}
                            >
                                Create an event
                            </Button>
                        </div>
                    </div>
                )
            } else {
                return(
                    <div>
                        <div className = 'modCharities'>
                            <h1>
                                {this.state.charitiesList[0]['orgName']}
                            </h1>
                            {this.createContentTable()}
                        </div>
                        <div className = 'button'>
                            <Button
                                block
                                bsStyle = 'info'
                                onClick = {this.openCreateCharityEvent}
                            >
                                Create an event
                            </Button>
                        </div>
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

export default ModCharities