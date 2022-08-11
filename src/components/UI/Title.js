import React from 'react'

const Title = (props) => {
  return (
    <div>
        <h2 className={`text-2xl font-medium text-gray-400 ${props.className}`}>
            {props.children}
        </h2>
    </div>
  )
}

export default Title