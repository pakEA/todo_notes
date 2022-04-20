import React from 'react'
import {NavLink} from "react-router-dom";

const app = require('../App')

function Menu() {
    return (
        <div className={"container"}>
            <nav className={"navbar navbar-expand-lg navbar-light fw-bolder"}>
                <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
                    <li className={"nav-item"}>
                        {app.is_authenticated ? <button onClick={() => app.logout}>Logout</button> :
                        <NavLink to={"/login"} className={"nav-link"}>Login</NavLink>}
                    </li>
                    <li className={"nav-item"}>
                        <NavLink to={"/"} className={"nav-link"}>Users</NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink to={"/projects"} className={"nav-link"}>Projects</NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink to={"/todo_notes"} className={"nav-link"}>Tasks</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


export default Menu;
