
import React from 'react'
import {Modal, NavItem} from 'react-bootstrap'

const text = 'AltrHub is a web platform aiming to present all charity organisation in the same place. We aim to present all the key information to our users, to help them get involved with different organisations and events they have never head of, and ultimately, to help those in need.'
const contactInfo = 'If you are a Charity and want to join AltrHub, please contact us at \'akh23@altrhub.com\'.'

class About extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
		this.setState({
            showModal: false,
        })
	}

    handleShow() {
		this.setState({ 
            showModal: true 
        }) 
    }

    render() {
        return (
            <NavItem 
                onClick = {this.handleShow} 
                disabled = {this.state.showModal}
            >
                <Modal
                    show = {this.state.showModal} 
                    onHide = {this.handleClose} 
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            About
                        </Modal.Title>
                    </ Modal.Header>

                        <Modal.Body>
                            <div>
                                {text}
                                <hr />
                                {contactInfo}
                            </div>
                        </Modal.Body>
                </Modal>
                {this.props.children}
            </NavItem>  
        )
    }
}
export default About