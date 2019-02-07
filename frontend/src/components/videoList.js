import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchVideo from './searchVideo'

export default class VideoList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            filterList:[]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3003/admin/video/list`).then(res => {
            this.setState({
                list:res.data,
                filterList:res.data
                
            })
        })
    }
    search=(data)=>{
       console.log(data)
       this.setState((prevState)=>{
           return {
               filterList:prevState.list.filter( (list)=>
                // console.log(list.title.indexOf(data))
                 list.title.indexOf(data)!==-1 )
                //  list:this.state.filterList
        }
       })
    }
    deleteHandle=(data)=>{
       
             console.log(data._id);
          axios.delete(`http://localhost:3003/admin/${data._id}`).then((response)=>{
              let res = response.data
            console.log(response.data)
            this.setState(function(prevState){
                return {
                    list:prevState.list.filter((video)=>video._id!==res.video._id)
                }    
            })
    
              })
    }
   
  
    render(){
        console.log(this.state.list)
        return (
            <div> 
                  < SearchVideo search={this.search}/>
                <h2>Listing all the videos</h2>
                <ol>
                    { this.state.filterList.map((video, index) => {
                        return (
                            <li key={index}><Link to ={`/user/${video._id}`}>{video.title}</Link>&nbsp;&nbsp;<button >Edit</button>&nbsp;<button onClick={()=>{this.deleteHandle(video)}}>Delete</button></li>
                        )
                    })}
                </ol>
              
            </div>
        )
    }
}