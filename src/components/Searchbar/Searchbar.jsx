import { Component } from "react";
import style from './Searchbar.module.css'

export default class Searchbar extends Component{

state = {
    search: "",
}


    handelChange = ({ target }) => {
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }
    
    handelSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state})
        this.setState({
            search: ""
        })
    }


    render() {
        const { handelChange, handelSubmit } = this;
        const { search } = this.state;
        
    return (
      <header  className = {style.header}>
        <form  onSubmit = {handelSubmit}  className = {style.form}>
          <button className = {style.btn} type="submit" >
          <span >Search</span>
          </button>
          <input
            className = {style.input}
            name = "search"
            onChange={handelChange}
            value = {search}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
  )
}
}