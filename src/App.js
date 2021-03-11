import React from 'react'
import { Redirect } from 'react-router-dom'
import '../src/css/App.css'
import Header from './component/Header';
import Tasks from './component/Tasks';
import Footer from './component/Footer';
import TaskForm from './component/TaskForm';
import config from './config';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showAddTask: false,
      error: 0,
      redirect: false,
    }

    this.loadTasks = this.loadTasks.bind(this);
    this.toggleAddTask = this.toggleAddTask.bind(this);
    this.fetchTask = this.fetchTask.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.toggleReminder = this.toggleReminder.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.baseURL = config.baseURL;


  }
  componentDidMount() {

    if (sessionStorage.getItem('token')) {
      this.loadTasks();
    }
    else {
      this.setState({ redirect: true });
    }
  }

  loadTasks = async () => {

    await this.fetchTasks();
  }

  toggleAddTask = () => {
    this.setState({ showAddTask: !this.state.showAddTask });
  }

  // Fetch Tasks
  fetchTasks = async () => {
    const res = await fetch(`${this.baseURL}/tasks`, {
      headers: { 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.token).token }

      // headers['Authorization'] = 'Bearer ' + this.getToken();
    });
    const data = await res.json();

    if (data === undefined || data.code === "InvalidCredentials" || data.code === "Unauthorized") {
      this.setState({ tasks: [] });
      this.setState({ redirect: true });
    }
    else {
      this.setState({ tasks: data });
      this.setState({ redirect: false });
    }
    // return data;
  }

  // Fetch Task
  fetchTask = async (id) => {
    const res = await fetch(`${this.baseURL}/tasks/${id}`, {
      headers: { 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.token).token }
    })
    let data = await res.json();

    if (data === undefined || data.code === "InvalidCredentials" || data.code === "Unauthorized") {
      // this.setState({ tasks: [] });
      this.setState({ redirect: true });
      return null;
    }
    else {
      // this.setState({ tasks: data });
      this.setState({ redirect: false });
      return data;
    }
  }

  // Update Task
  toggleReminder = async (id) => {
    const task = await this.fetchTask(id);
    if (task != null) {
      const updTask = { _id: task._id, title: task.title, date: task.date, userId: task.userId, reminder: !task.reminder };
      const res = await fetch(`${this.baseURL}/tasks`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.token).token
          },
          body: JSON.stringify(updTask)
        })

      const data = await res.json();
      if (data === undefined || data.code === "InvalidCredentials" || data.code === "Unauthorized") {
        alert('Failed to set reminder.');
        this.setState({ redirect: true });
      }
      else {
        this.setState({
          tasks:
            this.state.tasks.map((task) =>
              task._id === id ? { ...task, reminder: data.reminder } : task)
        })
        this.setState({ redirect: false });
      }
      // if (data == null) {
      //   alert('Failed to set reminder.');
      // }
      // else {
      //   this.setState({
      //     tasks:
      //       this.state.tasks.map((task) =>
      //         task._id === id ? { ...task, reminder: data.reminder } : task)
      //   })
      // }
    }
  }

  // Delete Task
  deleteTask = async (id) => {
    const res = await fetch(`${this.baseURL}/tasks/${id}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.token).token }
      });
    this.setState({ tasks: this.state.tasks.filter((task) => task._id !== id) });

    if (res === undefined || res.code === "InvalidCredentials" || res.code === "Unauthorized") {
      this.setState({ redirect: true });
    }
    else {
      this.setState({ redirect: false });
    }
  }

  // Add Task
  addTask = async (task) => {
    await fetch(`${config.baseURL}/tasks`
      , {
        method: 'POST'
        , headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(sessionStorage.token).token
        }
        , body: JSON.stringify(task)
      })

    //const data = await res.json();
     await this.fetchTasks();
  }


  render() {

    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
      <div className="container " >
        <div className="row">
          <div className="col-xl-3 col-md-3"></div>
          <div className="col-xl-6 col-md-6 col-sm-12" style={{ backgroundColor: '#ffda0003' }}>
            <Header title={'TODO LIST'}
              showBtn={this.state.showAddTask}
              toggleAddTask={this.toggleAddTask} />

            {this.state.showAddTask && <TaskForm addTask={this.addTask} />}

            {
              (this.state.tasks.length > 0 ?
                <Tasks tasks={this.state.tasks}
                  onDelete={this.deleteTask}
                  toggleReminder={this.toggleReminder}
                />
                : <div className="text-center section">No tasks to show...</div>
              )
            }
            <Footer />
          </div>
          <div className="col-xl-3 col-md-3"></div>
        </div>
      </div>
    );
  }
}

