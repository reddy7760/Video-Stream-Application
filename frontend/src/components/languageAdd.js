import React from 'react'
import axios from 'axios'
// import {Route} from 'react-router-dom'
// import LanguageList from './languageList'

export default class LanguageAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            result:[]
        }
        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit =this.handleSubmit.bind(this)
    }

    handleChange=(event)=>{
        console.log(event.target.name, event.target.value)
        console.log('hi')
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()

        let data = {
            name: this.state.name
        }
        console.log(data)
        axios.post("http://localhost:3003/admin/language",data).then(res=> {
            console.log('working',res.data)
            this.setState({
                result:res.data,
                name:''
            })
            this.props.handleData(res.data.language);
        })
    }

    render(){
        console.log(this.state.result)
        return (
            <div>
                <h2>Add new language</h2>
                <form>
                    <label> Language:
                        <input type="text" name="name" placeholder="add new language" value={this.state.name} onChange={this.handleChange} />
                    </label>

                     &nbsp; <input type="submit" onClick={this.handleSubmit} /><input type="reset" />
                </form>
          
            </div>
        )
    }
}