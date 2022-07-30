import React from 'react'

const Modal = (props) => {
    let res = <div></div>
    if(props.show){
        res = (
            <div className='fixed w-full h-full left-0 top-0 flex justify-center items-center z-30'>
                <div onClick={props.click} className='fixed w-full h-full left-0 top-0 backdrop-blur-md bg-opacity-60 bg-zinc-100' aria-hidden={true}></div>
                <div className='relative z-50 rounded-sm'>
                    {props.children}
                </div>

            </div>
        )
    }

  return res
}

export default Modal