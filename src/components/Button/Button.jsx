import style from "./Button.module.css"

const Button = ({onClick , type ="submit",children}) => {
    return <button className={style.btn} onClick={onClick} type ={type}>{children}</button>
}

export default Button