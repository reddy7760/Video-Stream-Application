import React from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
export default class ListLanguage extends React.Component {
    render(){
        console.log(this.props.data1)
        return (
            <div>
                <h2>Listing all languages: </h2>
                <ul>
                    {this.props.data1.map( language => {
                        console.log(language)
                        return (
                            <li key={language._id}>{language.name}&nbsp;<button ><Link to={{
                                pathname:'/admin/language/edit',
                                state: {
                                    language
                                },
                                editHandle: this.props.editHandle

                            }}>Edit</Link></button>&nbsp;<button onClick={() => {this.props.deleteFunction(language)}}>Delete</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}