import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto px-2.5 2xl:max-w-screen-xl'>
        {children}
    </div>
  )
}

export default Container