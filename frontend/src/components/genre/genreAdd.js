import React from 'react'
import axios from 'axios'
import {Redirect}from 'react-router'
export default class GenreAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            redirect:false,
            result:[]
        }
    }
    handleChange=(event)=>{
        console.log(event.target.name,event.target.value);
        this.setState({
          [event.target.name]:event.target.value
        })
       
  
      }
    handleSubmit=(event)=>{
        event.preventDefault();
        let genreData={
            name:this.state.name
        }
        axios.post(`http://localhost:3003/admin/genre`,genreData).then(res=>{
            console.log(res.data)
            this.setState({
                result: res.data,
                redirect: true,
                name:''
            })
            this.props.handleData(res.data.genre);
        })
        
 }
  

    render(){
        // if(this.state.redirect){
        //     return <Redirect to='/admin/genre/list' />
        // }
        return(
            <div>
                <h2>Add Genre</h2>
                <form>
                    <label>
                        <input type ="text" name="name" value={this.state.name} placeholder="add genre" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" onClick={this.handleSubmit}/>
                    <input type="reset"/>
                </form>
            </div>
        )
    }
}