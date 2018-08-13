import React from 'react';
import './button.css'

function Button (props) {
    
        return (
              <button 
                className={props.className}
                onClick={props.onClick}
                href={props.href}
                style={props.style}
                value={props.value}
                >{props.label}</button>
        )
    }
export default Button