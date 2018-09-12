
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
    ButtonGroup
} from 'react-bootstrap'

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            email: '',
            password: ''
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loginU = this.loginU.bind(this)
        this.loginM = this.loginM.bind(this)
    }

    loginU(userEmail) {
        this.props.onLoginU(userEmail)
    }

    loginM(modEmail) {
        this.props.onLoginM(modEmail)
    }

    handleClose() {
		this.setState({
            showModal: false,
            email: '',
            password: ''
        })
	}

    handleShow() {
		this.setState({ 
            showModal: true 
        }) 
	}

    validateForm() {
        return emailValidator.validate(this.state.email) && this.state.password.length > 6 
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.id]: event.target.value   
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let data = JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })

        let header = {
            'Content-Type': 'application/json'
        }

        fetch('/signin', {
          method: 'POST',
          headers: header,
          body: data
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    showModal: false
                })
            } else if (response.status === 204) {
                alert('Email and password do not match.')
                this.setState({
                    password: ''
                })
            }
            else {
                alert('Something went wrong, please try agian.')
                this.setState({
                    password: ''
                })
            }
            return response.json()    
        })
        .then((data) => {
            if (data && data.userType === 'user')
                this.loginU(data.userEmail)
            else
                this.loginM(data.userEmail)                
        })
        .catch((error) => {
            console.error(error)
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
                            Sign in
                        </Modal.Title>
                    </ Modal.Header>

                        <Modal.Body>
                            <div className = 'loginForm'>
                                <Form onSubmit = {this.handleSubmit}>
                                    <FormGroup controlId = 'email' bsSize = 'large'>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            autoFocus
                                            type = 'email'
                                            value = {this.state.email}
                                            onChange = {this.handleChange}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup controlId='password' bsSize='large'>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            value = {this.state.password}
                                            onChange = {this.handleChange}
                                            type='password'
                                        />
                                    </FormGroup>

                                    <ButtonGroup justified>
                                        <ButtonGroup>
                                            <Button className = 'submit'
                                                bsStyle = 'success'
                                                disabled = {!this.validateForm()}
                                                type = 'submit'
                                                onClick = {this.handleSubmit}
                                            >
                                                Sign In
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
export default SignIn