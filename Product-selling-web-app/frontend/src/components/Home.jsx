import axios from 'axios'
import React, {useEffect} from 'react'
import { useState } from 'react'
import ProductCard from "./ProductCard"
import { Container, Row, Col} from 'reactstrap'

const Home = () => {
  const [products, setProduct] = useState()
  const getProducts = async () => {
    try {
      const response = await axios.get('/api/product/products', {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem('token')).token
        }
      })
      setProduct(response.data.products)
    }catch(err) {
     alert(err.response.data)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <Container>
      <Row>
        {
          products && products.map((product, index) => (
            <Col key={index}>
              <ProductCard productId={product._id} image={product.image} title={product.title} description={product.description} price={product.price} category={product.category} />
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default Home