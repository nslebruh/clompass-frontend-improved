import React from "react";
import { Col, Row, Container, } from "react-bootstrap";
import LearningTasks from "./learning_tasks";
import Schedule from "./schedule"
import MyTasks from "./mytasks"
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
                <Row>
                <Col className="text-center">
                    <h1>Subjects</h1>
                    <Schedule onlyDayView="true" data={this.state.data.schedule_data}/>
                  </Col>
                  <Col className="text-center">
                    <h1>Overdue learning tasks</h1> 
                    <LearningTasks renderType="overdue" data={this.state.data.learning_tasks}/>
                  </Col>
                  <Col className="text-center">
                    <h1>My Tasks</h1>
                    <MyTasks />
                  </Col>
                </Row>

        </div>
        )
    }
}