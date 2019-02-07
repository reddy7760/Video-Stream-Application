import React from 'react'
// import axios from 'axios'
export default class CommentList extends React.Component{

    render(){
        let  videoId=this.props.id
        console.log(videoId)
        return(
            <div>
                <h2>Listing Comments </h2>
                <ul> 
                {
                       this.props.data.filter(comment=>comment.video===videoId)
                       .map(comments=>{
                        return <li key={comments._id}>{comments.comment}</li>
                    })}
                </ul>
            </div>
        )
    }
}