import React from 'react'

const Input = (props) => {
    let result = null
    switch(props.elementType){
        case "textarea":
            result = (
                <textarea 
                    {...props.elementConfig} 
                    className={props.className} 
                    onChange={props.onChange} 
                    defaultValue={props.defaultValue}
                ></textarea>
            )
            break
        default: 
            result= (
                <input 
                    {...props.elementConfig} 
                    className={props.className}
                    value={props.value}
                    onChange={props.onChange} 
                    defaultChecked={props.defaultChecked}
                />
            )
    }

  return result
}

export default Input