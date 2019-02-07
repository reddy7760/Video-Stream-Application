import React from 'react'
import {Link} from 'react-router-dom'
export default class GenreList extends React.Component{
 
    render(){
        // console.log(this.state.list)
        return(
            <div>
                <h2>listing genres: {this.props.data.length} </h2>
                <ul>
                    {
                        this.props.data.map( (genre)=>{
                            return (
                                <li key={ genre._id }>
                                { genre.name } &nbsp;
                                <button ><Link to={{
                                pathname:'/admin/genre/edit',
                                state: {
                                    genre
                                },
                                genreEdit: this.props.genreEdit

                            }}>Edit</Link></button><button onClick={() => {this.props.deleteGenre(genre)}}>delete</button>
                                </li>     
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}