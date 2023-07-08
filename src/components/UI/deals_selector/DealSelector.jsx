import React, {useEffect, useState} from 'react';
import cl from "./DealSelector.module.css"
import SelectorButton from "../selector_button/SelectorButton";

const DealSelector = (props) => {
    const [btnStates, setBtnStates] = useState([true, false, false])
    const [selectedType, setSelectedType] = useState(0)

    useEffect(() => {
        props.selectorChanged(selectedType)
    }, [selectedType])

    return (
        <div className={cl.selector_outer}>
            <div className={cl.selector_container}>
                <SelectorButton disabled={btnStates[0]} onClick={(e) => {
                    setBtnStates([true, false, false])
                    setSelectedType(0)
                }}>
                    Купили
                </SelectorButton>
                <SelectorButton disabled={btnStates[1]} onClick={(e) => {
                    setBtnStates([false, true, false])
                    setSelectedType(1)
                }}>
                    Продали
                </SelectorButton>
                <SelectorButton disabled={btnStates[2]} onClick={(e) => {
                    setBtnStates([false, false, true])
                    setSelectedType(2)
                }}>
                    Прочее
                </SelectorButton>
            </div>
            <hr className={cl.selector_divider}/>
        </div>
    );
};

export default DealSelector;