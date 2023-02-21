import React from 'react'
import {Card, CardBody, CardTitle, CardText, Button, Row, Col} from 'reactstrap'
import { useNavigate } from "react-router-dom"
import { base_url } from "../constant"
import axios from "axios"

const ProductCard = ({productId, image, title, description, price, category, myProduct}) => {
  const imagePath = base_url + '/' + image.replace('public/', '')
  const navigate = useNavigate()
  const clickHandler = (e) => {
    e.preventDefault()
    navigate("/product-details/"+productId)
  }
  const buyProductHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('api/product/buy/'+productId, {}, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token')).token
        }
      })
      alert(response.data.message)
    }catch(err) {
     alert(err.response.data)
    }
  }
  return (
    <div>
        <Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="product image"
    src={imagePath}
  />
  <CardBody>
    <CardTitle tag="h5">
        {title}
    </CardTitle>
    <CardText>
        {description} 
    </CardText>
    <p>Category: {category}</p>
    <p>Price: ${price}</p>
    <Row>
      <Col>
      <Button onClick={clickHandler}>
      Details
    </Button>
      </Col>
      {
        !myProduct &&<Col>
        <Button onClick={buyProductHandler} className="bg-primary">
        Buy Product
      </Button>
        </Col>
      }
    </Row>
  </CardBody>
</Card>
    </div>
  )
}

export default ProductCard