import React from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'

import LanguageAdd from './languageAdd'
import ListLanguage  from './languageList'
import EditLanguage from './languageEdit'

export default class Language extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
        // this.handleForm = this.handleForm.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3003/admin/language').then(res => {
            this.setState({
                list: res.data 
            })
        })
    }
    handleData=(data)=>{
        console.log(data);
        this.setState( (prevState)=>{
            return {
                list:[...prevState.list,data]
            }
        })
    }

    handleEdit(data){
        console.log('got it', data)
        let editedList = this.state.list.map(language => {
            
            if(language._id == data.language._id){
               return Object.assign(language,data.language)
            } else {
                return language
            }
        })
        console.log(editedList)
        this.setState({
            list: editedList
        })
    }



    handleDelete(language){
        axios.delete(`http://localhost:3003/admin/language/${language._id}`).then(res => {
            this.setState((prevState) => {
                return {
                    list: prevState.list.filter( language => {
                        return language._id !== res.data.language._id;
                    })
                }
            })
        })
    }

    render(){
        console.log(this.state.list)
        return (
            <div>
                <LanguageAdd  handleData = {this.handleData}/>
                <ListLanguage data1 = {this.state.list} deleteFunction={this.handleDelete} editHandle={this.handleEdit}  />
                <Route path='/admin/language/edit' component={EditLanguage} />
            </div>
        )
    }
}