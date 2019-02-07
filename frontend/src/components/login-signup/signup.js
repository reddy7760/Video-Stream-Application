import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router'
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

export default class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            password:'',
            mobile:'',
            gender:'',
            dateofbirth:'',
            redirect: false


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
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            mobile:this.state.mobile,
            gender:this.state.gender,
            dateofbirth:this.state.dateofbirth
        }
        axios.post(`http://localhost:3003/user`, data).then( res => {
            this.setState({
                redirect:true
            })

        }).catch( err => console.log(err))

        this.setState({
            name:'',
            email:'',
            password:'',
            mobile:'',
            gender:'',
            dateofbirth:''
        })
        
    }

    handleReset(){
        this.setState({
            name:'',
            email:'',
            password:'',
            mobile:'',
            gender:'',
            dateofbirth:''
        })
        
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/videos/list' />
        }
       
        return(
            
            <div>
                <br/>
                <br/>
                <br/>
                <center>
                <Container>
                <h3>Registration Form: </h3>
                <br/>
                <Form /*action='http://localhost:3003/user' method='post'*/>
                    <label> Name: &nbsp;
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label><br/>

                    <label> Email:&nbsp;
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </label><br/>

                    <label> Password:&nbsp;
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label><br/>

                    <label> Mobile:&nbsp;
                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                    </label><br/>

                    <label for="gender"> Gender: &nbsp; </label>
                        <input type="radio" id="male" name="gender" value="male" onChange={this.handleChange} />
                    <label for="male">&nbsp; male &nbsp;</label>
                        <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange} />
                    <label for="female">&nbsp; female &nbsp;</label> 
                        <input type="radio" id="others" name="gender" value="others" onChange={this.handleChange} />
                    <label for="others">&nbsp; others &nbsp;</label> <br />

                    <label> Date of Birth: &nbsp; 
                        <input type="date" name='dateofbirth' value={this.state.dateofbirth} onChange={this.handleChange} />
                    </label><br/>
                    <br/>

                    <input type="submit" onClick={this.handleSubmit} />&nbsp;<input type="reset" onClick={this.handleReset} />

                
                <br/> 

                </Form>
                </Container>
                </center>
            </div>
        )
    }
}
