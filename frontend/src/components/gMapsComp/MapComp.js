/* /*global google*/ 
import React from 'react'
import DonationModal from '../navBarComp/navBarUser/DonationModal'
import {compose, withProps, withStateHandlers} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import darkStyleMap from './darkStyleMap.json'

class CustomMarker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}

		this.handleModalShow = this.handleModalShow.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
	}
	

	handleModalShow() {
		this.setState({
			showModal: true
		})
	}

	handleModalClose() {
		this.setState({
			showModal: false
		})
	}

	render() {
		if (this.state.showModal) {
			return(
				<Marker
					key={this.props.marker.eventID}
					position={{ lat: this.props.marker.eventLat, lng: this.props.marker.eventLong }}
					onClick={this.handleModalShow}
				>
					{
						this.props.email !== '' &&
						<DonationModal 
							email = {this.props.email}
							eventName = {this.props.marker.eventName}
							eventDesc = {this.props.marker.eventDesc}
							showModal = {this.state.showModal}
							closeModal = {this.handleModalClose}
						/>
					}
				</Marker>
			)
		} else {
			return(
				<Marker
					key={this.props.marker.eventID}
					position={{ lat: this.props.marker.eventLat, lng: this.props.marker.eventLong }}
					onClick={this.handleModalShow}
				/>
			)
		}
	}
}

class GMap extends React.Component{
	constructor(props) {
		super(props)
	}

	render() {
		const Map = compose(
			withProps({
		
			googleMapURL:
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyDxnv6EofLwGbWSyGlvP-HFm92t8kyd_4Q&v=3.exp&libraries=geometry,drawing,places",
			loadingElement: <div style={{ height: `100%` }} />,
			containerElement: <div style={{ height: `800px` }} />,
			mapElement: <div style={{ height: `100%` }} />,
			center: { lat: 36.4699, lng: 0.3763 },
			}),
			withStateHandlers(() => ({
				isOpen: false,
			}), {
				onToggleOpen: ({ isOpen }) => () => ({
					isOpen: !isOpen,
			}), 
				onMarkerClustererClick: () => (markerClusterer) => {
					const clickedMarkers = markerClusterer.getMarkers()
				}
			}),
			withScriptjs,
			withGoogleMap
		)(props =>
			{
			return (<GoogleMap
				defaultZoom={2}
				defaultCenter={props.center}
				defaultOptions={{ styles: darkStyleMap }}
			>
				<MarkerClusterer
					onClick={props.onMarkerClustererClick}
					averageCenter
					enableRetinaIcons
					gridSize={60}
					maxZoom = {6}
				>
					{this.props.markers.map(marker => (
						<CustomMarker
							key = {marker.eventID}
							marker = {marker}
							email = {this.props.email}
						/>
					))}
				</MarkerClusterer>
			</GoogleMap>
			)}
		)
		return (
			<Map />
		)  
	}
}

class MapWithClusterMarkers extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			markers: [], 
		}

	}

	componentDidMount() {
		let header = {
            'Content-Type': 'application/json'
		}
		
		fetch('/getCoords', {
            method: 'POST',
            headers: header,
        })
      	.then(res => res.json())
      	.then(data => {
        	this.setState({ 
				markers: data 
			})
		})
		.catch(err => {
			alert('Something went wrong')
		})  
		
	}



	render() {
		if (this.state.markers && this.state.markers.length > 0) {
			return(
				<GMap 
					markers = {this.state.markers} 
					email = {this.props.email}
				/>
			)
		} else {
			return(
				<div>Loading...</div>
			)
		}
	}
}

export default MapWithClusterMarkers