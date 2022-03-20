import React from "react";
import {useParams, useNavigate} from "react-router-dom"
import parse from "html-react-parser"
import { Container, Col, Row, ListGroup, Stack } from "react-bootstrap"
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
        this.subject = null
        // return object of cookies
        if (this.props.data !== null) {
            for (let j = 0; j<this.props.data.length; j++) {
                if (this.props.data[j].school_id === this.props.params.subjectCode) {
                    this.subject = this.props.data[j]
                }
            }
            this.current_lesson_plan_key = this.subject.lessons.filter(lesson => lesson.end >= new Date().getTime())[0].key
            console.log(this.current_lesson_plan_key)
        }
        this.number = 0;
        this.state = {
            current_lesson_plan_key: this.props.data !== null && this.subject !== null ? this.current_lesson_plan : null,
            current_lesson_plan: null,
            fetching_lesson_plan: false
        }
    }
    
    renderLessonPlan = async (key) => {
        this.number++
        if (this.number > 1) {
            return
        }
        let lesson_plan = this.subject.lessons[key].plan
        console.log(lesson_plan)
        
        if (lesson_plan === null) {
            this.number = 0;
            this.setState({current_lesson_plan: "No lesson plan", fetching_lesson_plan: false})
            return
        }
        let response = await fetch(lesson_plan.url, {mode: "no-cors", credentials: 'include'})
        let blob = await response.blob()
        let html = await blob.text()
        console.log(html)
        let dom = parse(html)
        this.number = 0
        this.setState({current_lesson_plan: dom, fetching_lesson_plan: false})
        return
    }
    render() {
        if (this.state.fetching_lesson_plan === true && this.number === 0) {
            this.renderLessonPlan(this.state.current_lesson_plan_key)
        }
        return (
            <>
                {this.subject === null
                ?   <h1>Not your subject</h1>
                :   <>
                            <Row>
                                <Col className="text-center col-3">
                                    <Container>
                                        <h1>
                                            Teacher: <br/> {this.subject.teacher} - {this.subject.teacher_code} <br/>
                                            <img src={this.subject.teacher_image_url} alt={this.subject.teacher}/>
                                        </h1>
                                    </Container>
                                </Col>
                                <Col className="text-center">
                                    <Container>
                                        {this.state.current_lesson_plan}
                                    </Container>
                                </Col>
                                <Col className="text-center">
                                    <Container>
                                        <h1>List of lesson plans</h1>
                                        <ListGroup variant="flush" className="scrollarea">
                                        {this.subject.lessons.map((lesson, index) => (
                                            <Stack gap={6} key={index}>
                                                <ListGroup.Item as="button" action onClick={() => this.setState({current_lesson_plan_key: lesson.key, fetching_lesson_plan: true})}>
                                                <div className="d-flex w-100 align-items-center justify-content-between">
                                                    <strong className="mb-1">
                                                        {new Date(lesson.start).toLocaleDateString("en-US", {weekday: "long", year: 'numeric', month: 'long', day: 'numeric'})} at {new Date(lesson.start).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})} to {new Date(lesson.end).toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})}
                                                    </strong>
                                                </div>
                                                </ListGroup.Item>
                                            </Stack>
                                        ))}
                                        </ListGroup>
                                    </Container>
                                </Col>
                            </Row>
                        
                        

                    </>
                }
            </>
        )
    }
}
export default withRouter(Subject)