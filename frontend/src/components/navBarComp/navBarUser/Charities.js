import React from 'react'
import {ListGroup, ListGroupItem, Tab, Tabs, Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import charities from './styles/charities.css'

class Charities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfCharities: [],
            tabKey: 1
        }
        this.createContentTable = this.createContentTable.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.loadOrg = this.loadOrg.bind(this)
        this.populateList = this.populateList.bind(this)
        this.contentPush = this.contentPush.bind(this)
    }

    componentDidMount() {
        this.loadOrg()
    }

    loadOrg() {
        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/charities', {
            method: 'POST',
            headers: header,
        })
        .then((response) => {
            if (response.status === 200)
                return response.json()
            else
                alert('Something went wrong, please try again')
        })
        .then((data) => {
            this.setState({
                listOfCharities: data
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }

    handleSelect(key) {
        this.setState({ 
            tabKey: key 
        })
      }

    createContentTable() {
        let content = []
        if (this.state.listOfCharities.length > 0) {
            switch(this.state.tabKey){
                case 1:
                    return content = this.populateList('')
                    break
                case 2:
                    return content = this.populateList('children') 
                    break
                case 3:
                    return content = this.populateList('elderly')
                    break
                case 4:
                    return content = this.populateList('hunger')
                    break
                case 5:
                    return content = this.populateList('health')
                    break
                case 6:
                    return content = this.populateList('poverty')
                    break
            }          
        }
        return (
            <ListGroup>
                {content}
            </ListGroup>
        ) 
    }

    populateList(filter) {
        let count = {}
        let content = []
        let id = 0 //take care of duplicates

        //see how many times each Charity is in the list
        this.state.listOfCharities.forEach((org) => {
            count[org.orgName] = (count[org.orgName] || 0) + 1
        })

        if (this.state.tabKey === 1){
            this.state.listOfCharities.forEach((org) => {
                if (org.eventTag !== null){
                    if ( id !== org.orgID) {
                        id = org.orgID
                        this.contentPush(content, org, count[org.orgName])
                    }
                } else {
                    this.contentPush(content, org, 0)
                }
            })
            
        } else {
            this.state.listOfCharities.forEach((org) => {
                if (org.eventTag === filter || org.orgPrimeTag === filter) { 
                    if (org.eventTag !== null){
                        if ( id !== org.orgID ) {
                            id = org.orgID
                            this.contentPush(content, org, count[org.orgName])
                        }
                    } else {
                        this.contentPush(content, org, 0)
                    }
                }
            })             
        }
        return(
            content
        )
    }

    contentPush(contentHolder, content, countEvents) {
        contentHolder.push (
            <LinkContainer 
                to = {'/charities/' + content.orgID}
                key={content.orgID}
            >
                <ListGroupItem >
                    {content.orgName}
                    <Badge>{countEvents}</Badge>
                </ListGroupItem>
            </LinkContainer>
        )
    }

    render() {
        if (this.state.listOfCharities && 
            this.state.listOfCharities.length > 0) {
            return(
                <div className = 'charitiesContainer'>
                    <Tabs
                        activeKey = {this.state.tabKey}
                        onSelect = {this.handleSelect}
                        id = 'filterCharities'
                    >
                        <Tab eventKey={1} title = 'All'>
                            {this.createContentTable()}
                        </Tab>
                        <Tab eventKey={2} title = 'Children'>
                            {this.createContentTable()}
                        </Tab>
                        <Tab eventKey={3} title = 'Elderly'>
                            {this.createContentTable()}
                        </Tab>
                        <Tab eventKey={4} title = 'Hunger'>
                            {this.createContentTable()}
                        </Tab>
                        <Tab eventKey={5} title = 'Health'>
                            {this.createContentTable()}
                        </Tab>
                        <Tab eventKey={6} title = 'Poverty'>
                            {this.createContentTable()}
                        </Tab>
                    </Tabs>
                </div>
            )
        } else {
            return(
                <div>Waiting for data...</div>
            )
        }
    }
}

export default Charities