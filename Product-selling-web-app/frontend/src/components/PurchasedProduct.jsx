import React, {useEffect, useState} from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from "axios"
import ProductCard from './ProductCard'
const PurchasedProduct = () => {
    const [products, setProducts] = useState()
    const fetchProducts = async () => {
        const response = await axios.get('/api/user/profile', {
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')).token
          }
        })
        setProducts(response.data.profile.products)
      }
      useEffect(() => {
        fetchProducts()
      }, [])
  return (
    <Container>
        <Row>
        {
          products && products.map((product, index) => (
            <Col key={index} md={3}>
              <ProductCard productId={product._id} image={product.image} title={product.title} description={product.description} price={product.price} category={product.category} myProduct={true} />
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default PurchasedProduct