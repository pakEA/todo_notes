import React from "react";


const ToDoItem = ({todo_note}) => {
    return (
        <tr>
            <td>{todo_note.project}</td>
            <td>{todo_note.text}</td>
            <td>{todo_note.created_at}</td>
            <td>{todo_note.updated_at}</td>
            <td>{todo_note.author}</td>
            <td>{todo_note.is_active}</td>
        </tr>
    )
}


const ToDoList = ({todo_notes}) => {
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
                {todo_notes.map((todo_note) => <ToDoItem todo_note={todo_note}/>)}
            </table>
        </div>
    )
}

// class ToDoList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             'todo_notes': [],
//             isLoaded: false
//         }
//     }
//
//     componentDidMount() {
//         fetch('http://127.0.0.1:8000/api/todo_notes/')
//             .then(response => response.json())
//             .then((json) => {
//                 this.setState({
//                     isLoaded: true,
//                     todo_notes: json.results
//                 })
//             }).catch(error => console.log(error))
//     }
//
//     render() {
//         const {isLoaded, todo_notes} = this.state;
//         if(!isLoaded) {
//             return <div>
//                 <h1>Loading...</h1>
//             </div>
//         }
//         return (
//             <div className={"container"}>
//                 <table className={"table table-bordered table-hover"}>
//                     <thead className={"table-light"}>
//                     <tr>
//                         <th>Project name</th>
//                         <th>Text</th>
//                         <th>Created</th>
//                         <th>Updated</th>
//                         <th>Author</th>
//                         <th>Active</th>
//                     </tr>
//                     </thead>
//                     {todo_notes.map((todo_notes) => <ToDoItem todo_notes={todo_notes}/>)}
//                 </table>
//             </div>
//         )
//     }
// }


export default ToDoList;
