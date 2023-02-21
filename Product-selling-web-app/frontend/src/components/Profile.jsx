import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber
  })
  const fetchProfile = async () => {
    const user = await axios.get('/api/user/profile', {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('token')).token
      }
    })
    setUser({
      firstName: user.data.profile.firstName,
      lastName: user.data.profile.lastName,
      email: user.data.profile.email,
      phoneNumber: user.data.profile.phoneNumber
    })
  }
  useEffect(() => {
    fetchProfile()
  }, [])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('/api/user/profile', user, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token')).token
        }
      })
      alert(response.data.message) 
    }catch(err) {
      alert(err.response.data)
    }
  }

  const changeHandler = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  return (
    <Container style={{marginTop: "5rem"}}>
      <h3 className='text-center'>Profile</h3>
      <Row className='w-50 m-auto' style={{marginTop: "5rem"}}>
        <Col className='p-4'>
        <Form className='w-75 m-auto' onSubmit={submitHandler}>
        <Row>
        <FormGroup>
          <Label for="firstName">
            First Name
          </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              value={user.firstName}
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
          <Label for="lastName">
            Last Name
          </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={user.lastName}
              onChange={changeHandler}
            />
          </FormGroup>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={user.email}
              onChange={changeHandler}
            />
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
        <Label for="phoneNumber">
            Phone Number
          </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              value={user.phoneNumber}
              onChange={changeHandler}
            />
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
        <div className='d-flex align-items-center justify-content-center'>
        <Button color="primary" className='w-50'>Edit Profile</Button>
        </div>
        </FormGroup>
        </Row>
            </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile