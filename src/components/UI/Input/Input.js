import React from 'react';
import classes from './Input.css';

// Functional component
const input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case('input'):
            // Any default attributes set on the HTML input element are pased down from outside with "{...props}"
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />
            break;
        case('select'):
            // Wrapped in parentheses to allow multi-line content
            inputElement = (
            <select 
                className={classes.InputElement} 
                // {...props.elementConfig} 
                value={props.value}>
                {/* Dynamically create the options available on the Select dropdown */}
                {props.elementConfig.options.map(option => (
                    <option 
                        key={option.value} 
                        value={option.value} 
                        onChange={props.changed} >
                            {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }

    return (
        // We wrap everything inside a div because we want to have multiple elements inside
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;