import React from 'react'
import emailValidator from  'email-validator'
import {
    Modal,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel, 
    NavItem,
    ButtonGroup,
    Checkbox
} from 'react-bootstrap'

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            eventName: '',
            eventDesc: '',
            eventLoc: '',
            eventLat: '',
            eventLong: '',
            eventTag: ''
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            showModal: this.props.showModal
        })
    }

    handleClose() {
        this.props.closeModal()
		this.setState({
            showModal: false,
            eventName: '',
            eventDesc: '',
            eventLoc: '',
            eventLat: '',
            eventLong: '',
            eventTag: ''
        })
	}

    handleShow() {
		this.setState({ 
            showModal: true 
        }) 
	}

    validateForm() {
        return (!isNaN(this.state.eventLat) &&
                !isNaN(this.state.eventLong)) 
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.id]: event.target.value   
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
      
        let data = JSON.stringify({
            orgName: this.props.orgName,
            eventName: this.state.eventName,
            eventDesc: this.state.eventDesc,
            eventLoc: this.state.eventLoc,
            eventLat: this.state.eventLat,
            eventLong: this.state.eventLong,
            eventTag: this.state.eventTag
        }) 
        
        let header = {
            'Content-Type': 'application/json'
        } 
        
        fetch('/create-event',
        {
          method: 'POST',
          headers: header,
          body: data
        })
        .then((response) => {
            if (response.status !== 201)
                alert('Something went wrong. Please check all fields.')
            else
                alert('Charity event created successfully.')
        })
        this.setState({
            showModal: false
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
                            Create an event
                        </Modal.Title>
                    </ Modal.Header>

                    <Modal.Body>
                        <div>
                            <Form onSubmit = {this.handleSubmit}>

                                <FormGroup controlId='eventName' bsSize='large'>
                                    <ControlLabel>Event name*</ControlLabel>
                                    <FormControl
                                        autoFocus
                                        value = {this.state.eventName}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                </FormGroup>

                                <FormGroup controlId='eventDesc' bsSize='large'>
                                    <ControlLabel>Event descrpition*</ControlLabel>
                                    <FormControl
                                        value = {this.state.eventDesc}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                </FormGroup>

                                <FormGroup controlId='eventTag' bsSize='large'>
                                    <ControlLabel>
                                        Event tag* (e.g. elderly, hunger, poverty, children, health)
                                    </ControlLabel>
                                    <FormControl
                                        value = {this.state.eventTag}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                </FormGroup>

                                <FormGroup controlId = 'eventLoc' bsSize = 'large'>
                                    <ControlLabel>Event location*</ControlLabel>
                                    <FormControl
                                        type = 'string'
                                        value = {this.state.eventLoc}
                                        onChange = {this.handleChange}
                                    />
                                </FormGroup>
                            
                                <FormGroup controlId='eventLat' bsSize='large'>
                                    <ControlLabel>
                                        Event location latitude* (e.g. 12.123456)
                                    </ControlLabel>
                                    <FormControl
                                        value = {this.state.eventLat}
                                        onChange = {this.handleChange}
                                        type = 'number'
                                    />
                                </FormGroup>
                                
                                <FormGroup controlId='eventLong' bsSize='large'>
                                    <ControlLabel>
                                        Event location longtitude* (e.g. 12.123456)
                                    </ControlLabel>
                                    <FormControl
                                        value = {this.state.eventLong}
                                        onChange = {this.handleChange}
                                        type='number'
                                    />
                                </FormGroup>

                                <ButtonGroup justified>
                                    <ButtonGroup>
                                        <Button
                                            bsStyle = 'success'
                                            disabled = {!this.validateForm()}
                                            type = 'submit'
                                            onClick = {this.handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </ButtonGroup>
                                </ButtonGroup>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
                {this.props.children}
            </NavItem>
        )
    }
}

export default CreateEvent