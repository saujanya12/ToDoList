import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import About from './component/About';
import Login from './component/Login';
import TaskForm from './component/TaskForm';

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/taskForm" component={TaskForm} />
            <Route exact path="/about" component={About} />
            {/* <Route path="*" component={NotFound}/> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;