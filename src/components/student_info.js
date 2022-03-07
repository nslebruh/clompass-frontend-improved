import React from "react";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <img src={this.props.data.image} />
            </div>
        )
    }
}