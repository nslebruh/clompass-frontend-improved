import React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Toolbar, DateNavigator, Appointments, TodayButton, DayView, MonthView, ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import ICalParser from 'ical-js-parser';
import App from './app.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current_date: new Date(),
    }
    this.currentDate = '2018-11-01';
    this.schedulerData = [
      { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
      { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];
  };
  async componentDidMount() {
    const ics = await fetch('https://lilydaleheights-vic.compass.education/download/sharedCalendar.aspx?uid=2702&key=75abeb10-b0ad-4603-b1cc-b34838f9b652&c.ics')
    let text = await ics.blob();
    text = await text.text();
    console.log(text)
    const resultJSON = ICalParser.toJSON(text);
    console.log(resultJSON)
    const data = [];
    for (let i = 0; i < resultJSON.events.length; i++) {
      data.push({
        startDate: this.parseTime(resultJSON.events[i].dtstart.value),
        endDate: this.parseTime(resultJSON.events[i].dtend.value),
        title: resultJSON.events[i].summary + ' - ' + resultJSON.events[i].location + ' - ' + resultJSON.events[i].description.split(' : ')[1],
      })
    }
    this.setState({ data: data });
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
  render() {
    const { data } = this.state;
    return (
      <Paper>
        <h1>Hello World</h1>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={this.state.current_date}
          />
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

ReactDOM.render(<App />, document.getElementById('root'));