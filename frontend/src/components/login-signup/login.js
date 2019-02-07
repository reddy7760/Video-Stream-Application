import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

export default class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            redirect: false,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            email:this.state.email,
            password:this.state.password          
        }
        axios.post(`http://localhost:3003/user/login`, data).then( res => {
            console.log(res.data)
            if(res.data !== 'invalid credentials'){
                this.setState({
                    redirect:true,
                    message:'successfull login'
                })
            } else {
               
                this.setState({
                    redirect:false,
                    message:'invalid credentials'
                })
                
            }


        }).catch( err => console.log(err))

        this.setState({
            email:'',
            password:''
        })
        
    }

    handleReset(){
        this.setState({
            email:'',
            password:''
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/videos/list' />
        }
        return(
            <div>
                <br/>
                
                
                <center>
                    <Container>
                    <h2>Login </h2>
                    <Form>
                        <FormGroup>
                            <Label for='email'> Email:
                                <Input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                            </Label>                          
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="password"> Password:
                                <Input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </Label>
                            
                        </FormGroup>
                        <br/>
                        <h2> {this.state.message}</h2>
                        <Row>
                            <Col  sm={{ offset: 5 }}><Button onClick={this.handleSubmit}>  Submit </Button></Col>
                            <Col  sm={{ offset: 1 }}><Button onClick={this.handleReset}> Reset </Button></Col>
                        </Row>   
                    </Form>
                    </Container>
                </center>

            </div>
        )
    }
}