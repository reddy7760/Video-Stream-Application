import React from 'react'
import axios from 'axios'
import CommentList from './commentList'
import CommentAdd from './commentAdd'
export default class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[]
        }

    }
    componentDidMount(){
        axios.get('http://localhost:3003/comments').then(res=>{
            console.log(res.data);
            let reverseComments = res.data.reverse();
            console.log(reverseComments);
            this.setState({
                list:reverseComments
            })
        })
    }
    handleData=(data)=>{
        console.log(data);
        this.setState( (prevState)=>{
            return {
                list:[data,...prevState.list]
            }
        })
    }
    render(){
        console.log(this.state.list)
        return(
            <div>
            <CommentAdd  id = {this.props.id} handleData={this.handleData}/>
             <CommentList  id={this.props.id} data = {this.state.list}/>
            </div>
        )
    }
}