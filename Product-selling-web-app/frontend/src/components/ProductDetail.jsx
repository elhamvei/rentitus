import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { Container, Row, Col} from 'reactstrap'
import { base_url } from "../constant"

const ProductDetail = () => {
    const [product, setProduct] = useState()
    const [image, setImage] = useState()
    const params = useParams();
    const getProduct = async () => {
        try {
            const response = await axios.get(`/api/product/${params.productId}`, {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('token')).token
                }
            })
            setProduct(response.data.product)
            console.log(response.data.product)
            setImage(base_url+"/"+response.data.product.image.replace('public/', ''))
            console.log(image)
        }catch(err) {
            alert(err.response.data)
        }
        
    }
    useEffect(() => {
        getProduct()
    },[])
    return (
       product && (<Container className='w-25 m-auto'>
            <h2>Product Details</h2>
      <Row>
        <p className="w-75">
        <img src={image} alt={product.name} style={{width: "100%", height: "100%"}} />
        </p>    
      <p>
            Name: {product.name}
        </p>
        <p>
            Description: {product.description}
        </p>
        <p>
            Category: {product.category}
        </p>
        <p>
            Price: {product.price}
        </p>
      </Row>
    </Container>)
    )
}

export default ProductDetail