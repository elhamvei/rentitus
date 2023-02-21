import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom"
import {Container, Row, Col, Form, FormGroup, Label, Input, List, Button} from 'reactstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const inputHandler = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/signup', formValues)
      alert(response.data.message)
      navigate('/login')
    }catch(err) {
      alert(err.response.data.message)
    }
  }
  return (
    <Container style={{marginTop: "5rem"}}>
      <h3 className='text-center'>Complete Your Registration</h3>
      <Row style={{marginTop: "5rem"}}>
        <Col className='p-4'>
        <Form className='w-75 m-auto' onSubmit={handleSubmitForm}>
        <h4 className='mb-2'>We need a few more details:</h4>
            <Row>
            <Col>
            <FormGroup>
            <Label for="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              onChange={inputHandler}
            />
          </FormGroup>
            </Col>
            <Col>
            <FormGroup>
            <Label for="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              onChange={inputHandler}
            />
          </FormGroup>
            </Col>
            </Row>
            <Row>
        <FormGroup>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              onChange={inputHandler}
            />
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={inputHandler}
            />
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={inputHandler}
            />
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
        <Button color="primary" type="submit">Register</Button>
        </FormGroup>
        <p className='w-100'>
        Already have an account?<Link to="/login">Login</Link>
        </p>
        </Row>
            </Form>
        </Col>
      <Col>
        <h4>Keep in mind</h4>
        <List type="styled">
          <li className='py-2'>We have your back with our $1,000,000 liability guarantee</li>
          <li className='py-2'>Your privacy is protected</li>
          <li className='py-2'>We'll even cover the cost if a renter fails to pay</li>
        </List>
      </Col>
      </Row>
    </Container>
  )
}

export default Register