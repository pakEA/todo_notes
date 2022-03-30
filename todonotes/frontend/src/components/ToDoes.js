import React from "react";


const ToDoItem = ({todo_notes}) => {
    return (
        <tr>
            <td>{todo_notes.project}</td>
            <td>{todo_notes.text}</td>
            <td>{todo_notes.created_at}</td>
            <td>{todo_notes.updated_at}</td>
            <td>{todo_notes.author}</td>
            <td>{todo_notes.is_active}</td>
        </tr>
    )
}


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'todo_notes': [],
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/todo_notes/')
            .then(response => response.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    todo_notes: json.results
                })
            }).catch(error => console.log(error))
    }

    render() {
        const {isLoaded, todo_notes} = this.state;
        if(!isLoaded) {
            return <div>
                <h1>Loading...</h1>
            </div>
        }
        return (
            <div className={"container"}>
                <table className={"table table-bordered table-hover"}>
                    <thead className={"table-light"}>
                    <tr>
                        <th>Project name</th>
                        <th>Text</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Author</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    {todo_notes.map((todo_notes) => <ToDoItem todo_notes={todo_notes}/>)}
                </table>
            </div>
        )
    }
}


export default ToDoList;
