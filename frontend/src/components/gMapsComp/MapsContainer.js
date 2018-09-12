import React from 'react'
import MapComp from './MapComp'

class MapsContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {            
        const divStyle = {
            width: '70%',
            height: '100%',
            margin: 'auto'            
        }
        return (
            <div style = {divStyle}>
                <MapComp email = {this.props.email} />
            </div>
          )
    }
} 

export default MapsContainer