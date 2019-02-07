import React from 'react'
import axios from 'axios'
import CommentList from './commentList'
export default class CommentAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            comment:'',
            video:'',
            result:[]
        }
    }
 
    handleChange=(e)=>{
        console.log(e.target.name,e.target.value);
        this.setState({
            [e.target.name]:e.target.value
            //comment: ygfy
        })

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        //  console.log(e.target.value)
        let data= {
            comment:this.state.comment,
            video:this.props.id
        }
        console.log(data); 
        // this.setState({
        //     name:data.name,
        //     videoId:data.videoId
        // })
        axios.post('http://localhost:3003/comments',data).then(res=>{
            console.log(res.data);
            this.setState({
                result:res.data,
                comment:'',
            })
            this.props.handleData(res.data.comment)
        })
    }
    handleClear=(e)=>{
        e.preventDefault();
        this.setState({
            comment:''
        })
    }
    render(){
        // console.log(this.state.name , this.state.videoId)
        console.log(this.state.result)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <textarea  name="comment" value = {this.state.comment} placeholder="add comment here" onChange={this.handleChange}/><br/>
                <input type="submit" value="Post"/> &nbsp;
                <input type="button" value = "clear" onClick={ this.handleClear }/>
                </form>
                {/* <CommentList/> */}
            </div>
        )
    }
}