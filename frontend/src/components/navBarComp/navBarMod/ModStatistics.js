import React from 'react'
import { 
    LineChart, 
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts'
import { Tabs, Tab } from 'react-bootstrap'
import BarChart from 'recharts/lib/chart/BarChart'
import Bar from 'recharts/lib/cartesian/Bar'
import modStatistics from './styles/modStatistics.css'

class ModStatistics extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            donationsByDay: [],
            donationsByPostCode: [],
            tabKey: 'donC'
        }

        this.loadData = this.loadData.bind(this)
        this.createContent = this.createContent.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    handleSelect(key) {
        this.setState({ 
            tabKey: key 
        }, () => {
            if (this.state.donationsByDay === 0)
                this.loadData()
        
            if(this.state.donationsByPostCode.length === 0) 
                this.loadData()
        })
    }

    loadData() {
        let e = JSON.stringify({
            email: this.props.email,
            key: this.state.tabKey
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/statistics', {
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
            if (this.state.tabKey === 'donC') {
                this.setState({
                    donationsByDay: data
                })
            }

            if (this.state.tabKey === 'postC') {
                this.setState({
                    donationsByPostCode: data
                })
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    createContent(filter) {
        if (filter === 'dC') {
            return (
                <div className = 'modStatistics'>
                <LineChart width={1230} height={250} data={this.state.donationsByDay}
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='day' />
                    <YAxis />
                    <Tooltip />
                    <Line type='monotone' dataKey='donationsCount' stroke='#82ca9d' />
                </LineChart>
                </div>
            )
        } else {
            return (
                <BarChart width={1230} height={250} data={this.state.donationsByPostCode}
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='userPostC' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='donationsCount' fill='#82ca9d' />
                </BarChart>
            )
        }
        
    }

    render() {
        if (this.state.donationsByDay &&
            this.state.donationsByDay.length > 0) {
            return(
                <div className = 'modStatistics'>
                    <Tabs
                        activeKey = {this.state.tabKey}
                        onSelect = {this.handleSelect}
                        id = 'statistics'
                    >
                        <Tab eventKey={'donC'} title = 'Donations by day'>
                            {this.createContent('dC')}
                        </Tab>
                        <Tab eventKey={'postC'} title = 'Donations by post code'>
                            {this.createContent('pC')}
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

export default ModStatistics