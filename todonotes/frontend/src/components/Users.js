import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}


const UsersList = ({users}) => {
    return (
        <div className={"container"}>
            <table className={"table table-bordered table-hover"}>
                <thead className={"table-light"}>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
                </thead>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
    )
}

// class UsersList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             users: [],
//             isLoaded: false
//         }
//     }
//
//     componentDidMount() {
//         fetch('http://127.0.0.1:8000/api/users/')
//             .then(response => response.json())
//             .then(json => {
//                 this.setState({
//                     isLoaded: true,
//                     users: json
//                 })
//             }).catch(error => console.log(error))
//     }
//
//     render() {
//         const {isLoaded, users} = this.state;
//         if(!isLoaded) {
//             return <div>
//                 <h1>Loading...</h1>
//             </div>
//         }
//         return (
//             <div className={"container"}>
//             <table className={"table table-bordered table-hover"}>
//                 <thead className={"table-light"}>
//                     <tr>
//                         <th>Username</th>
//                         <th>First name</th>
//                         <th>Last name</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 {users.map((user) => <UserItem user={user}/>)}
//             </table>
//         </div>
//         )
//     }
// }


export default UsersList;
