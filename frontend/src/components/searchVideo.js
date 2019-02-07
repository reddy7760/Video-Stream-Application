import React from 'react'
export default class SearchVideo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            filterList:''
        }
    }
    searchVideoFilter=(e)=>{
             console.log(e.target.value);
              e.preventDefault()
           this.setState({
                filterList:e.target.value
             })
            this.props.search(e.target.value)
    }
    render(){
        return (
            
           <form>
               <label>
                       <input type="text"placeholder="search" value={this.state.filterList} onChange={this.searchVideoFilter}/>
               </label>
           </form>
        )
    }
}