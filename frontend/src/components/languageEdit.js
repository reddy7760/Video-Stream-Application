import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router'

export default class EditLanguage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.location.state.language.name,
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit =this.handleSubmit.bind(this)
    }

    handleChange(event){
        console.log(event.target.name, event.target.value)
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
        axios.put(`http://localhost:3003/admin/language/edit/${this.props.location.state.language._id}`,data).then(res => {
          this.props.location.editHandle(res.data)
        console.log(res.data)
        })
        this.setState({
            name: '',
            redirect: true
        })
        
    }
    render(){
        console.log('hello')
        // if(this.state.redirect){
        //     return <Redirect to='/admin/language' />
        // }
        return (
            <div>
                <h2>edit Language</h2>
                <form /*action="http://localhost:3003/admin/language" method="post"*/>
                    <label> Language:
                        <input type="text" name="name" placeholder="edit language" value={this.state.name} onChange={this.handleChange} />
                    </label>

                     &nbsp; <input type="submit" onClick={this.handleSubmit} /><input type="reset" />
                </form>
            </div>
        )
    }
}