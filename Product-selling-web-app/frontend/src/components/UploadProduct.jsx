import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Form, FormGroup, Label, Input, Button, FormText, Container} from 'reactstrap'
const UploadProduct = () => {
    const [categories, setCategories] = useState()
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        description: '',
        category: ''

    })
    const navigate = useNavigate()
    const [image, setImage] = useState()
    
    const handleInput = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleFile = (e) => {
      setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = {
                ...formValues,
                image
            }
            console.log(body)
            const response = await axios.post('/api/product/products', body, {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('token')).token,
                    'content-type': 'multipart/form-data'
                }
            }) 
            alert(response.data.message)
            navigate('/')
        }catch(err) {
          alert(err.response.data.message)
        }
    }
    const getCategory = async () => {
        try {
            const response = await axios.get('/api/category')
            setCategories(response.data.category)
        }catch(err) {
            alert(err.response.data.message)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
  return (
    <Container>
    <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="name">
      Name
    </Label>
    <Input
      id="name"
      name="name"
      placeholder="Product Name"
      type="text"
      onChange={handleInput}
    />
  </FormGroup>
  <FormGroup>
    <Label for="price">
      Price
    </Label>
    <Input
      id="price"
      name="price"
      placeholder="Product Price"
      type="number"
      onChange={handleInput}
    />
  </FormGroup>
  <FormGroup>
    <Label for="description">
      Description
    </Label>
    <Input
      id="description"
      name="description"
      type="textarea"
      onChange={handleInput}
    />
  </FormGroup>
  <FormGroup>
    <Label for="category">
      Select
    </Label>
    <Input
      id="category"
      name="category"
      type="select"
      onChange={handleInput}
    >
        {
            categories && categories.map((category, index) => (
                <option key={index}>{category.name}</option>
            ))
        }
    </Input>
  </FormGroup>
  <FormGroup>
    <Label for="image">
      File
    </Label>
    <Input
      id="image"
      name="image"
      type="file"
      onChange={handleFile}
    />
  </FormGroup>
  <Button type="submit"> 
    Upload
  </Button>
</Form>
</Container>
  )
}

export default UploadProduct