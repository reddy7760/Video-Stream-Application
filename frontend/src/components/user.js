import React from 'react'
import axios from 'axios'
export default class UserRegistration extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            password:'',
            mobile:'',
            gender:'',
            dateofbirth:''
        }
    }
    handleChange=(e)=>{
   console.log(e.target.name,e.target.value)
   this.setState({
       [e.target.name]:e.target.value
   })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
          let data={
              username:this.state.username,
              email:this.state.email,
              password:this.state.password,
              mobile:this.state.mobile,
              gender:this.state.gender,
              dateofbirth:this.state.dateofbirth
          }
          console.log(data);
    }
    // componentDidMount=()=>{
    //     axios.post()
    // }
    render(){
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <label>username : &nbsp;
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </label><br/>
                    <label>email : &nbsp;
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </label><br/>
                    <label>password : &nbsp;
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </label><br/>
                    <label>mobile : &nbsp;
                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                    </label><br/>
                    <label>gender : &nbsp;

                    <label>male
                        <input type="radio" name="gender" value="male" onChange={this.handleChange}/>
                    </label>
                    <label>female
                        <input type="radio" name="gender" value="female"onChange={this.handleChange}/>
                    </label>
                    </label><br/>
                   
                    <label>dateofbirth :  &nbsp;
                        <input type="date" name="dateofbirth" value={this.state.dateofbirth} onChange={this.handleChange}/>
                    </label><br/>
                    <input type="submit"value="submit"/>
                    <input type="reset" value = "reset"/>
                </form>
            </div>
        )
    }
}