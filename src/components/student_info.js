import React from "react";
import { Container } from "react-bootstrap"
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    render() {
        return (
            <Container >
                <h1>Profile</h1>

                Name: {this.props.data.name}
                <br/>
                Prefered name: {this.props.data.prefered_name}
                <br/>
                House: {this.props.data.house}
                <br/>
                Form: {this.props.data.form}
                <br/>
                id: {this.props.data.school_id}
                <br/>
                <img src={this.props.data.image} />
            </Container >
        )
    }
}