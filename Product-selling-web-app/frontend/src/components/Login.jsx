import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const inputHandler = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/signin', formValues)
      const token = response.data.token.access
      const user = response.data.user
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
      alert('logging in...')
      window.location.href = "/"
    }catch(err) {
      alert(err.response.data.message)
    }
  }
  return (
    <Container style={{marginTop: "5rem"}}>
      <h3 className='text-center'>Sign In</h3>
      <Row className='w-50 m-auto' style={{marginTop: "5rem"}}>
        <Col className='p-4'>
        <Form className='w-75 m-auto' onSubmit={handleSubmit}>
        <Row>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
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
        <Label for="password">
            Password
          </Label>
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
        <div className='d-flex align-items-center justify-content-center'>
        <Button color="primary" className='w-25'>Sign In</Button>
        </div>
        <p className='w-100 mt-2'>
        Don't have an account?<Link to="/register">Register</Link>
        </p>
        </FormGroup>
        </Row>
            </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login