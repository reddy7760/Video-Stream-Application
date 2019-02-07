import React from 'react'
import axios from 'axios'
import Select from 'react-select';

// import multiSelect from './tools/multi-select'
import MultiSelect from './multiSelect'


export default class AddVideo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            languages: [],
            genres: [],
            title: '',
            description:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    

    componentDidMount(){
       let promiseForLanguage = axios.get(`http://localhost:3003/admin/language`);
       let promiseForGenre = axios.get(`http://localhost:3003/admin/genre`);
       
        Promise.all([promiseForLanguage,promiseForGenre]).then( values => {
            this.setState({
                languages: values[0].data,
                genres: values[1].data
            })
        });
       
    }

    render(){
        console.log(this.state.languages)
        
        return (
                <form action="http://localhost:3003/admin/video" method="post" encType="multipart/form-data">
                   
                    <label>title
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>description: 
                        <textarea name="description"></textarea>
                    </label>
                    <br/>
                    <label>image: 
                        <input type="file" name='image'/>
                    </label>
                    <br/>
                    <label>video: 
                        <input type="file" name='video' />
                    </label>
                    <br/>
                    <label>Language:
                        <select name="language">
                            <option value="">Select</option>
                            {this.state.languages.map((language,index) => {
                                return(
                                    <option key={language.name} value={language._id}>{language.name}</option> 
                                )
                            })}
                        </select> 
                    </label>
                    <br/>
                    <MultiSelect data={this.state.genres} />
                    {/* <label>Genre: 
                        <select name="genre">
                            <option value="">Select</option>
                            {this.state.genres.map((genre,index) => {
                                return(
                                    <option key={genre.name.toLowerCase()} value={genre._id}>{genre.name}</option> 
                                )
                            })}
                        </select> 
                    </label> */}
                    <br/>
                    <input type="submit" /> <input type="reset"/>
                  
                    
                    
                </form>
           
        )
    }
}