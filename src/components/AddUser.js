import React, {Component} from 'react';
import {Container, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.server = 'http://localhost:4000';
        this.state = {
            name:'',
            choiceA: '',
            choiceB: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name]: value });
    }



    handleSubmit(e) {
        // Prevent browser refresh
        e.preventDefault();

        const user = {
            name: this.state.name,
            choiceA: this.state.choiceA,
            choiceB: this.state.choiceB,
        }

        const params = ''

        axios({
            method: 'post',
            responseType: 'json',
            url: `${this.server}/users/${params}`,
            data: user
        })
            .then((response) => {
                console.log(response)
                //this.props.handleUserAdded(response.data);

            }).then(() => {
                this.setState({
                    name:'',
                    choiceA:'',
                    choiceB:'',
                    });
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            });
    }



    render() {

        return (
            <Container>
                <h4><Button><Link to={`/`}>Back to Main List</Link></Button></h4>
                <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    label='name'
                    type='text'
                    placeholder='Mrs.Leek'
                    name='name'
                    maxLength='40'
                    required
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='choiceA'
                    type='number'
                    placeholder='0'
                    name='choiceA'
                    required
                    value={this.state.choiceA}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='choiceB'
                    type='number'
                    placeholder='0'
                    name='choiceB'
                    required
                    value={this.state.choiceB}
                    onChange={this.handleInputChange}
                />
                <Button>SUBMIT</Button>
                <br /><br />
            </Form>
            </Container>
        );
    }
}

export default AddUser;
