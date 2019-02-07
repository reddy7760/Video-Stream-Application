import React from 'react';
import axios from 'axios';
import CommentAdd from './comments/commentAdd'
import Comment from './comments/comment'

export default class PlayMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            video: {}

        }

    }

    componentDidMount(){
        axios.get(`http://localhost:3003/admin/video/${this.props.match.params.id}`).then(res => {
            this.setState({
                video: res.data
            })
        })
    }

    render(){
        // console.log(this.state.video.description)
        return (
            <center>
            <div>
            <h2>Movie name - {this.state.video.title}</h2>
            { this.state.video.video ? 
                <video width="400" controls>
                <source src={this.state.video.video} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            :
            <h3> loading...</h3>
            }<br/> 
             <h2>Description</h2>
            <p>{this.state.video.description}</p>
            {/* <CommentAdd id = {this.state.video._id}/> */}
            <Comment  id = {this.state.video._id}/>
            </div>
            </center>
        )
    }
}