import React from 'react'
import {
    Modal, 
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    ControlLabel,
    FormControl} from 'react-bootstrap'

class DonationModal extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            showCharityInfo: false,
            donation: ''
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDonate = this.handleDonate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validateDonation = this.validateDonation.bind(this)
    }

    componentDidMount() {
        this.setState({
            showCharityInfo: this.props.showModal
        })
    }

    handleClose() {
		this.setState({
            showCharityInfo: false,
            donation: ''
        })
        this.props.closeModal()
	}

    handleShow() {
		this.setState({ 
            showCharityInfo: true 
        }) 
    }

    handleChange(event) {
        this.setState ({
            [event.target.id]: event.target.value   
        })
    }

    validateDonation() {
        return (!isNaN(this.state.donation) 
                && this.state.donation > 0)
    }
    
    handleDonate(event) {
        event.preventDefault()

        let data = JSON.stringify({
            email: this.props.email,
            charity: this.props.eventName, 
            donation: this.state.donation
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/donate', {
            method: 'POST',
            headers: header,
            body: data
          })
          .then((response) => {
              if (response.status === 200) {
                  this.setState({
                      showModal: false
                  })
                  alert('Donation was successful. Thank you!')
              } else if (response.status === 204) {
                  alert('Donation did not go through. Please check your details.')
                  this.setState({
                      donation: ''
                  })
              }
              else {
                  alert('Something went wrong, please try agian.')
                  this.setState({
                      password: ''
                  })
              }
          })
          .catch((error) => {
            console.error(error)
        })
    }

    render() {
        return(
            <Modal
                show = {this.state.showCharityInfo}
                onHide = {this.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.eventName}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className = 'plzzwork'>
                    <p>
                        {this.props.eventDesc}
                    </p>

                    <hr />

                    <Form onSubmit = {this.handleDonate}>
                        <FormGroup controlId = 'donation' bsSize = 'large'>
                            <ControlLabel> Donation </ControlLabel>
                            <FormControl
                                autoFocus
                                type = 'number'
                                value = {this.state.donation}
                                onChange = {this.handleChange}
                            />
                        </FormGroup>

                        <ButtonGroup justified>
                            <ButtonGroup>
                                <Button
                                    bsStyle = 'success'
                                    disabled = {!this.validateDonation()}
                                    onClick = {this.handleDonate}
                                >
                                    Donate
                                </Button>
                            </ButtonGroup>
                        </ButtonGroup>
                    </Form>
    
                </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DonationModal