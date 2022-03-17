import React from "react";
import { Link } from "react-router-dom";

export default class Subjects extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
    }
    render() {
        return (
            <>
            {this.data.map((subject, index) =>     
                <h1 key={index}>
                    <Link to={`/subject/${subject.school_id}`}>
                    {subject.name}
                    </Link>

                </h1>
            )}
            </>
        )
    }
}