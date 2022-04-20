import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.desc}</td>
            <td>{project.users}</td>
            <td><button onClick={() => deleteProject(project.id)} type={"button"}>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div className={"container"}>
            <table className={"table table-bordered table-hover"}>
                <thead className={"table-light"}>
                    <tr>
                        <th>Project name</th>
                        <th>Description</th>
                        <th>Users</th>
                        <th></th>
                    </tr>
                </thead>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to={"/projects/create"}>Create</Link>
        </div>
    )
}

// class ProjectList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             projects: [],
//             isLoaded: false
//         }
//     }
//
//     componentDidMount() {
//         fetch('http://127.0.0.1:8000/api/projects/')
//             .then(response => response.json())
//             .then((json) => {
//                 this.setState({
//                     isLoaded: true,
//                     projects: json.results
//                 })
//             }).catch(error => console.log(error))
//     }

    // render() {
        // const {isLoaded, projects} = this.state;
        // if(!isLoaded) {
        //     return <div>
        //         <h1>Loading...</h1>
        //     </div>
        // }
//         return (
//             <div className={"container"}>
//             <table className={"table table-bordered table-hover"}>
//                 <thead className={"table-light"}>
//                     <tr>
//                         <th>Project name</th>
//                         <th>Description</th>
//                         <th>Users</th>
//                     </tr>
//                 </thead>
//                 {projects.map((project) => <ProjectItem project={project}/>)}
//             </table>
//         </div>
//         )
//     }
// }


export default ProjectList;
