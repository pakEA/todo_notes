import React from 'react';

import './App.css';
import UsersList from "./components/Users.js";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Projects";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import ToDoList from "./components/ToDoes";
import LoginForm from "./components/Auth";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Page '{location.pathname}' not found</h1>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo_notes': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert("Wrong login or password"))
    }

    get_headers() {
        const headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token' + this.state.token
        }
        return headers
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((project) =>
                        project.id !== id)
                })
            }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo_notes/${id}/`, {headers})
            .then(response => {
                this.setState({
                    todo_notes: this.state.todo_notes.filter((todo_note) =>
                        todo_note.id !== id)
                })
            }).catch(error => console.log(error))
    }

    createProject(name, desc, href, users) {
        const headers = this.get_headers()
        const data = {
            name: name,
            desc: desc,
            href: href,
            users: users
        }
        axios.get(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((user) => user.id === new_project.user)[0]
                new_project.users = users
                this.setState({
                    projects: [...this.state.projects, new_project]
                })
            }).catch(error => console.log(error))
    }

    createToDo(project, text, author) {
        const headers = this.get_headers()
        const data = {
            project: project,
            text: text,
            author: author
        }
        axios.get(`http://127.0.0.1:8000/api/todo_notes/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((project) => project.id === new_todo.project)[0]
                new_todo.project = project
                this.setState({
                    todo_notes: [...this.state.todo_notes, new_todo]
                })
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({
                    users: response.data
                })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({
                    projects: response.data
                })
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })


        axios.get('http://127.0.0.1:8000/api/todo_notes/', {headers})
            .then(response => {
                this.setState({
                    todo_notes: response.data
                })
            }).catch(error => {
            console.log(error)
            this.setState({todo_notes: []})
        })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className={"App wrapper"}>
                <BrowserRouter>
                    {<Menu/>}
                    <Switch>
                        <Route exact path="/" component={() => <UsersList users={this.state.users}/>}/>

                        <Route exact path="/projects/create" component={() => <ProjectForm users={this.state.users}
                            createProject={(name, desc, href, users) => this.createProject(name, desc, href, users)}/>}/>
                        <Route exact path="/projects" component={() => <ProjectList
                            projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>

                        <Route exact path="/todo_notes/create" component={() => <ToDoForm project={this.state.projects}
                            createToDo={(project, text, author) => this.createToDo(project, text, author)}/>}/>
                        <Route exact path="/todo_notes" component={() => <ToDoList
                            todo_notes={this.state.todo_notes} deleteToDo={(id) => this.deleteToDo(id)}/>}/>

                        <Route exact path="/login" component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route component={NotFound404}/>
                    </Switch>
                    {<Footer/>}
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
