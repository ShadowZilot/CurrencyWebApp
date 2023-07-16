import React from 'react';
import "./MySelect.css"

const MySelect = ({children, ...props}) => {
    return (
        <select className="custom_select background_tint" {...props} children={children}/>
    );
};

export default MySelect;