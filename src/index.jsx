import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Navbar, Nav, Form, Button, Offcanvas, Image, Container, Row, Col, Spinner, Stack } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import "./scss/app.scss"
import ICalParser from 'ical-js-parser';

import PageNotFound from "./components/page_not_found.js"
import LearningTasks from "./components/learning_tasks.js";
import Schedule from "./components/schedule.js";
import StudentInfo from "./components/student_info.js";
import MyTasks from "./components/mytasks.js"
import Subjects from "./components/subjects.js"
import Subject from "./components/subject.js"

export default class App extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('clompass-data') === null) {   
          localStorage.setItem('clompass-data', '{"learning_tasks":[],"student_info":{},"schedule_url":"lessonplans":[]}')
        }
        this.state = {
            fetching_api_data: false,
            api_message: null,
            username: '',
            api_fetch_error: null,
            password: '',
            update_data_page: false,
            get_type: "learningtasks",
            data: {
                student_info: JSON.parse(localStorage.getItem('clompass-data')).student_info ? JSON.parse(localStorage.getItem('clompass-data')).student_info : {},
                learning_tasks: JSON.parse(localStorage.getItem('clompass-data')).learning_tasks ? JSON.parse(localStorage.getItem('clompass-data')).learning_tasks : [],
                schedule_url: JSON.parse(localStorage.getItem('clompass-data')).schedule_url ? JSON.parse(localStorage.getItem('clompass-data')).schedule_url : '',
                lessonplans: JSON.parse(localStorage.getItem('clompass-data')).lessonplans ? JSON.parse(localStorage.getItem('clompass-data')).lessonplans : [],
            },
            schedule_data: [],
            time: new Date(),
        };
        this.number = 0;
    }
    async componentDidMount() {
        console.log("component mounted")
        this.timer = setInterval(() => this.tick(), 1000)
        if (this.state.data.schedule_url !== "") {
            this.fetchSchedule(this.state.data.schedule_url)
        }
        return
        

    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    tick() {
        this.setState({
          time: new Date()
        });
      }
    fetchSchedule = async (url) => {
        const response = await fetch(url)
        const d = [];
        try {
            let data = await response.blob();
        data = await data.text();
        const ics = ICalParser.toJSON(data);
        for (let i = 0; i < ics.events.length; i++) {
          d.push({
            startDate: this.parseTime(ics.events[i].dtstart.value),
            formattedStart: this.parseTimeString(ics.events[i].dtstart.value),
            endDate: this.parseTime(ics.events[i].dtend.value),
            formattedEnd: this.parseTimeString(ics.events[i].dtend.value),
            title: ics.events[i].summary + ' - ' + ics.events[i].location + ' - ' + ics.events[i].description.split(' : ')[1],
          })
        }
        } catch (error) {
            console.log(error)
        }
        
        this.setState({
            schedule_data: d,
        })
    }
    parseTime(string) {
        return new Date(
            [
              string.slice(0, 4) + "-",
              string.slice(4, 6) + "-",
              string.slice(6, 8) + "T",
              string.slice(9, 11) + ":",
              string.slice(11, 13) + ":",
              string.slice(13, 15) + "Z",
            ].join(""),
        ).valueOf();
    }
    parseTimeString(string) {
        return new Date(
            [
              string.slice(0, 4) + "-",
              string.slice(4, 6) + "-",
              string.slice(6, 8) + "T",
              string.slice(9, 11) + ":",
              string.slice(11, 13) + ":",
              string.slice(13, 15) + "Z",
            ].join(""),
        )
    }
    fetchApi = async () => {
        this.number++
        if (this.number > 1) {
            return
        }
        try {
            let response = await fetch(`https://api.clompass.com/get/${this.state.get_type}?username=${this.state.username}&password=${this.state.password}`)
            response = await response.json();
            console.log(response)
            if (response.error) {
                this.setState({
                    api_message: response.message,
                    api_fetch_error: response.error,
                    fetching_api_data: false,
                })
                this.number = 0
                return
            } else {
                this.number = 0
                this.setState({
                    api_message: response.message,
                    api_fetch_error: null,
                    fetching_api_data: false,
                    data: {
                    ...this.state.data,
                    [response.response_type]: response.response_data
                }})
            }
        } catch (error) {
            console.log(error)
            this.number = 0
            this.setState({
                api_message: "it no worke",
                api_fetch_error: "Error fetching data from API",
                fetching_api_data: false,
            })
            return
        }
        
        
    }
    showOffcanvas() {
        this.setState({update_data_page: true})
    }
    saveData() {
        let data = {};
        Object.keys(this.state.data).forEach(key => {
            data[key] = this.state.data[key]
        })
        console.log(JSON.stringify(data))
        localStorage.setItem('clompass-data', JSON.stringify(data))
    }
    changeTF(status, state) {
        let x = status === true ? false : true
        this.setState({[state]: x})
    }
    navbar() {
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    <Image src="https://cdn.jsdelivr.net/gh/clompass/clompass@main/public/svg/icon.svg" fluid height="48" width="60"/> Clompass
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                        <Nav.Link as="a" href="https://outlook.com/lilydaleheights.vic.edu.au" target="_blank" rel="noopener">Emails</Nav.Link>
                        <LinkContainer to="/learning-tasks">
                            <Nav.Link>Learning Tasks</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/schedule">
                            <Nav.Link>Schedule</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/subjects">
                            <Nav.Link>Subjects</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/student">
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={() => this.showOffcanvas()}>Update data</Nav.Link>
                    </Nav>
                    <Navbar.Text className="justify-content-end allign-right" >{this.state.time.toLocaleTimeString("au-en", {weekday: "long", year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "2-digit", second: "numeric"})}</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
     )     
    }
    update_data_page() {
        if (this.state.fetching_api_data === true && this.number === 0) {
            this.fetchApi()
        }
        return (
            <>
                <Offcanvas show={this.state.update_data_page} onHide={() => this.setState({update_data_page: false})}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Update Data</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Button onClick={() => this.saveData()}>Save data to local storage</Button>
                        <Form>
                            <Form.Label>Input Username</Form.Label>
                            <Form.Control type="text" placeholder="username" name="username" id="username" onChange={(event) => this.setState({[event.target.name]: event.target.value})} />
                            <br/>
                            <Form.Label>Input Password</Form.Label>
                            <Form.Control type="password" placeholder="password" name="password" id="password" onChange={(event) => this.setState({[event.target.name]: event.target.value})} />
                            <Button type="button" onClick={() => this.setState({get_type: "learningtasks"})}>learning tasks {this.state.get_type === "learningtasks" ? "tick" : null}</Button>
                            <Button type="button" onClick={() => this.setState({get_type: "studentinfo"})}>Student info {this.state.get_type === "studentinfo" ? "tick" : null}</Button>
                            <Button type="button" onClick={() => this.setState({get_type: "calender"})}>Schedule {this.state.get_type === "calender" ? "tick" : null}</Button>
                            <Button type="button" onClick={() => this.setState({get_type: "lessonplans"})}>Subjects {this.state.get_type === "lessonplans" ? "tick" : null}</Button>
                            <br/>
                            {this.state.fetching_api_data ? <Button disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button> : <Button type="button" onClick={() => this.setState({fetching_api_data: true})}>Get data</Button>}
                            {this.state.api_message ? <p>{this.state.api_message}</p> : null}
                            {this.state.api_fetch_error ? <h1>Error: {this.state.api_fetch_error}</h1> : null}
                        </Form>
                        {/* <Form>
                                <Form.Label>Input Username</Form.Label>
                                <Form.Control type='text' placeholder='Username' name="username" id='username' onChange={(event) => this.setState({[event.target.name]: event.target.value})}></Form.Control>
                                <br/>
                                <Form.Label>Input Password</Form.Label>
                                <Form.Control type='password' placeholder='Password' name="password" id='password' onChange={(event) => this.setState({[event.target.name]: event.target.value})}></Form.Control>
                                <br/>
                                <Form.Label>Input Year</Form.Label>
                                <Form.Control type='text' placeholder='2022' name="year" id="year" onChange={(event) => this.setState({[event.target.name]: event.target.value})}></Form.Control>
                                <Button onClick={() => this.fetchApi()}>Get API data</Button>
                                <br/>
                                <Button onClick={() => this.changeTF(this.state.learning_tasks, "learning_tasks")}>Learning tasks: {this.state.learning_tasks}</Button> 
                                <Button onClick={() => this.changeTF(this.state.student_info, "student_info")}>Student info: {this.state.student_info}</Button> 
                                <Button onClick={() => this.saveData()}>Save new data</Button>
                            </Form> */}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
    dashboard = () => {
        return (
            <>
                <Row>
                <Col className="text-center">
                    <h1>Today's Schedule</h1>
                    <Schedule onlyDayView="true" data={this.state.schedule_data}/>
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

        </>
        )
    }
    render() {
        return (
            <Router>
                {this.navbar()}
                {this.update_data_page()}
                <Routes>
                    <Route path="/" element={this.dashboard()} />
                    <Route path="/learning-tasks" element={<LearningTasks data={this.state.data.learning_tasks}/>} />
                    <Route path="/schedule" element={<Schedule data={this.state.schedule_data} />} />
                    <Route path="/student" element={<StudentInfo data={this.state.data.student_info}/>} />
                    <Route path="/subjects" element={<Subjects data={this.state.data.lessonplans}/>}/>
                    <Route path="/subject/:subjectCode" element={<Subject data={this.state.data.lessonplans}/>} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));