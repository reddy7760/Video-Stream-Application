import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router'

export default class EditGenre extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            name: this.props.location.state.genre.name,
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit =this.handleSubmit.bind(this)
    }

    handleChange(event){
        console.log(event.target.name, event.target.value)
        // console.log('hi')
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        let data = {
            name: this.state.name
        }
        console.log(data)
        axios.put(`http://localhost:3003/admin/genre/edit/${this.props.location.state.genre._id}`,data).then(res => {
            console.log(res.data)
          this.props.location.genreEdit(res.data)
        })
        this.setState({
            name: '',
            redirect: true
        })
        
    }
    render(){
        // if(this.state.redirect){
        //     return <Redirect to='/admin/genre/list' />
        // }
        return (
            <div>
                <h2>edit Genre</h2>
                <form /*action="http://localhost:3003/admin/genre" method="post"*/>
                    <label> genre:
                        <input type="text" name="name" placeholder="edit genre" value={this.state.name} onChange={this.handleChange} />
                    </label>

                     &nbsp; <input type="submit" onClick={this.handleSubmit} /><input type="reset" />
                </form>
            </div>
        )
    }
}