import React from "react";
import { Col, Row, Container, } from "react-bootstrap";
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }
    render() {
        return (
            <div>
            <h1>Dashboard</h1>
            <Container>
                <Row>
                <Col className="text-center">
                    Subjects
                  </Col>
                  <Col className="text-center">
                    <h1>Overdue learning tasks</h1> 
                  </Col>
                  <Col className="text-center">
                    My Tasks
                  </Col>
                </Row>
            </Container>
        </div>
        )
    }
}