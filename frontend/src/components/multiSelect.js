import React from "react";
import Select from "react-select";

export default class MultiSelect extends React.Component {
 constructor(props){
 super(props)
 this.state = {
 selectedOption: null
 }
 this.handleChange =this.handleChange.bind(this)
 }

 dataGenerator(){
 function Generator(value,label){
 this.value = value;
 this.label = label;
 }
 let info = [];
 this.props.data.forEach( value => {
 let obj = new Generator(value._id,value.name)
 info.push(obj)
 });
 return info;
 }

 handleChange = (selectedOption) => {
 this.setState({ selectedOption });
 console.log(`Option selected:`, selectedOption);
 
 }

 render (){

 let info = this.dataGenerator() 
 const { selectedOption } = this.state;

 return (
 <Select 
 isMulti
 name="genre"
 options={info}
 className="basic-multi-select"
 classNamePrefix="select"
 value={selectedOption}
 onChange={this.handleChange}
 
 />
 );
 }
}