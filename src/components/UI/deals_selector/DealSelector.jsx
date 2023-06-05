import React, {useState} from 'react';
import cl from "./DealSelector.module.css"
import SelectorButton from "../selector_button/SelectorButton";

const DealSelector = (props) => {
    const [btnStates, setBtnStates] = useState([true, false, false])

    return (
        <div className={cl.selector_outer}>
            <div className={cl.selector_container}>
                <SelectorButton disabled={btnStates[0]} onClick={(e) => {
                    setBtnStates([true, false, false])
                    props.selectorChanged(0)
                }}>
                    Купили
                </SelectorButton>
                <SelectorButton disabled={btnStates[1]} onClick={(e) => {
                    setBtnStates([false, true, false])
                    props.selectorChanged(1)
                }}>
                    Продали
                </SelectorButton>
                <SelectorButton disabled={btnStates[2]} onClick={(e) => {
                    setBtnStates([false, false, true])
                    props.selectorChanged(2)
                }}>
                    Прочее
                </SelectorButton>
            </div>
            <hr className={cl.selector_divider}/>
        </div>
    );
};

export default DealSelector;