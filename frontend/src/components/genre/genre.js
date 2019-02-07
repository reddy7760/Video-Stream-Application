import React from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom'
import GenreList from './genreList'
import EditGenre from './genreEdit'
import GenreAdd from './genreAdd';
export default class Genre extends React.Component{
    constructor(){
        super()
        this.state={
            list:[]
        }
    }
        componentDidMount(){
                axios.get('http://localhost:3003/admin/genre').then(res=>{
                 console.log(res.data)
                 this.setState({
                    list:res.data 
                 })
            })
        }
        handleData=(data)=>{
console.log(data);
               this.setState( prevState=>{
                   return {
                       list:[...prevState.list,data]
                   }
               })
        }
        deleteGenre=(genre)=>{
            
            axios.delete(`http://localhost:3003/admin/genre/${genre._id}`).then(res=>{
                this.setState(prevState=>{
                    return {
                        list: prevState.list.filter( genre => {
                            return genre._id !== res.data.genre._id;
                        })
                    }
                })
            })
        }
        genreEdit=(data)=>{
            let editGenre = this.state.list.map(genre=>{
                if(genre._id==data.genre._id){
                    return Object.assign(genre,data.genre)
                }
                else {
                    return genre;
                }
            })
            this.setState({
                list:editGenre
            })
        }
    render(){
        console.log(this.state.list);
        return(
            <div>
                <GenreAdd handleData = {this.handleData}/>
             <GenreList  data={this.state.list} deleteGenre={this.deleteGenre} genreEdit={this.genreEdit}/>
             <Route path='/admin/genre/edit' component={EditGenre} />
            </div>
        )
    }
}