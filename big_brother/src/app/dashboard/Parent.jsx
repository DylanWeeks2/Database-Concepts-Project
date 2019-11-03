import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StorageManager } from '../StorageManager';
import { Calendar, Views } from 'react-big-calendar'
import events from './events'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import  Selectable  from "./Calendar"
import "./table.css"
//const globalizeLocalizer = localizer(globalize)


export class ParentDashboard extends React.Component {

    state = {
      
    }


    render () {
        return (
          <>
            <div class = "white">
            <Selectable />
            </div>
            </>
        );
    }
}