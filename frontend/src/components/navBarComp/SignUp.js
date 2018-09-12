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

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            fName: '',
            sName: '',
            email: '',
            password: '',
            repassword: ''
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
    }

    handleClose() {
		this.setState({
            showModal: false,
            fName: '',
            sName: '',
            email: '',
            password: '',
            repassword: '',
            postCode: ''
        })
	}

    handleShow() {
		this.setState({ 
            showModal: true 
        }) 
	}

    validateForm() {
        return emailValidator.validate(this.state.email) 
        && this.state.password.length > 6
        && this.state.password === this.state.repassword 
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.id]: event.target.value   
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
      
        let data = JSON.stringify({
            fName: this.state.fName,
            sName: this.state.sName,
            email: this.state.email,
            password: this.state.password,
            postCode: this.state.postCode
        }) 
        console.log(data)
        
        let header = {
            'Content-Type': 'application/json'
        } 
        
        fetch('/signup',
        {
          method: 'POST',
          headers: header,
          body: data
        })
        .then((response) => {
            if (response.status !== 201)
                alert('This email has already been taken, please try with another one.')
            else {
                alert('Sign up was successful, please log in.')
                this.handleClose()
            }
        })
    }
    
    validatePassword() {
        let p = this.state.password
        let rp = this.state.repassword

        if ((p !== rp) || (p.length === 0 && rp.length === 0)){
                return null
        } else {
            return 'success'
        } 
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
                            Sign up
                        </Modal.Title>
                    </ Modal.Header>

                    <Modal.Body>
                        <div>
                            <Form onSubmit = {this.handleSubmit}>

                                <FormGroup controlId='fName' bsSize='large'>
                                    <ControlLabel>First name*</ControlLabel>
                                    <FormControl
                                        autoFocus
                                        value = {this.state.fName}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                </FormGroup>

                                <FormGroup controlId='sName' bsSize='large'>
                                    <ControlLabel>Surname*</ControlLabel>
                                    <FormControl
                                        value = {this.state.sName}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                </FormGroup>

                                <FormGroup controlId = 'email' bsSize = 'large'>
                                    <ControlLabel>Email*</ControlLabel>
                                    <FormControl
                                        type = 'email'
                                        value = {this.state.email}
                                        onChange = {this.handleChange}
                                    />
                                </FormGroup>
                            
                                <FormGroup controlId='password' bsSize='large'>
                                    <ControlLabel>Password*</ControlLabel>
                                    <FormControl
                                        value = {this.state.password}
                                        onChange = {this.handleChange}
                                        type = 'password'
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                                
                                <FormGroup controlId='repassword' bsSize='large'
                                    validationState = {this.validatePassword()}
                                >
                                    <ControlLabel>Repeat password*</ControlLabel>
                                    <FormControl
                                        value = {this.state.repassword}
                                        onChange = {this.handleChange}
                                        type='password'
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup controlId='postCode' bsSize='large'>
                                    <ControlLabel>Post Code</ControlLabel>
                                    <FormControl
                                        value = {this.state.postCode}
                                        onChange = {this.handleChange}
                                        type='string'
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>

                                <Checkbox checked readOnly>
                                    I am 18 years old or older.
                                </Checkbox>

                                <ButtonGroup justified>
                                    <ButtonGroup>
                                        <Button
                                            bsStyle = 'success'
                                            disabled = {!this.validateForm()}
                                            type = 'submit'
                                            onClick = {this.handleSubmit}
                                        >
                                            Sign Up
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

export default SignUp;