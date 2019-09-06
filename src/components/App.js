import React, { Component } from 'react';
import {Container, Icon,Button,Table} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import chef from '../chef.png';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.server = 'http://localhost:4000';
        this.state = {
            users: [],
        }
         //this.handleUserAdded=this.handleUserAdded.bind(this)
        this.handleUserUpdated=this.handleUserUpdated.bind(this)

    }

    componentDidMount() {
        this.fetchUsers();
    }

    // Fetch data from the back-end
    fetchUsers=()=> {
        axios.get(`${this.server}/users/`)
            .then((response) => {
                console.log(response.data)
                this.setState({ users:response.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

   /* handleUserAdded=(user)=> {
        let users = this.state.users.slice();
        users.push(user);
        this.setState({ users: users });
    }*/

    handleUserUpdated=(user)=> {
        let users = this.state.users.slice();
        for (let i = 0, n = users.length; i < n; i++) {
            if (users[i]._id === user._id) {
                users[i].name = user.name;
                users[i].choiceA = user.choiceA;
                users[i].choiceB = user.choiceB;
                break;
            }
        }

        this.setState({ users: users });
    }

    handleUserDeleted=(user)=>{
        let users = this.state.users.slice();
        users = users.filter(currentUser => { return currentUser._id !== user._id; });
        this.setState({ users: users });
    }

    render() {
        const { users } = this.state
        return (
            <Container>
                <div className='App'>
                    <div className='App-header'>
                        <img src={chef} className="headerImage" />
                        <h1 className='App-intro'>A School Lunch Count Project</h1>
                        <h3>A simple records system using mysql, Express.js, React.js, and Node.js.</h3>
                        <h3>REST API was implemented on the back-end. Semantic UI React was used for the UI.</h3>
                    </div>
                </div>
                <br/>
                <Button>
                    <Link to = {{
                    pathname:`/add`,
                    }}>Add New</Link>
                </Button>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>NAME<Icon className='icon' name = 'user'/></Table.HeaderCell>
                            <Table.HeaderCell>LUNCH<Icon className='icon' name = 'font'/></Table.HeaderCell>
                            <Table.HeaderCell>LUNCH<Icon className='icon' name = 'bold'/></Table.HeaderCell>
                            <Table.HeaderCell>EDIT<Icon className='icon' name = 'edit'/></Table.HeaderCell>
                            <Table.HeaderCell>DELETE<Icon className='icon' name = 'delete'/></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { users.map(user =>
                            <Table.Row key={user._id}>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.choiceA}</Table.Cell>
                                <Table.Cell>{user.choiceB}</Table.Cell>
                                <Table.Cell><Button>
                                    <Link to = {{
                                    pathname:`/edit/${user._id}`,
                                    props:{handleUserUpdated:this.handleUserUpdated}
                                }}>Edit</Link>
                                </Button></Table.Cell>
                                <Table.Cell><Button onClick={this.handleUserDeleted.bind(this,user)}> Delete </Button></Table.Cell>
                            </Table.Row>
                            )}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default App;
