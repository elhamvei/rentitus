import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap"
import ProductCard from './ProductCard'
const MyProduct = () => {
    const [products ,setProducts] = useState()
    const getMyProducts = async () => {
        try {
            const response = await axios.get('/api/product/my-products', {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('token')).token
                }
            })
            setProducts(response.data.products)
        }catch(err) {
            alert(err.response.data)
        }
    }
    useEffect(() => {
        getMyProducts()
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

export default MyProduct