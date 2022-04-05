import React from 'react';

import './App.css';
import UsersList from "./components/Users.js";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Projects";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import ToDoList from "./components/ToDoes";


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
        }
    }

    render() {
        return (
            <div className={"App wrapper"}>
                <BrowserRouter>
                    {<Menu />}
                    <Switch>
                        <Route exact path="/" component={() => <UsersList items={this.state.users}/>}/>
                        <Route exact path="/projects" component={() => <ProjectList items={this.state.projects}/>}/>
                        <Route exact path="/todo_notes" component={() => <ToDoList items={this.state.todo_notes}/>}/>

                        <Route component={NotFound404}/>
                    </Switch>
                    {<Footer />}
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
