
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <Row style={{
            padding: "1rem",
            color: "#111",
            background: "#f1f1f1",
            position: "fixed",
            width: "100%",
            bottom: 0
           }}>
            <Col>2023@Rentitus</Col>
            <Col>
                <a style={{textDecoration: "none"}} href="#">Terms</a>
            </Col>
            <Col>
                <a style={{textDecoration: "none"}} href="#">Privacy</a>
            </Col>
            <Col>
                <a style={{textDecoration: "none"}} href="#">Sitemap</a>
            </Col>
        </Row>
    )   
}

export default Footer