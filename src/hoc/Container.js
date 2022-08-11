import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto px-4 2xl:max-w-screen-xl'>
        {children}
    </div>
  )
}

export default Container