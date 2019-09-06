import React, {Component} from 'react';
import { Container, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class EditUser extends Component {
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

    componentDidMount() {
        // Fill in the form with the appropriate data if user id is provided
        const userID = this.props.match.params.id
        console.log(userID)

        axios.get(`${this.server}/users/${userID}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    name: response.data.name,
                    choiceA: response.data.choiceA,
                    choiceB: response.data.choiceB,
                });
            })
            .catch((err) => {
                console.log(err + 'No such document');
            });
     }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name]: value });
    }



    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            choiceA: this.state.choiceA,
            choiceB: this.state.choiceB,
        }


        const params = this.props.match.params.id

        axios({
            method: 'put',
            responseType: 'json',
            url: `${this.server}/users/${params}`,
            data: user
        })
            .then((response) => {
                console.log(response)
              this.props.handleUserUpdated(response.data.result);

            }).then(()=>{
                this.setState({
                    name:'',
                    choiceA: '',
                    choiceB: '',
                })
            this.props.history.push('/')
        })
            .catch((err) => {
                console.log(err +'something went wrong!!')
            });
    }

    render() {
    const {name,choiceA,choiceB} = this.state
        return (
            <Container>
                <h4><Button><Link to={`/`}>Back to Main List</Link></Button></h4>
                <Form  onSubmit={this.handleSubmit}>
                <Form.Input
                    label='name'
                    name='name'
                    required
                    value={name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='choiceA'
                    name='choiceA'
                    required
                    value={choiceA}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='choiceB'
                    name='choiceB'
                    required
                    value={choiceB}
                    onChange={this.handleInputChange}
                />
                <Button>SUBMIT</Button>
                <br /><br />
            </Form>
            </Container>
        );
    }
}

export default EditUser;
