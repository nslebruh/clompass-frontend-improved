import React from "react";
import {useParams, useNavigate} from "react-router-dom"
import { Container,  } from "react-bootstrap"
const withRouter = WrappedComponent => props => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
        />
    );
};

class Subject extends React.Component {
    constructor(props) {
        super(props)
        this.subjects = [];
        for (let i = 0; i<this.props.data.length; i++) {
            this.subjects.push(this.props.data[i].school_id)
        }
    }
    render() {
        return (
            <>
                {this.subjects.indexOf(this.props.params.subjectCode) === -1
                ?   <h1>Not your subject</h1>
                :   <>
                        <h1>
                            {this.props.params.subjectCode}
                        </h1>

                    </>
                }
            </>
        )
    }
}
export default withRouter(Subject)