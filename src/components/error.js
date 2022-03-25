import React from "react"; 

export default class Error extends React.Component {
    constructor(props) {
        super(props)
    }
    clearStorage = () => {
        localStorage.clear()
        localStorage.setItem('clompass-data', '{"learning_tasks":[],"student_info":{},"schedule_url":"subjects":[]}')
    }
    render() {
        return (
            <>
                An error has occured
                <button type="button" onClick={() => this.clearStorage()}>Click here to clear local storage</button>
            </>
        )
    }
}
    