import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({children, ...props}) => {
    return (
        <input className={classes.myInput} {...props} children={children}/>
    );
};

export default MyInput;