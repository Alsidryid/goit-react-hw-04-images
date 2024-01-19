import {  useState } from "react";
import style from './Searchbar.module.css'


const Searchbar = ({onSubmit}) => {
  const [state, setState] = useState({
    search:""
  })
  
  const handelChange = ({ target }) => {
  
    const { name,value } = target
    
    setState({
      ...state,
      [name]: value
    })
    }

  const handelSubmit = (e) => {
    e.preventDefault();
    onSubmit( {...state})
    setState({
          search:""
        })
    }
  
  
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
            value = {state.search}
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

export default Searchbar