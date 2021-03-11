import { Switch } from 'react-router-dom'
import App from './App';
import Login from './component/Login';
import { Route, BrowserRouter } from 'react-router-dom'
import TaskForm from './component/TaskForm';
import About from './component/About';

export default function Main() {
  
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/taskForm" component={TaskForm} />
        <Route exact path="/about" component={About} />
        {/* <Route path="*" component={NotFound}/> */}
      </Switch>
    </BrowserRouter>
  )
}