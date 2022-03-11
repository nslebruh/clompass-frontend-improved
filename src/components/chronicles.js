import React from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";

export default class Chronicles extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.data
        this.ids = {}
        for (let i = 0; i<this.data.length; i++) {
            this.ids[this.data[i].id] = false
            console.log(this.ids)
        }
        this.state = {
            ids: this.ids
        }
    }
    handleOffcanvasChange = (id, state) => {
        console.log(id, state)
        this.setState({ids: {
            [id] : state
        }})

    }
    render() {
        return  (
            <>
            <h1>Chronicles</h1>
            <ListGroup variant="flush" className="scrollarea">
            {this.data.map((data, index) => (
                <ListGroup.Item as="button" key={index} action onClick={() => this.handleOffcanvasChange(data.id, true)} >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-1">
                                                {data.name}
                                              </strong>
                    </div>
                    Occured on {new Date(data.occurredTimestamp).toLocaleTimeString("au-en", {weekday: "long", year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "2-digit"})} <br/>
                </ListGroup.Item>
            ))}
            </ListGroup>
            {this.data.map((data, index) => 
                    <Offcanvas show={this.state.ids[data.id]} onHide={() => this.handleOffcanvasChange(data.id, false)} key={index}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{data.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    Occured on {new Date(data.occurredTimestamp).toLocaleTimeString("au-en", {weekday: "long", year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "2-digit"})} <br/>
                    Created on {new Date(data.createdTimestamp).toLocaleTimeString("au-en", {weekday: "long", year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "2-digit"})}
                    </Offcanvas.Body>
                </Offcanvas>
                )}
            </>
        )
    }
}