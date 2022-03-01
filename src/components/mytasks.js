import React from "react";
import { Form, Button, ButtonGroup, } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new_task_message: "",
            tasks_to_delete: [],
            tasks: []
        }
    }
    render() {
        return (
            <>
            <h1>
                <Form>
                    <Form.Label>Input task message</Form.Label>
                    <Form.Control type="text" placeholder="text" onChange={(e) => this.setState({new_task_message: e.target.value})}/>
                </Form>
                My Tasks
            </h1>
            </>
        )
    }
}