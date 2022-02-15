import React from "react";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Toolbar, DateNavigator, Appointments, TodayButton, DayView, MonthView, ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_date: new Date(),
            data: props.data,
        };
    }
    render() {
        return (
            <Paper>
                <h1>Hello World</h1>
                <Scheduler data={this.state.data}>
                    <ViewState defaultCurrentDate={this.state.current_date}/>
                    <WeekView startDayHour={8} endDayHour={16}/>
                    <DayView startDayHour={8} endDayHour={16}/>
                    <MonthView startDayHour={8} endDayHour={16}/>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments />
                </Scheduler>
            </Paper>
        )
    }
}