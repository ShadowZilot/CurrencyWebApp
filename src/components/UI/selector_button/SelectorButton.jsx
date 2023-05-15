import React from 'react';
import cl from "./SelectorButton.module.css"

const SelectorButton = ({children, ...props}) => {

    return (
        <button {...props} className={cl.selector_button}>
            {children}
        </button>
    );
};

export default SelectorButton;