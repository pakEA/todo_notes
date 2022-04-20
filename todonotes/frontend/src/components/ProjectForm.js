import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            href: '',
            users: props.users[0].id,
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.desc, this.state.href, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className={"form-group"}>
                    <label for={"project"}>name</label>
                    <input type={"text"} className={"form-control"} name={"name"} value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className={"form-group"}>
                    <label for={"desc"}>desc</label>
                    <input type={"text"} className={"form-control"} name={"desc"} value={this.state.desc}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className={"form-group"}>
                    <label for={"href"}>href</label>
                    <input type={"text"} className={"form-control"} name={"href"} value={this.state.href}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className={"form-group"}>
                    <label for={"users"}>users</label>
                    <select name={"users"} className={"form-control"}
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <input type={"submit"} className={"btn btn-primary"} value={"Save"}/>
            </form>
        )
    }
}


export default ProjectForm;
