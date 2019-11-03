import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StorageManager } from '../StorageManager';
import { Calendar, Views } from 'react-big-calendar'


export class ParentDashboard extends React.Component {

    state = {
        
        Timeslots: ({ localizer }) => (
            <Calendar
              events={null}
              step={15}
              timeslots={8}
              localizer={localizer}
              defaultView={Views.WEEK}
              defaultDate={new Date(2015, 3, 12)}
            />
          )
    }

    p () {
        return {__html: this.state.Timeslots};
      };

    render () {
        return (
            <>
            <div dangerouslySetInnerHTML={this.p()} />;
            </>
        );
    }
}