import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({children, ...props}) => {
    function handleChange(event) {
        event.target.value = event.target.value.replace(",", ".")
        props.onChange(event)
    }

    return (
        <input className={classes.myInput} {...props}
               onChange={handleChange}
               children={children}/>
    );
};

export default MyInput;